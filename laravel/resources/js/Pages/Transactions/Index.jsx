import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TransactionsTable from './TransactionsTable';
import { PlusIcon } from '@heroicons/react/24/outline'; // プラスアイコンを追加

export default function List({ auth, transactions, status }) {
    console.log(transactions);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">収支一覧</h2>}
        >
            <Head title="収支一覧" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg text-gray-800">収支</h3>
                            <button onClick={e => alert("開発中です！少々お待ちください")} className="flex items-center mr-8 px-3 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                <PlusIcon className="h-6 w-4" />
                            </button>
                        </div>
                        <div className="ml-4">
                            <TransactionsTable transactions={transactions} />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
