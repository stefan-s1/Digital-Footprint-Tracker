import React, { useEffect, useRef } from 'react';

function ProgressLog({ logs }) {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Progress Log</h2>
      <ul className="space-y-2">
        {logs.map((log, index) => (
          <li key={index} className="text-sm">
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
              [{log.timestamp}]
            </span>{' '}
            {log.message}
          </li>
        ))}
        <div ref={logEndRef} />
      </ul>
    </div>
  );
}

export default ProgressLog;
