import React from 'react';
import SearchForm from './SearchForm';
import ProgressLog from './ProgressLog';
import SummaryDisplay from './SummaryDisplay';

function MainContent({
  handleSearch,
  isSearching,
  logs,
  summaries,
  searchName,
}) {
  return (
    <main id="main-content" className="flex-grow p-4 container mx-auto">
      {/* Search Form */}
      <section className="mb-6">
        <SearchForm onSubmit={handleSearch} />
      </section>

      {/* Status Messages */}
      {isSearching && (
        <p className="text-center text-lg font-semibold mt-4 animate-pulse">
          Searching...
        </p>
      )}

      {/* Progress Log */}
      {logs.length > 0 && <ProgressLog logs={logs} />}

      {/* Summaries */}
      {summaries.length > 0 && (
        <SummaryDisplay summaries={summaries} searchName={searchName} />
      )}
    </main>
  );
}

export default MainContent;
