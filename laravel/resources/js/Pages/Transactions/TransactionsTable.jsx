import React, { useState, useEffect } from 'react';
import EmptyState from './EmptyState';
import TransactionCard from './TransactionCard';

const groupTransactionsByDate = transactions => {
  const grouped = {};
  transactions.forEach(transaction => {
    if (!grouped[transaction.created_at_ymd]) {
      grouped[transaction.created_at_ymd] = [];
    }
    grouped[transaction.created_at_ymd].push(transaction);
  });
  return Object.entries(grouped).sort(([a], [b]) => new Date(b) - new Date(a));
};

export default function TransactionsList({ transactions, allCategories }) {
  const groupedTransactions = groupTransactionsByDate(transactions);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  if (transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {groupedTransactions.map(([date, dateTransactions]) => (
        <div key={date} className="relative">
          <h2
            className="text-lg font-semibold text-gray-900  bg-gray-100 mb-3 sticky z-30 py-2"
            style={{ top: `${headerHeight}px` }}
          >
            {date}
          </h2>
          <div className="mx-2 grid grid-cols-1 gap-3">
            {dateTransactions.map(transaction => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                allCategories={allCategories}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// groupTransactionsByDate関数は変更なし
