function SummaryDisplay({ summaries }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Summary Results</h2>
      {summaries.map((item, index) => (
        <div
          key={index}
          className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-md shadow-md"
        >
          <h3 className="text-lg font-bold">
            Source:{' '}
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.url}
            </a>
          </h3>
          <p className="mt-2">{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default SummaryDisplay;