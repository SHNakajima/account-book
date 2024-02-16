import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CategoriesTable from './CategoriesTable';
import AddCategoryButton from './AddCategoryButton';
import AddInitCategoriesButton from './AddInitCategoriesButton';
import { Transition } from '@headlessui/react';

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
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <h2 className="font-semibold text-lg text-gray-800">
                カテゴリの追加が面倒？
              </h2>
              <div className="flex justify-center mt-6">
                <AddInitCategoriesButton className="" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
            {/* 収入カテゴリ */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                収入カテゴリ
              </h3>
              <AddCategoryButton categoryType="income" />
            </div>
            <div className="ml-4">
              <CategoriesTable categories={categories.incomes} />
            </div>

            {/* 支出カテゴリ */}
            <div className="flex justify-between items-center mt-8 mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                支出カテゴリ
              </h3>
              <AddCategoryButton categoryType="expense" />
            </div>

            <div className="ml-4">
              <CategoriesTable categories={categories.expenses} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
