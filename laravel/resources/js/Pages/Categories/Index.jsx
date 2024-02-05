import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusIcon } from '@heroicons/react/24/outline'; // プラスアイコンを追加
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AddCategoryPopup from './AddCategoryPopup';
import CategoriesTable from './CategoriesTable';

// TODO: Modalコンポーネントを使う
export default function List({ auth, categories, status }) {
    const [showPopup, setShowPopup] = useState(false);
    const [categoryType, setCategoryType] = useState('');

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">カテゴリ一覧</h2>}
        >
            <Head title="カテゴリ一覧" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {/* 収入カテゴリ */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg text-gray-800">収入カテゴリ</h3>
                            <button
                                className="flex items-center mr-8 px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => {setShowPopup(true); setCategoryType('income');}}
                            >
                                <PlusIcon className="h-6 w-4" />
                            </button>
                        </div>
                        <div className="ml-4">
                            <CategoriesTable categories={categories.incomes} />
                        </div>

                        {/* 支出カテゴリ */}
                        <div className="flex justify-between items-center mt-8 mb-4">
                            <h3 className="font-semibold text-lg text-gray-800">支出カテゴリ</h3>
                            <button
                                className="flex items-center mr-8 px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                onClick={() => {setShowPopup(true); setCategoryType('expense');}}
                            >
                                <PlusIcon className="h-6 w-4" />
                            </button>
                        </div>

                        <div className="ml-4">
                            <CategoriesTable categories={categories.expenses} />
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <AddCategoryPopup closePopup={togglePopup} categoryType={categoryType} />}

        </AuthenticatedLayout>
    );
}