import DeleteCategoryButton from './DeleteCategoryButton';
import MergeCategoryButton from './MergeCategoryButton';

// カテゴリテーブルコンポーネント
export default function CategoriesTable({ categories }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 divide-y">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/6">
                        カテゴリ名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center mr-4">
                        付け替え
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center mr-4">
                        削除
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(categories).map(category => (
                    <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap w-4/6">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <MergeCategoryButton
                                patchRouteName = 'categories.migrate'
                                target = {category}
                                targetModelName = 'カテゴリ'
                                allCategories = {categories}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <DeleteCategoryButton
                                deletionRouteName = 'categories.destroy'
                                target = {category}
                                targetModelName = 'カテゴリ'
                                allCategories = {categories}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
