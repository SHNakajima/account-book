import { Card, Button, CardBody, CardHeader } from '@nextui-org/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DeleteTransactionButton from './DeleteTransactionButton';
import ModifyTransactionButton from './ModifyTransactionButton';

export default function TransactionCard({ transaction, allCategories }) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="ml-2 text-sm font-medium text-gray-900 truncate">
              {transaction.category.display_name}
            </span>
            <span
              className={`text-lg font-semibold truncate ${
                transaction.category.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.amount_str}
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
}
