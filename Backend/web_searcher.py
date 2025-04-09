import sys
import os
from serpapi import GoogleSearch
from constants import NUM_RESULTS


from dotenv import load_dotenv
load_dotenv()

class WebSearcher:
    def __init__(self):
        self.api_key = os.getenv('SERP_API_KEY')  

    def build_search_query(self, name, optional_info):
        query_parts = [f'"{name}"']  # Quote the name for exact match
        #query_parts.extend(optional_info)
        query = ' '.join(query_parts)
        return query

    def get_search_results(self, query, num_results=NUM_RESULTS, location="uk"):
        params = {
            'api_key': self.api_key,
            'q': query,
            'hl': "en",
            "engine": "google",
            'num': num_results,
            'gl': location,
            'filter':  0
        }
        try:
            search = GoogleSearch(params)
            results = search.get_dict()
            if 'error' in results:
                print(f"API Error: {results['error']}")
                sys.exit(1)
            return results.get("organic_results", [])
        except Exception as e:
            print(f"An error occurred: {e}")
            sys.exit(1)
