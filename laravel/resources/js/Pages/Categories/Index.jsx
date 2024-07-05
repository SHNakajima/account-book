import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CategoriesTable from './CategoriesTable';
import AddCategoryButton from './AddCategoryButton';
import AddInitCategoriesButton from './AddInitCategoriesButton';
import { Transition } from '@headlessui/react';
import StickyHeader from '@/Components/StickyHeader';

// TODO: Modalコンポーネントを使う
export default function List({ auth, categories, status }) {
  const hasNoCategories =
    categories.incomes.length === 0 && categories.expenses.length === 0;

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          カテゴリ一覧
        </h2>
      }
    >
      <Head title="カテゴリ一覧" />
      <Transition show={hasNoCategories}>
        <div className="py-6">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8">
              <h2 className="text-lg font-semibold">カテゴリの追加が面倒？</h2>
              <div className="flex justify-center mt-6">
                <AddInitCategoriesButton className="" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="relative p-4 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">収入カテゴリ</h2>
              <AddCategoryButton categoryType="income" />
            </div>
            <CategoriesTable categories={categories.incomes} />

            {/* 支出カテゴリ */}
            <div className="flex justify-between items-center mt-8 mb-4">
              <h2 className="text-lg font-semibold">支出カテゴリ</h2>
              <AddCategoryButton categoryType="expense" />
            </div>

            <CategoriesTable categories={categories.expenses} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
