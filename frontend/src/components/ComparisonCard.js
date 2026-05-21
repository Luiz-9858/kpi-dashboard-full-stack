// components/ComparisonCard.js - Card de Comparação Individual

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function ComparisonCard({ label, comparison }) {
  const { current, previous, diff, percentChange, status, emoji } = comparison;

  const getStatusColor = () => {
    if (status === "up") return "text-green-500";
    if (status === "down") return "text-red-500";
    return "text-yellow-500";
  };

  const getStatusIcon = () => {
    if (status === "up") return <TrendingUp className="w-5 h-5" />;
    if (status === "down") return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  const getBgColor = () => {
    if (status === "up") return "bg-green-500/10 dark:bg-green-500/20";
    if (status === "down") return "bg-red-500/10 dark:bg-red-500/20";
    return "bg-yellow-500/10 dark:bg-yellow-500/20";
  };

  const formatValue = (value) => {
    if (label.includes("Horas")) return `${value}h`;
    return value;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </h3>
        <span className="text-2xl">{emoji}</span>
      </div>

      {/* Valores */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
            Anterior
          </p>
          <p className="text-2xl font-bold text-gray-400 dark:text-gray-500">
            {formatValue(previous)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Atual</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatValue(current)}
          </p>
        </div>
      </div>

      {/* Variação */}
      <div
        className={`flex items-center justify-between p-3 rounded-lg ${getBgColor()}`}
      >
        <div className={`flex items-center gap-2 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-semibold">
            {diff > 0 ? "+" : ""}
            {formatValue(diff)}
          </span>
        </div>
        <span className={`font-bold ${getStatusColor()}`}>
          {percentChange > 0 ? "+" : ""}
          {percentChange}%
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="mt-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              status === "up"
                ? "bg-green-500"
                : status === "down"
                  ? "bg-red-500"
                  : "bg-yellow-500"
            }`}
            style={{
              width: `${Math.min(Math.abs(percentChange), 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
