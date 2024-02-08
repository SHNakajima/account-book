import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import DeleteTransactionButton from './DeleteTransactionButton';
import ModifyTransactionButton from './ModifyTransactionButton';

export default function TransactionsTable({ transactions, allCategories }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              金額
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              カテゴリ名
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              詳細
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              日付
            </th>
            <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              編集
            </th>
            <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              削除
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td
                className={`px-4 py-4 whitespace-nowrap ${transaction.category.type === 'Income' ? 'text-blue-500' : 'text-red-500'}`}
              >
                {transaction.amount_str}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {transaction.category.display_name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap sm:whitespace-normal">
                {transaction.description}
              </td>
              <td className="px-4 py-4 whitespace-nowrap sm:whitespace-normal">
                {transaction.created_at_ymd}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-center">
                <ModifyTransactionButton
                  patchRouteName="transactions.update"
                  target={transaction}
                  targetModelName="カテゴリ"
                  allCategories={allCategories}
                />
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-center">
                <DeleteTransactionButton
                  deletionRouteName="transactions.destroy"
                  target={transaction}
                  targetModelName="収支データ"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
