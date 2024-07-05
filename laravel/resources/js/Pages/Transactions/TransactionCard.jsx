import React from 'react';
import { Card, CardBody, Button, Tooltip } from '@nextui-org/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DeleteTransactionButton from './DeleteTransactionButton';
import ModifyTransactionButton from './ModifyTransactionButton';

export default function TransactionCard({ transaction, allCategories }) {
  return (
    <Card className="w-full max-w-md">
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground/90">
                {transaction.category.display_name}
              </span>
              <span
                className={`text-lg font-semibold ${
                  transaction.category.type === 'income'
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                {transaction.amount_str}
              </span>
            </div>
            <p className="text-sm text-foreground/60 truncate">
              {transaction.description}
            </p>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <ModifyTransactionButton
              patchRouteName="transactions.update"
              target={transaction}
              targetModelName="カテゴリ"
              allCategories={allCategories}
            >
              <Button isIconOnly variant="light" size="sm">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </ModifyTransactionButton>
            <DeleteTransactionButton
              deletionRouteName="transactions.destroy"
              target={transaction}
              targetModelName="収支データ"
            >
              <Button isIconOnly variant="light" size="sm">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </DeleteTransactionButton>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
