// pages/api/webhook/github.js
// Endpoint para receber webhooks do GitHub
// Atualiza dashboard em tempo real quando você commita

import crypto from "crypto";
import cache from "../../../lib/cache";

// Chaves de cache para invalidar
const CACHE_KEYS = ["github-data", "dashboard-data"];

export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // ========================================
    // ETAPA 1: VALIDAR ASSINATURA (SEGURANÇA)
    // ========================================

    const signature = req.headers["x-hub-signature-256"];
    const event = req.headers["x-github-event"];

    if (!signature) {
      console.log("[Webhook] ❌ Assinatura ausente");
      return res.status(401).json({ error: "Assinatura ausente" });
    }

    // Webhook secret (você vai configurar no GitHub)
    const secret = process.env.GITHUB_WEBHOOK_SECRET || "seu-secret-aqui";

    // Calcula hash esperado
    const payload = JSON.stringify(req.body);
    const hmac = crypto.createHmac("sha256", secret);
    const digest = "sha256=" + hmac.update(payload).digest("hex");

    // Compara assinaturas de forma segura
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest),
    );

    if (!isValid) {
      console.log("[Webhook] ❌ Assinatura inválida");
      return res.status(401).json({ error: "Assinatura inválida" });
    }

    // ========================================
    // ETAPA 2: PROCESSAR EVENTO
    // ========================================

    console.log(`[Webhook] 📩 Evento recebido: ${event}`);

    // Eventos que devem invalidar cache
    const relevantEvents = ["push", "pull_request", "create", "delete"];

    if (relevantEvents.includes(event)) {
      // Invalida todos os caches relacionados
      CACHE_KEYS.forEach((key) => {
        const deleted = cache.delete(key);
        if (deleted) {
          console.log(`[Webhook] 🗑️ Cache invalidado: ${key}`);
        }
      });

      // Log de evento processado
      logWebhookEvent(event, req.body);

      return res.status(200).json({
        success: true,
        message: "Webhook processado com sucesso",
        event,
        action: "cache_invalidated",
        timestamp: new Date().toISOString(),
      });
    }

    // Evento não relevante (ignora, mas registra)
    console.log(`[Webhook] ℹ️ Evento ignorado: ${event}`);

    return res.status(200).json({
      success: true,
      message: "Evento recebido mas não processado",
      event,
      action: "ignored",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Webhook] ❌ Erro:", error);

    return res.status(500).json({
      success: false,
      error: "Erro ao processar webhook",
      message: error.message,
    });
  }
}

/**
 * Registra evento do webhook (você pode salvar em banco depois)
 */
function logWebhookEvent(event, body) {
  const log = {
    timestamp: new Date().toISOString(),
    event,
    repository: body.repository?.full_name,
    sender: body.sender?.login,
  };

  // Log específico por tipo de evento
  switch (event) {
    case "push":
      log.commits = body.commits?.length || 0;
      log.ref = body.ref;
      console.log(
        `[Webhook] 📝 Push: ${log.commits} commit(s) em ${log.ref} por ${log.sender}`,
      );
      break;

    case "pull_request":
      log.action = body.action;
      log.pr_number = body.pull_request?.number;
      log.pr_title = body.pull_request?.title;
      console.log(
        `[Webhook] 🔀 PR #${log.pr_number}: ${log.action} por ${log.sender}`,
      );
      break;

    case "create":
      log.ref_type = body.ref_type;
      log.ref = body.ref;
      console.log(
        `[Webhook] ➕ Criado ${log.ref_type}: ${log.ref} por ${log.sender}`,
      );
      break;

    case "delete":
      log.ref_type = body.ref_type;
      log.ref = body.ref;
      console.log(
        `[Webhook] ➖ Deletado ${log.ref_type}: ${log.ref} por ${log.sender}`,
      );
      break;

    default:
      console.log(`[Webhook] 📩 Evento ${event} por ${log.sender}`);
  }

  // TODO: Aqui você pode salvar no banco de dados para histórico
  // saveToDatabase(log);
}

// Configuração para body parser (Next.js precisa disso para webhooks)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
