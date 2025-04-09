# main.py

import sys
import argparse
from constants import MAX_DEPTH, ITERATIONS, RELEVANCE_THRESHOLD, NUM_RESULTS

from web_searcher import WebSearcher
from content_fetcher import ContentFetcher
from summarizer import Summarizer
from utils import extract_new_keywords, save_summary

def perform_search(name, optional_info, progress_callback=None, output_dir='output', num_results=NUM_RESULTS, iterations=ITERATIONS,
                   relevance_threshold=RELEVANCE_THRESHOLD, max_depth=MAX_DEPTH, ratio=0.2, no_iterative=False):
    web_searcher = WebSearcher()
    content_fetcher = ContentFetcher(max_depth=max_depth)
    summarizer = Summarizer(name, optional_info, relevance_threshold=relevance_threshold)

    all_relevant_chunks_with_urls = []

    for iteration in range(iterations):
        if progress_callback:
            progress_callback(f"Starting iteration {iteration + 1}")

        content_fetcher.visited_urls.clear()
        content_fetcher.domain_visit_counts.clear()

        search_query = web_searcher.build_search_query(name, optional_info)
        if progress_callback:
            progress_callback(f"Performing search with query: '{search_query}'")

        results = web_searcher.get_search_results(search_query, num_results=num_results)
        if not results:
            if progress_callback:
                progress_callback("No search results found.")
            break

        url_snippet_pairs = [(item.get('link'), item.get('snippet', '')) for item in results if item.get('link')]
        contents = content_fetcher.crawl(url_snippet_pairs, name, optional_info)
        relevant_chunks_with_urls = summarizer.parse_and_filter_results(contents, progress_callback)

        if not relevant_chunks_with_urls:
            if progress_callback:
                progress_callback("No relevant information found after filtering.")
            break

        all_relevant_chunks_with_urls.extend(relevant_chunks_with_urls)

        if not no_iterative and iteration < iterations - 1:
            top_texts = [text for text, _ in all_relevant_chunks_with_urls[:2]]
            new_keywords = extract_new_keywords(top_texts, name)
            optional_info.extend(new_keywords)
            optional_info = list(set(optional_info))

    if not all_relevant_chunks_with_urls:
        if progress_callback:
            progress_callback("No meaningful information available to summarize.")
        return None

    summaries_with_urls = summarizer.generate_summary(all_relevant_chunks_with_urls, ratio=ratio)
    if progress_callback:
        progress_callback("Summary generated successfully.")

    # Not saving any data to disk
    # save_summary(name, summaries_with_urls, output_dir=output_dir)

    return summaries_with_urls

def main():
    parser = argparse.ArgumentParser(description="Fetch and summarize information about a person.")
    parser.add_argument('name', type=str, help="Name of the person to search for.")
    parser.add_argument('--optional_info', nargs='*', type=str, help="Optional information about the person.", default=[])
    parser.add_argument('--output_dir', type=str, help="Directory to save the summary file.", default='output')
    parser.add_argument('--num_results', type=int, help="Number of search results to fetch.", default=NUM_RESULTS)
    parser.add_argument('--iterations', type=int, help="Number of iterations for iterative querying.", default=ITERATIONS)
    parser.add_argument('--relevance_threshold', type=int, help="Minimum relevance score to include a page.", default=RELEVANCE_THRESHOLD)
    parser.add_argument('--max_depth', type=int, help="Maximum depth for recursive crawling.", default=MAX_DEPTH)
    parser.add_argument('--ratio', type=float, help="Ratio for summarization (0 < ratio < 1).", default=0.2)
    parser.add_argument('--no_iterative', action='store_true', help="Disable iterative querying.")

    args = parser.parse_args()

    optional_info = args.optional_info

    results = perform_search(
        name=args.name,
        optional_info=optional_info,
        output_dir=args.output_dir,
        num_results=args.num_results,
        iterations=args.iterations,
        relevance_threshold=args.relevance_threshold,
        max_depth=args.max_depth,
        ratio=args.ratio,
        no_iterative=args.no_iterative
    )

    if results is None:
        sys.exit(1)

    # Optional: Display the summaries in the terminal
    # print("\n--- Summaries ---\n")
    # for summary, url in results:
    #     print(f"URL: {url}")
    #     print(f"Summary:\n{summary}\n")
    # print("---------------\n")

if __name__ == "__main__":
    main()
