import { TrashIcon } from '@heroicons/react/24/outline';

// カテゴリテーブルコンポーネント
export default function CategoryTable({ categories }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 divide-y">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        カテゴリ名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-end mr-4">
                        削除
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(categories).map(category => (
                    <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center justify-end"> {/* 右寄せのために text-right を追加 */}
                            <button className="text-red-500 hover:text-red-700 flex"> {/* justify-end を追加 */}
                                <TrashIcon className="h-5 w-5 mr-4" />
                                {/* <span>削除</span> */}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
