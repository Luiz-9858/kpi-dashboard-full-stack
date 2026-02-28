// components/Charts.js
// Componentes de gráficos com Recharts configurados para dark/light mode

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../hooks/useTheme";

// Cores para gráficos
const CHART_COLORS = {
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  cyan: "#06b6d4",
  pink: "#ec4899",
};

// Tooltip customizado
function CustomTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600 dark:text-slate-400">
              {entry.name}:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {valueFormatter ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Gráfico de Linha
export function LineChartComponent({
  data,
  dataKeys = [],
  xAxisKey = "name",
  title = "",
  height = 300,
  colors = [CHART_COLORS.primary, CHART_COLORS.success],
  valueFormatter = (value) => value,
  labelFormatter = (label) => label,
}) {
  const { isDark } = useTheme();

  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xAxisKey}
            stroke={textColor}
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            content={
              <CustomTooltip
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: "14px", color: textColor }} />
          {dataKeys.map((key, index) => (
            <Line
              key={key.dataKey || key}
              type="monotone"
              dataKey={key.dataKey || key}
              name={key.name || key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de Barras
export function BarChartComponent({
  data,
  dataKeys = [],
  xAxisKey = "name",
  title = "",
  height = 300,
  colors = [CHART_COLORS.primary, CHART_COLORS.success],
  valueFormatter = (value) => value,
  labelFormatter = (label) => label,
  stacked = false,
}) {
  const { isDark } = useTheme();

  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xAxisKey}
            stroke={textColor}
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            content={
              <CustomTooltip
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: "14px", color: textColor }} />
          {dataKeys.map((key, index) => (
            <Bar
              key={key.dataKey || key}
              dataKey={key.dataKey || key}
              name={key.name || key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? "stack" : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de Área
export function AreaChartComponent({
  data,
  dataKeys = [],
  xAxisKey = "name",
  title = "",
  height = 300,
  colors = [CHART_COLORS.primary, CHART_COLORS.success],
  valueFormatter = (value) => value,
  labelFormatter = (label) => label,
}) {
  const { isDark } = useTheme();

  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <defs>
            {dataKeys.map((key, index) => (
              <linearGradient
                key={`gradient-${key.dataKey || key}`}
                id={`color-${key.dataKey || key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey={xAxisKey}
            stroke={textColor}
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            content={
              <CustomTooltip
                valueFormatter={valueFormatter}
                labelFormatter={labelFormatter}
              />
            }
          />
          <Legend wrapperStyle={{ fontSize: "14px", color: textColor }} />
          {dataKeys.map((key, index) => (
            <Area
              key={key.dataKey || key}
              type="monotone"
              dataKey={key.dataKey || key}
              name={key.name || key}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              fill={`url(#color-${key.dataKey || key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de Pizza
export function PieChartComponent({
  data,
  dataKey = "value",
  nameKey = "name",
  title = "",
  height = 300,
  colors = Object.values(CHART_COLORS),
  valueFormatter = (value) => value,
}) {
  const { isDark } = useTheme();
  const textColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip valueFormatter={valueFormatter} />}
          />
          <Legend wrapperStyle={{ fontSize: "14px", color: textColor }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Exporta cores para uso externo
export { CHART_COLORS };
