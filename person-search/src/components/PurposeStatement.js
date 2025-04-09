import React from 'react';

function PurposeStatement() {
  return (
    <div className="p-6 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Purpose Statement</h2>

      <p className="text-lg mb-4">
        I created this tool to raise awareness about the amount of personal information available on the internet and to help users track their digital footprint. Developed independently by a single person (me), this tool intentionally doesn't include some powerful tools/websites for people searching — as in my eyes those tools are unethical and constitute a violation of privacy, even though they may be legal.
        This means that in all likelihood there is much more out there on the internet than my tool will find.
        Importantly, no user data or search results are stored; all data is deleted immediately after presentation. For more details, please refer to the GDPR statement.
      </p>

      <h3 className="text-2xl font-bold mb-4">How It Works</h3>
      <p className="text-lg mb-4">
        The website searches your name (along with any optional information) on the internet, follows the resulting links, and explores links on those pages. It reads the retrieved content, extracts relevant information, and provides these extracts along with their source URLs so you can review them yourself.
      </p>

      <h3 className="text-2xl font-bold mb-4">Technical Details</h3>
      <p className="text-lg mb-4">
        In programming terms, the tool treats search results as seed URLs for a custom web crawler, with scraping done using Beautiful Soup. This crawler is designed to be respectful by adhering to <code>robots.txt</code> policies, observing server-requested delays, and limiting the number of visits per domain to ensure compliance. The search utilizes SERPAPI for accessing search engine results. Relevant text extraction is performed using a custom Natural Language Processing (NLP) chunking algorithm based on spaCy, combined with a custom relevance scoring metric to identify only the relevant information. I experimented with named-entity recognition (NER) were conducted, it ended up to not work as well as hoped and so was ultimately scrapped.
      </p>

      <h3 className="text-2xl font-bold mb-4">Privacy and Compliance</h3>
      <p className="text-lg mb-4">
        While exploring additional features like integrating LLMs or accessing public records, I prioritized user privacy and compliance with regulations like GDPR, leading to the decision to maintain the tool's current scope. Incorporating such features was deemed beyond the intended purpose due to potential privacy concerns and the impracticality of hosting LLMs independently.
      </p>

      <p className="text-lg mb-4">
        I welcome any feedback or questions you may have about the tool. Please feel free to reach out if you'd like to know more.
      </p>
    </div>
  );
}

export default PurposeStatement;
