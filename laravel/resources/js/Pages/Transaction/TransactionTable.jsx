import { PencilIcon } from '@heroicons/react/24/outline';

export default function TransactionTable({ transactions }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">編集</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className={`px-6 py-4 whitespace-nowrap ${transaction.category.type === 'Income' ? 'text-blue-500' : 'text-red-500'}`}>{transaction.amount_str}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.category.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap sm:whitespace-normal">{transaction.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap sm:whitespace-normal">{transaction.created_at_ymd}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="text-blue-500 hover:text-blue-700 flex items-center">
                                    <PencilIcon className="h-5 w-5 mr-1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}