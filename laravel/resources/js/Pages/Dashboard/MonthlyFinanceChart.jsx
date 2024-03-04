import {
  Bar,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from 'recharts';
import { Text } from 'recharts';

export default function MonthlyBalanceChart({ data }) {
  data = [
    { display_ym: '2023/10月', income: 0, expense: 0 },
    { display_ym: '11月', income: 0, expense: 0 },
    { display_ym: '12月', income: 300000, expense: -200000 },
    { display_ym: '2024/1月', income: 320000, expense: -410000 },
    { display_ym: '2月', income: 310000, expense: -220000 },
    { display_ym: '3月', income: 330000, expense: -400000 },
  ];
  // 収支の推移データを作成
  const balanceData = data.map(item => ({
    年月: item.display_ym,
    収入: item.income,
    支出: item.expense,
    収支: item.income + item.expense,
  }));

  function CustomizedTick(props) {
    const { x, y, stroke, payload } = props;

    const offset = 0;

    const splited = payload.value.split('/');
    let line1val, line2val;
    if (splited.length > 1) {
      line2val = splited[0];
      line1val = splited[1];
    } else if (splited.length == 1) {
      line1val = splited[0];
    }
    return (
      <Text
        x={x}
        y={y + offset}
        style={{ fontSize: '12px' }}
        fill="#000000"
        textAnchor="middle"
        width="50"
        verticalAnchor="start"
      >
        {payload.value}
      </Text>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        data={balanceData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        stackOffset="sign"
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="年月"
          height={50}
          width={30}
          tick={<CustomizedTick />}
        />
        <YAxis font-size="12" />
        <Tooltip />
        <Legend />
        <Bar dataKey="収入" stackId="a" fill="#8884d8" />
        <Bar dataKey="支出" stackId="a" fill="#82ca9d" />
        <Line type="monotone" dataKey="収支" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
