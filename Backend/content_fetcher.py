import sys
import urllib.parse
import urllib.robotparser
import time
import requests
import json
from urllib.parse import urljoin, urlparse
from collections import defaultdict
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
import pymupdf  # PyMuPDF

from constants import MAX_DEPTH, MAX_DOMAIN_VISITS, TIMEOUT
from utils import chunk_text_with_nlp_overlap, clean_text

class ContentFetcher:
    def __init__(self, max_workers=5, max_depth=MAX_DEPTH):
        self.visited_urls = set()
        self.domain_visit_counts = defaultdict(int)
        self.max_workers = max_workers
        self.max_depth = max_depth
        self.robot_parsers = {}

    def can_fetch(self, url):
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
        if base_url not in self.robot_parsers:
            rp = urllib.robotparser.RobotFileParser()
            rp.set_url(base_url)
            try:
                rp.read()
                self.robot_parsers[base_url] = rp
            except:
                self.robot_parsers[base_url] = None
        rp = self.robot_parsers.get(base_url)
        if rp:
            return rp.can_fetch('*', url)
        return True

    def get_crawl_delay(self, url):
        parsed_url = urlparse(url)
        base_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
        rp = self.robot_parsers.get(base_url)
        if rp and hasattr(rp, 'crawl_delay'):
            return rp.crawl_delay('*') or 0
        return 0

    def fetch_content(self, url, snippet, name, optional_info, depth):
        
        if depth > self.max_depth:
            return [], url
        if url in self.visited_urls:
            return [], url
        self.visited_urls.add(url)

        domain = urlparse(url).netloc
        if domain == "www.ukphonebook.com":  # Known issue
            return [], url

        if self.domain_visit_counts.get(domain, 0) >= MAX_DOMAIN_VISITS:
            # Skip quietly
            return [], url
        else:
            self.domain_visit_counts[domain] += 1


        chunks = []
        if snippet:
            snippet_chunks = self.extract_sections(snippet)
            chunks.extend(snippet_chunks)

        # Respect robots.txt
        if not self.can_fetch(url):
            return chunks, url
            
        
        # Polite crawling
        delay = self.get_crawl_delay(url)
        if delay > 0:
            time.sleep(delay)

        try:
            headers = {
                'User-Agent': 'Mozilla/5.0',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': '*/*',
            }
            response = requests.get(url, timeout=TIMEOUT, headers=headers)
            response.raise_for_status()
            content_type = response.headers.get('Content-Type', '').lower()
            if 'text/html' in content_type:
                chunks, url = self.process_html(response.text, url, snippet, name, optional_info, depth)
                return chunks, url
            elif 'application/pdf' in content_type or url.lower().endswith('.pdf'):
                chunks = self.extract_text_from_pdf(response.content)
                return chunks, url
            else:
                if snippet:
                    chunks = self.extract_sections(snippet)
                    return chunks, url
                else:
                    return [], url  # Return empty list if no content

        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            if snippet:
                chunks = self.extract_sections(snippet)
                return chunks, url
            else:
                return [], url

    def process_html(self, html_content, url, snippet, name, optional_info, depth):
        text = clean_text(html_content)
        chunks = self.extract_sections(text)  # Extract all chunks without filtering

        # Extract structured data
        structured_data = self.extract_structured_data(html_content)
        if structured_data:
            # You can process structured data here or pass it along with chunks
            # For now, let's serialize it and add it as an additional chunk
            structured_data_text = json.dumps(structured_data)
            chunks.append(structured_data_text)
        
        # Find all links on the page
        soup = BeautifulSoup(html_content, 'html.parser')
        links = set()
        for link_tag in soup.find_all('a', href=True):
            href = link_tag['href']
            href = urljoin(url, href)
            if href.startswith('http'):
                domain = urlparse(href).netloc
                if domain == urlparse(url).netloc:
                    if self.domain_visit_counts.get(domain, 0) < MAX_DOMAIN_VISITS:
                        # Check if the link is promising
                        if name.lower() in href.lower() or any(info.lower() in href.lower() for info in optional_info):
                            # High priority link
                            links.add((1, href))
                        else:
                            # Normal priority link
                            links.add((2, href))
        # Sort links based on priority
        links = [href for _, href in sorted(links)]

        # Recursively crawl linked URLs
        if depth < self.max_depth:
            with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
                futures = [
                    executor.submit(self.fetch_content, link, "", name, optional_info, depth + 1)
                    for link in links if link not in self.visited_urls
                ]
                for future in as_completed(futures):
                    child_chunks, _ = future.result()
                    if child_chunks:
                        chunks.extend(child_chunks)  # Add child chunks to the current list

        return chunks, url  # Return the list of all chunks and the URL

    def extract_text_from_pdf(self, pdf_content):
        try:
            with pymupdf.open(stream=pdf_content, filetype='pdf') as doc:
                text = ""
                for page in doc:
                    text += page.get_text()
            chunks = self.extract_sections(text)
            return chunks
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
            return []

    def extract_structured_data(self, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        scripts = soup.find_all('script', type='application/ld+json')
        structured_data = []
        for script in scripts:
            try:
                data = json.loads(script.string)
                structured_data.append(data)
            except json.JSONDecodeError:
                continue
        return structured_data

    def extract_sections(self, text):
        chunks = chunk_text_with_nlp_overlap(text, max_length=1000)
        return chunks

    def crawl(self, url_snippet_pairs, name, optional_info):
        all_chunks_with_urls = []
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            futures = [
                executor.submit(self.fetch_content, url, snippet, name, optional_info, 1)
                for url, snippet in url_snippet_pairs
            ]
            for future in as_completed(futures):
                chunks, url = future.result()
                if chunks:
                    chunks_with_urls = [(chunk, url) for chunk in chunks]
                    all_chunks_with_urls.extend(chunks_with_urls)
        return all_chunks_with_urls
