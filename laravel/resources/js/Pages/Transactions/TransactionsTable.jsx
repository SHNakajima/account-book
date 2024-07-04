import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DeleteTransactionButton from './DeleteTransactionButton';
import ModifyTransactionButton from './ModifyTransactionButton';
import EmptyState from './EmptyState';

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

const TransactionCard = ({ transaction, allCategories }) => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="px-4 py-3 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span
            className={`text-lg font-semibold truncate ${
              transaction.category.type === 'income'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {transaction.amount_str}
          </span>
          <span className="ml-2 text-sm font-medium text-gray-900 truncate">
            {transaction.category.display_name}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 truncate">
          {transaction.description}
        </p>
      </div>
      <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
        <ModifyTransactionButton
          patchRouteName="transactions.update"
          target={transaction}
          targetModelName="カテゴリ"
          allCategories={allCategories}
        >
          <PencilIcon
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
        </ModifyTransactionButton>
        <DeleteTransactionButton
          deletionRouteName="transactions.destroy"
          target={transaction}
          targetModelName="収支データ"
        >
          <TrashIcon
            className="h-5 w-5 text-gray-400 hover:text-gray-500"
            aria-hidden="true"
          />
        </DeleteTransactionButton>
      </div>
    </div>
  </div>
);

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
    <div className="space-y-6">
      {groupedTransactions.map(([date, dateTransactions]) => (
        <div key={date} className="relative">
          <h2
            className="text-lg font-semibold text-gray-900 mb-3 sticky bg-white z-30 py-2"
            style={{ top: `${headerHeight}px` }}
          >
            {date}
          </h2>
          <div className="ml-2 grid grid-cols-1 gap-3">
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
