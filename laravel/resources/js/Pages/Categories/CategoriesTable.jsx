import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import DeleteCategoryButton from './DeleteCategoryButton';
import MergeCategoryButton from './MergeCategoryButton';

// カテゴリテーブルコンポーネント
export default function CategoriesTable({ categories }) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>カテゴリ名</TableColumn>
        <TableColumn align="center">データ数</TableColumn>
        <TableColumn align="center">付け替え</TableColumn>
        <TableColumn>削除</TableColumn>
      </TableHeader>
      <TableBody>
        {Object.values(categories).map(category => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.transaction_count}</TableCell>
            <TableCell>
              <MergeCategoryButton
                patchRouteName="categories.merge"
                target={category}
                targetModelName="カテゴリ"
                allCategories={categories}
              />
            </TableCell>
            <TableCell>
              <DeleteCategoryButton
                deletionRouteName="categories.destroy"
                target={category}
                targetModelName="カテゴリ"
                allCategories={categories}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
