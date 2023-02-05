import React, { useMemo } from 'react';

const Table = ({ entries }) => {
  const renderTableCell = useMemo(
    () =>
      entries.map((entry, idx) => (
        <tr key={`${entry.idx}-${idx}`} className="text-gray-700">
          <td className="border p-4 dark:border-dark-5">{entry.fxRate}</td>
          <td className="border p-4 dark:border-dark-5">
            {entry.overrideValue || 'N/A'}
          </td>
          <td className="border p-4 dark:border-dark-5">{entry.amount}</td>
          <td className="border p-4 dark:border-dark-5">
            {entry.convertedAmount}
          </td>
        </tr>
      )),
    [entries]
  );

  return (
    <table className="table p-4 bg-white rounded-lg shadow">
      <thead>
        <tr>
          <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            FX Rate
          </th>
          <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            FX Override
          </th>
          <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            Amount
          </th>
          <th className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
            Converted Amount
          </th>
        </tr>
      </thead>
      <tbody>{renderTableCell}</tbody>
    </table>
  );
};

export default Table;
