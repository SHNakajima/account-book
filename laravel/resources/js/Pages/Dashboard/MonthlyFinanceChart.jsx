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
    { year: '2023年', display_ym: '10月', income: 0, expense: 0 },
    { display_ym: '11月', income: 0, expense: 0 },
    { display_ym: '12月', income: 300000, expense: -200000 },
    { year: '2024年', display_ym: '1月', income: 320000, expense: -410000 },
    { display_ym: '2月', income: 310000, expense: -220000 },
    { display_ym: '3月', income: 330000, expense: -400000 },
  ];
  // 収支の推移データを作成
  const balanceData = data.map(item => ({
    年: item.year ?? '',
    月: item.display_ym,
    収入: item.income,
    支出: item.expense,
    収支: item.income + item.expense,
  }));

  function CustomizedTick(props) {
    const { x, y, stroke, payload } = props;

    const offsetX = 8;
    const offsetY = -10;
    return (
      <Text
        x={x + offsetX}
        y={y + offsetY}
        textAnchor="middle"
        verticalAnchor="start"
        style={{ fontSize: '14px' }}
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
        <XAxis dataKey="月" fontSize="14" />
        <XAxis
          dataKey="年"
          axisLine={false}
          tickLine={false}
          xAxisId="quarter"
          tick={<CustomizedTick />}
        />
        <YAxis fontSize="14" />
        <Tooltip />
        <Legend />
        <Bar dataKey="収入" stackId="a" fill="#8884d8" />
        <Bar dataKey="支出" stackId="a" fill="#82ca9d" />
        <Line type="monotone" dataKey="収支" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
