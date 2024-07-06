import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DoughnutsGraph from '@/Pages/Dashboard/DoughnutsGraph';
import { router } from '@inertiajs/react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import MonthSelector from './MonthSelector';
import MonthlyFinanceChart from './MonthlyFinanceChart';

export default function Dashboard({
  auth,
  monthlyCategoryPercentages,
  latestSummary,
  ym,
}) {
  const year = parseInt(ym.slice(0, 4));
  const month = parseInt(ym.slice(4, 6));

  const handleChageYm = ym =>
    router.visit(route('dashboard', { ym: ym }), {
      only: ['monthlyCategoryPercentages', 'latestSummary', 'ym'],
      preserveScroll: true,
    });

  const currentMonthData = latestSummary[latestSummary.length - 1];
  const sumClassName =
    currentMonthData.income + currentMonthData.expense > 0
      ? 'text-indigo-800'
      : 'text-red-600';

  return (
    <AuthenticatedLayout user={auth.user} pageTitle={'収支サマリー'}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="overflow-hidden ">
            <div className="p-4">
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-xl text-gray-800">
                    月ごとの推移
                  </h2>
                </CardHeader>
                <Divider />
                <CardBody>
                  <MonthlyFinanceChart data={latestSummary} />
                </CardBody>
              </Card>
              <Card className="mt-4">
                <div className="p-3">
                  <MonthSelector
                    currentMonth={month}
                    currentYear={year}
                    handleChageYm={handleChageYm}
                  />
                </div>
                <Divider />
                <div className="p-6">
                  <Card>
                    <CardHeader>
                      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        収支
                      </h2>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="p-2 flex flex-col items-center">
                        <div className="w-1/2 flex justify-between">
                          <span>収入</span>
                          <span>
                            <span className="text-indigo-800">
                              {currentMonthData.display_income}
                            </span>
                          </span>
                        </div>
                        <div className="w-1/2 py-1 flex justify-between">
                          <span>支出</span>
                          <span>
                            <span className="text-red-600">
                              {currentMonthData.display_expense}
                            </span>
                          </span>
                        </div>
                        <div className="w-1/2 flex justify-between">
                          <span>収支</span>
                          <span>
                            <span className={sumClassName}>
                              {currentMonthData.display_sum}
                            </span>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="px-6 pb-6">
                  <Card>
                    <CardHeader>
                      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        カテゴリ別支出
                      </h2>
                    </CardHeader>
                    <Divider />
                    <div>
                      <DoughnutsGraph data={monthlyCategoryPercentages} />
                    </div>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
