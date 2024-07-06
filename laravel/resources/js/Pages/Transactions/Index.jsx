import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import useLiff from '@/hooks/useLiff';
import { useEffect, useState } from 'react';
import AddTransactionButton from './AddTransactionButton';
import TransactionsTable from './TransactionsTable';

export default function List({ auth, transactions, allCategories, status }) {
  const [displayAddButton, setDisplayAddButton] = useState(false);
  // 修正
  const liff = useLiff();

  useEffect(() => {
    console.log(liff);
    setDisplayAddButton(liff.ready);
  }, [liff]); // 依存する値がない場合は空の配列を渡す

  return (
    <AuthenticatedLayout user={auth.user} pageTitle={'収支一覧'}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="px-4 sm:p-8 sm:rounded-lg">
            <div className="flex justify-between items-center mb-4">
              {displayAddButton && <AddTransactionButton liff={liff} />}
            </div>
            <div>
              <TransactionsTable
                transactions={transactions}
                allCategories={allCategories}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
