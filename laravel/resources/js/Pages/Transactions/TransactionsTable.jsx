import React, { useState, useEffect } from 'react';
import EmptyState from './EmptyState';
import TransactionCard from './TransactionCard';
import { Chip } from '@nextui-org/react';

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
          <Chip
            size="lg"
            className="sticky z-30 my-4"
            style={{ top: `${headerHeight + 8}px` }}
          >
            {date}
          </Chip>
          <div className="mx-2 grid grid-cols-1 gap-4">
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
