// components/TrendChart.js - Gráfico de Tendência Comparativo

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TrendChart({
  data,
  currentMonthName,
  previousMonthName,
}) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            {payload[0].payload.name}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-purple-600 dark:text-purple-400">
              {previousMonthName}: {payload[0].value}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {currentMonthName}: {payload[1].value}
            </p>
            <p
              className={`text-sm font-semibold ${
                payload[0].payload.variacao > 0
                  ? "text-green-600"
                  : payload[0].payload.variacao < 0
                    ? "text-red-600"
                    : "text-yellow-600"
              }`}
            >
              Variação: {payload[0].payload.variacao > 0 ? "+" : ""}
              {payload[0].payload.variacao}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        📊 Comparação Geral
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
          <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
          <Bar
            dataKey={previousMonthName}
            fill="#8B5CF6"
            radius={[8, 8, 0, 0]}
            name={previousMonthName}
          />
          <Bar
            dataKey={currentMonthName}
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
            name={currentMonthName}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
