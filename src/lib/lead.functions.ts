import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./quote-schema";
import { blockItemOptions, houseSizeOptions, asbestosOptions, timingOptions } from "./site-data";
import { normaliseAuPhone, sendToWebhook } from "./ghl";

function labelFor(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function splitName(full: string): { first_name: string; last_name: string } {
  const parts = full.trim().split(/\s+/);
  const first_name = parts.shift() ?? "";
  return { first_name, last_name: parts.join(" ") };
}

// Receives a validated quote submission and forwards it to the GoHighLevel
// inbound webhook. Runs only on the server, so GHL_WEBHOOK_URL never reaches the
// browser and the cross-origin POST to GHL isn't blocked by CORS.
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    // Honeypot: a real person never sees or fills `website`. If it's filled,
    // it's a bot — pretend success and quietly drop it.
    if (data.website && data.website.trim() !== "") {
      return { ok: true as const };
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      // Backstop: log the full lead so it's recoverable from the platform logs
      // even before the webhook URL is configured.
      console.error(
        "[submitLead] GHL_WEBHOOK_URL is not set — lead NOT forwarded:",
        JSON.stringify(data),
      );
      throw new Error("Lead destination is not configured.");
    }

    const { first_name, last_name } = splitName(data.name);
    const payload: Record<string, string> = {
      first_name,
      last_name,
      full_name: data.name,
      email: data.email,
      phone: normaliseAuPhone(data.phone),
      // Address of the property (or suburb). Kept under `suburb` too so the
      // existing GHL workflow field mapping still resolves.
      address: data.address,
      suburb: data.address,
      // "What's on the block?" is multi-select, so EVERY ticked option has to
      // survive the trip. `service` stays the human-readable joined list because
      // that is the field the existing GHL workflow already maps; the slugs and
      // the count ride alongside it for filtering and reporting.
      service: data.blockItems.map((s) => labelFor(blockItemOptions, s)).join(", "),
      service_slugs: data.blockItems.join(","),
      service_count: String(data.blockItems.length),
      // House size and asbestos — both label and slug for filtering/reporting.
      house_size: labelFor(houseSizeOptions, data.houseSize),
      house_size_slug: data.houseSize,
      asbestos: labelFor(asbestosOptions, data.asbestos),
      asbestos_slug: data.asbestos,
      timing: labelFor(timingOptions, data.timing),
      timing_slug: data.timing,
      details: data.comments ?? "",
      source: "Website Landing Page Quote Form",
      page: data.page || "",
      page_url: data.pageUrl || "",
      referrer: data.referrer || "",
      submitted_at: new Date().toISOString(),
      // Flat keys only: the GHL trigger mapper cannot read nested values.
      photo_count: String(data.photoUrls?.length ?? 0),
      photo_urls: (data.photoUrls ?? []).join(" "),
      photo_note: data.photoNote ?? "",
      // UTM / click-id attribution (utm_source, gclid, fbclid, ...) if present.
      ...data.tracking,
    };

    const result = await sendToWebhook(webhookUrl, payload);
    if (!result.ok) {
      console.error(
        `[submitLead] GHL webhook failed (${result.status}): ${result.detail} — Lead:`,
        JSON.stringify(payload),
      );
      throw new Error("Failed to send lead.");
    }

    return { ok: true as const };
  });
