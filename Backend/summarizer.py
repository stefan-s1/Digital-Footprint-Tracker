import re
from collections import defaultdict
from summa.summarizer import summarize
from constants import RELEVANCE_THRESHOLD

class Summarizer:
    def __init__(self, name, optional_info, relevance_threshold=RELEVANCE_THRESHOLD):
        self.name = name
        self.optional_info = optional_info
        self.relevance_threshold = relevance_threshold

        # Generate name patterns
        self.name_patterns = self.generate_name_patterns(name)

    def generate_name_patterns(self, name):
        name_parts = name.strip().split()
        if len(name_parts) >= 2:
            first_name = name_parts[0].lower()
            last_name = name_parts[-1].lower()
            patterns = [
                f"{first_name}{last_name}",            # concatenated
                f"{first_name}.{last_name}",           # dot-separated
                f"{first_name}-{last_name}",           # hyphen-separated
                f"{first_name}_{last_name}",           # underscore-separated
                f"{first_name},{last_name}",           # comma-separated
                f"{first_name}, {last_name}",           # dot-separated
                f"{first_name}\\?{last_name}",         # question mark
                f"{first_name}\\*{last_name}",         # asterisk
                f"{first_name} {last_name}",           # space-separated
            ]
            return patterns
        else:
            # If only one name is provided, use it as is
            return [name.lower()]

    def calculate_relevance_score(self, text):
        score = 0
        text_lower = text.lower()
        name_lower = self.name.lower()
        matched_terms = set()

        if name_lower in text_lower:
            score += 15
            matched_terms.add(name_lower)
        else:
            # Check for name patterns
            for pattern in self.name_patterns:
                if re.search(re.escape(pattern), text_lower):
                    score += 8  # Assign points for pattern matches
                    matched_terms.add(pattern)

        for info in self.optional_info:
            info_lower = info.lower()
            if info_lower in text_lower and info_lower not in matched_terms:
                score += 5
                matched_terms.add(info_lower)

        return score

    def parse_and_filter_results(self, chunks_with_urls, progress_callback = None):
        relevant_chunks_with_urls = []
        for chunk, url in chunks_with_urls:
            if not chunk:
                continue
            score = self.calculate_relevance_score(chunk)
            if progress_callback:
                progress_callback(f"Relevance score for chunk from {url}: {score}")
            if score >= self.relevance_threshold:
                relevant_chunks_with_urls.append((chunk, url))
            else:
                if progress_callback:
                    progress_callback(f"Chunk from {url} did not meet the relevance threshold.")
        return relevant_chunks_with_urls

    def generate_summary(self, chunks_with_urls, ratio=0.2):
        url_to_chunks = defaultdict(list)
        for chunk, url in chunks_with_urls:
            url_to_chunks[url].append(chunk)

        summaries_with_urls = []
        for url, chunks in url_to_chunks.items():
            text = ' '.join(chunks)
            summary = summarize(text, ratio=ratio)
            if not summary:
                summary = text[:1000] + "..." if len(text) > 1000 else text
            summaries_with_urls.append((summary, url))
        return summaries_with_urls

