import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          AI家計簿へようこそ！
        </h2>
      }
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">登録ありがとうございます!</div>
            <div className="p-6 text-gray-900">
              まずは、
              <Link
                href={route('categories.index')}
                className="text-blue-800 underline decoration-dashed"
              >
                カテゴリ一覧
              </Link>
              からカテゴリ登録をお願いします！
            </div>
            <div className="p-6 text-gray-900">
              いくつかカテゴリを登録したら、
              <span className="text-green-400">LINE</span>
              で収支を教えてください。
              <br />
              AIが自動で収支データを登録したカテゴリに振り分けてくれます！
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
