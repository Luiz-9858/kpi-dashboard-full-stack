// lib/pdfExport.js - Gerador de PDF para Relatórios (SEM EMOJIS)

import jsPDF from "jspdf";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Gera PDF do relatório semanal
 * @param {Object} data - Dados do relatório
 * @param {Object} data.score - Score de produtividade
 * @param {Object} data.summary - Resumo semanal
 * @param {Array} data.kpis - Lista de KPIs
 * @param {Array} data.insights - Insights automáticos
 */
export function generateReportPDF(data) {
  // Criar documento PDF (A4)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Cores
  const primaryColor = [59, 130, 246]; // Blue
  const successColor = [16, 185, 129]; // Green
  const warningColor = [245, 158, 11]; // Yellow
  const dangerColor = [239, 68, 68]; // Red
  const grayColor = [107, 114, 128]; // Gray
  const lightGrayColor = [243, 244, 246]; // Light Gray

  // ========== CABEÇALHO ==========

  // Logo "K" (círculo azul com letra branca)
  doc.setFillColor(...primaryColor);
  doc.circle(margin, yPosition + 5, 7, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("K", margin - 2.5, yPosition + 8);

  // Título (SEM EMOJI)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("KPI Dashboard - Relatorio Semanal", margin + 12, yPosition + 5);

  // Data de geração (SEM EMOJI)
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  const currentDate = format(
    new Date(),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss",
    {
      locale: ptBR,
    },
  );
  doc.text(`Gerado em: ${currentDate}`, margin + 12, yPosition + 12);

  // Linha separadora
  yPosition += 22;
  doc.setDrawColor(...grayColor);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  // ========== SCORE DE PRODUTIVIDADE ==========

  if (data.score !== undefined) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("SCORE DE PRODUTIVIDADE", margin, yPosition); // SEM EMOJI

    yPosition += 8;

    // Caixa do score
    const scoreColor =
      data.score >= 80
        ? successColor
        : data.score >= 60
          ? warningColor
          : dangerColor;

    doc.setFillColor(...scoreColor);
    doc.roundedRect(margin, yPosition, 40, 15, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.score}`, margin + 12, yPosition + 10);

    doc.setFontSize(10);
    doc.text("/100", margin + 25, yPosition + 10);

    yPosition += 20;
  }

  // ========== RESUMO SEMANAL ==========

  if (data.summary) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("RESUMO SEMANAL", margin, yPosition); // SEM EMOJI

    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grayColor);

    // Resumo com bullets simples
    const summaryItems = [
      `Horas Totais: ${data.summary.horasTotal || 0}h`,
      `Commits: ${data.summary.commits || 0}`,
      `Tasks Completadas: ${data.summary.tasksCompletadas || 0}`,
      `Streak: ${data.summary.streak || 0} dias`,
    ];

    summaryItems.forEach((item, index) => {
      doc.text(`• ${item}`, margin + 5, yPosition + index * 6);
    });

    yPosition += summaryItems.length * 6 + 5;
  }

  // ========== KPIs PRINCIPAIS ==========

  if (data.kpis && data.kpis.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("KPIs PRINCIPAIS", margin, yPosition); // SEM EMOJI

    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    // Cabeçalho da tabela
    doc.setFillColor(...lightGrayColor);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 7, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("KPI", margin + 2, yPosition + 5);
    doc.text("Valor", margin + 70, yPosition + 5);
    doc.text("Meta", margin + 100, yPosition + 5);
    doc.text("Status", margin + 130, yPosition + 5);

    yPosition += 10;

    // Linhas de KPIs
    doc.setFont("helvetica", "normal");
    data.kpis.forEach((kpi, index) => {
      // Alternar cor de fundo
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, yPosition - 3, pageWidth - 2 * margin, 7, "F");
      }

      doc.setTextColor(0, 0, 0);
      doc.text(kpi.label || "", margin + 2, yPosition + 2);
      doc.text(String(kpi.valor || 0), margin + 70, yPosition + 2);
      doc.text(String(kpi.meta || "-"), margin + 100, yPosition + 2);

      // Status em TEXTO (não emoji)
      let statusText = "AVISO";
      let statusColor = warningColor;

      if (kpi.status === "🟢" || kpi.percentual >= 80) {
        statusText = "OK";
        statusColor = successColor;
      } else if (kpi.status === "🔴" || kpi.percentual < 60) {
        statusText = "BAIXO";
        statusColor = dangerColor;
      }

      doc.setTextColor(...statusColor);
      doc.setFont("helvetica", "bold");
      doc.text(statusText, margin + 130, yPosition + 2);
      doc.setFont("helvetica", "normal");

      yPosition += 7;

      // Nova página se necessário
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }
    });

    yPosition += 5;
  }

  // ========== INSIGHTS ==========

  if (data.insights && data.insights.length > 0) {
    // Nova página se pouco espaço
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("INSIGHTS E RECOMENDACOES", margin, yPosition); // SEM EMOJI

    yPosition += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    data.insights.forEach((insight, index) => {
      // Caixa colorida
      const boxColor =
        insight.type === "success" ? [16, 185, 129] : [245, 158, 11];

      doc.setDrawColor(...boxColor);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, yPosition, pageWidth - 2 * margin, 12, 2, 2, "S");

      // Título
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...boxColor);
      doc.text(insight.title || "", margin + 3, yPosition + 5);

      // Mensagem
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...grayColor);

      // Quebrar texto longo
      const maxWidth = pageWidth - 2 * margin - 6;
      const lines = doc.splitTextToSize(insight.message || "", maxWidth);
      doc.text(lines, margin + 3, yPosition + 9);

      yPosition += 15;

      // Nova página se necessário
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }
    });
  }

  // ========== RODAPÉ ==========

  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...grayColor);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Pagina ${i} de ${totalPages} | KPI Dashboard | ${currentDate}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );
  }

  // ========== SALVAR PDF ==========

  const fileName = `relatorio-semanal-${format(new Date(), "yyyy-MM-dd")}.pdf`;
  doc.save(fileName);

  console.log(`[PDF] OK - Relatorio salvo: ${fileName}`);
  return fileName;
}

/**
 * Formata dados do relatório para o PDF
 * @param {Object} dashboardData - Dados completos do dashboard
 * @returns {Object} Dados formatados para PDF
 */
export function formatDataForPDF(dashboardData) {
  // A resposta vem dentro de "data"
  const data = dashboardData.data || dashboardData;
  const { kpis, quickStats, github } = data;

  // Extrair todos os KPIs de todas as categorias
  const allKPIs = [];

  if (kpis) {
    // Extrair de cada categoria
    Object.keys(kpis).forEach((category) => {
      if (category !== "summary" && typeof kpis[category] === "object") {
        Object.entries(kpis[category]).forEach(([key, kpiData]) => {
          if (
            kpiData &&
            typeof kpiData === "object" &&
            kpiData.value !== undefined
          ) {
            // Calcular percentual
            const value = kpiData.value || 0;
            const targetMin = kpiData.target?.min || 0;
            const targetMax = kpiData.target?.max || 0;
            const target = targetMax || targetMin;
            const percentual =
              target > 0 ? Math.round((value / target) * 100) : 0;

            allKPIs.push({
              label: formatKPILabel(key),
              valor:
                typeof value === "number" ? Math.round(value * 10) / 10 : value,
              meta: target || "-",
              status: kpiData.status || "warning",
              percentual: percentual,
            });
          }
        });
      }
    });
  }

  // Score de produtividade baseado em status
  let successCount = 0;
  let totalKPIs = allKPIs.length;

  allKPIs.forEach((kpi) => {
    if (kpi.status === "success") {
      successCount++;
    }
  });

  const avgScore =
    totalKPIs > 0 ? Math.round((successCount / totalKPIs) * 100) : 0;

  // Resumo semanal
  const summary = {
    horasTotal: quickStats?.totalHoursWeek || 0,
    commits: github?.commits?.total || 0,
    tasksCompletadas: quickStats?.tasksCompleted || 0,
    streak: quickStats?.streak || 0,
  };

  // KPIs formatados (primeiros 12)
  const kpisForPDF = allKPIs.slice(0, 12);

  // Insights (se existir na estrutura)
  const insightsArray = Array.isArray(data.insights) ? data.insights : [];

  return {
    score: avgScore,
    summary,
    kpis: kpisForPDF,
    insights: insightsArray.slice(0, 5),
  };
}

/**
 * Formata label do KPI para exibição
 * @param {string} key - Chave do KPI (ex: "praticaHours")
 * @returns {string} Label formatado
 */
function formatKPILabel(key) {
  const labels = {
    praticaHours: "Horas Prática",
    teoriaHours: "Horas Teoria",
    inglesHours: "Horas Inglês",
    totalHours: "Total Horas",
    daysStudied: "Dias Estudados",
    streak: "Streak",
    commits: "Commits",
    features: "Features",
    bugs: "Bugs",
    prs: "Pull Requests",
    projects: "Projetos",
    modules: "Módulos",
    exercises: "Exercícios",
    concepts: "Conceitos",
    lessons: "Lições Inglês",
    worksheets: "Worksheets",
  };

  return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
