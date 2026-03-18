// components/AdvancedCharts.js
// Componentes avançados de visualização: CircularProgress, Sparkline, Gauge
// 100% responsivo e com dark mode

import { useTheme } from "../hooks/useTheme";

// ============================================
// 1. CIRCULAR PROGRESS (Progresso Circular)
// ============================================
// Uso: Progresso de OKRs, KPIs circulares
// Props: value (0-100), size, color, showLabel

export function CircularProgress({
  value = 0,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#e2e8f0",
  showLabel = true,
  label = "",
  className = "",
}) {
  const { isDark } = useTheme();

  // Ajusta cor de fundo para dark mode
  const bgColor = isDark ? "#334155" : backgroundColor;

  // Calcula valores do círculo
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  // Determina cor baseada no progresso
  const getColor = () => {
    if (color !== "#3b82f6") return color; // Cor customizada
    if (value >= 75) return "#10b981"; // Verde
    if (value >= 50) return "#3b82f6"; // Azul
    if (value >= 25) return "#f59e0b"; // Amarelo
    return "#ef4444"; // Vermelho
  };

  const progressColor = getColor();

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Círculo de fundo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Círculo de progresso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Label central */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {Math.round(value)}%
          </span>
          {label && (
            <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// 2. SPARKLINE (Mini Gráfico de Linha)
// ============================================
// Uso: Tendências em cards, histórico compacto
// Props: data (array de números), width, height, color

export function Sparkline({
  data = [],
  width = 100,
  height = 30,
  color = "#3b82f6",
  strokeWidth = 2,
  showDots = false,
  fillArea = false,
  className = "",
}) {
  if (!data || data.length === 0) {
    return (
      <div className={`opacity-20 ${className}`} style={{ width, height }}>
        —
      </div>
    );
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Gera pontos do path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(" L ")}`;
  const areaData = `${pathData} L ${width},${height} L 0,${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      className={`overflow-visible ${className}`}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Área preenchida (opcional) */}
      {fillArea && <path d={areaData} fill={color} opacity="0.1" />}

      {/* Linha */}
      <path
        d={pathData}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-300"
      />

      {/* Pontos (opcional) */}
      {showDots &&
        data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={2}
              fill={color}
              className="transition-all duration-300"
            />
          );
        })}
    </svg>
  );
}

// ============================================
// 3. GAUGE (Medidor Semicircular)
// ============================================
// Uso: Performance geral, scores, ratings
// Props: value (0-100), size, label

export function Gauge({
  value = 0,
  size = 160,
  strokeWidth = 12,
  label = "",
  minLabel = "0",
  maxLabel = "100",
  showValue = true,
  className = "",
}) {
  const { isDark } = useTheme();

  // Raio e dimensões
  const radius = (size - strokeWidth) / 2;
  const centerX = size / 2;
  const centerY = size / 2;

  // Ângulos (semicírculo: -90° a 90°)
  const startAngle = -90;
  const endAngle = 90;
  const angleRange = endAngle - startAngle;
  const valueAngle = startAngle + (value / 100) * angleRange;

  // Converte ângulo para coordenadas
  const polarToCartesian = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  // Path do arco de fundo
  const bgStart = polarToCartesian(startAngle);
  const bgEnd = polarToCartesian(endAngle);
  const bgPath = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 0 1 ${bgEnd.x} ${bgEnd.y}`;

  // Path do arco de progresso
  const progressEnd = polarToCartesian(valueAngle);
  const largeArc = valueAngle - startAngle > 180 ? 1 : 0;
  const progressPath = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${progressEnd.x} ${progressEnd.y}`;

  // Cor baseada no valor
  const getColor = () => {
    if (value >= 75) return "#10b981"; // Verde
    if (value >= 50) return "#3b82f6"; // Azul
    if (value >= 25) return "#f59e0b"; // Amarelo
    return "#ef4444"; // Vermelho
  };

  const color = getColor();
  const bgColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg width={size} height={size * 0.6} className="overflow-visible">
        {/* Arco de fundo */}
        <path
          d={bgPath}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Arco de progresso */}
        <path
          d={progressPath}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />

        {/* Labels min/max */}
        <text
          x={bgStart.x}
          y={bgStart.y + 20}
          className="text-xs fill-slate-500 dark:fill-slate-400"
          textAnchor="start"
        >
          {minLabel}
        </text>
        <text
          x={bgEnd.x}
          y={bgEnd.y + 20}
          className="text-xs fill-slate-500 dark:fill-slate-400"
          textAnchor="end"
        >
          {maxLabel}
        </text>
      </svg>

      {/* Valor e label */}
      {showValue && (
        <div className="flex flex-col items-center -mt-8">
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {Math.round(value)}
          </span>
          {label && (
            <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// 4. MINI CARD COM SPARKLINE
// ============================================
// Componente auxiliar para usar Sparkline em cards

export function SparklineCard({
  title = "",
  value = 0,
  unit = "",
  data = [],
  trend = "neutral", // up, down, neutral
  trendValue = 0,
  color = "#3b82f6",
}) {
  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-slate-600 dark:text-slate-400",
  };

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {value}
              {unit}
            </span>
            {trendValue !== 0 && (
              <span className={`text-xs font-medium ${trendColors[trend]}`}>
                {trendIcons[trend]} {Math.abs(trendValue)}%
              </span>
            )}
          </div>
        </div>
        <Sparkline
          data={data}
          width={80}
          height={40}
          color={color}
          strokeWidth={2}
          fillArea={true}
        />
      </div>
    </div>
  );
}

// ============================================
// 5. PROGRESS RING (Mini versão do Circular)
// ============================================
// Uso: Progresso compacto inline

export function ProgressRing({
  value = 0,
  size = 40,
  strokeWidth = 4,
  color = "#3b82f6",
  showPercentage = false,
}) {
  const { isDark } = useTheme();
  const bgColor = isDark ? "#334155" : "#e2e8f0";

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {showPercentage && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-900 dark:text-white">
          {Math.round(value)}
        </span>
      )}
    </div>
  );
}
