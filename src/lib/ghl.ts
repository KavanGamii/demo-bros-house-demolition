// GoHighLevel integration. Server-only — never import this from a component.
//
// Posts each lead to a GHL Inbound Webhook trigger. Note that GHL bills Inbound
// Webhook triggers per execution, and the endpoint returns no detail about why a
// lead was rejected — we log the full payload on failure so nothing is lost.

const WEBHOOK_TIMEOUT_MS = 10_000;

/**
 * Normalises Australian numbers to E.164, which GHL needs for SMS delivery and
 * for phone-based deduplication. "0412 345 678" → "+61412345678". Anything that
 * doesn't look like a recognisable AU number is passed through untouched so an
 * unusual-but-valid number is never mangled into a wrong one.
 */
export function normaliseAuPhone(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return "+" + trimmed.slice(1).replace(/\D/g, "");

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return "+61" + digits.slice(1);
  if (digits.length === 11 && digits.startsWith("61")) return "+" + digits;
  if (digits.length === 9 && /^[23478]/.test(digits)) return "+61" + digits;
  return trimmed;
}

export type WebhookResult = { ok: true } | { ok: false; status: number; detail: string };

/**
 * Sends a flat JSON payload to the GHL Inbound Webhook. Flat keys matter: the
 * trigger's field mapper only exposes top-level properties, so nesting anything
 * here makes it unmappable in the workflow builder.
 *
 * Never throws — failures come back as ok:false so the caller can log the lead.
 */
export async function sendToWebhook(
  webhookUrl: string,
  payload: Record<string, string>,
): Promise<WebhookResult> {
  let res: Response;
  try {
    res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      // Without a timeout a hung GHL endpoint holds the request open until the
      // platform kills it, and the visitor watches a spinner the whole time.
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch (error) {
    return { ok: false, status: 0, detail: `Network error: ${String(error)}` };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "<unreadable body>");
    return { ok: false, status: res.status, detail: detail.slice(0, 1000) };
  }

  return { ok: true };
}
