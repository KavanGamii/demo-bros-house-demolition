/**
 * Direct-to-Cloudinary photo upload for the quote form.
 *
 * The quote goes to GoHighLevel as flat JSON, which cannot carry a file — so the
 * browser uploads to Cloudinary first and only the resulting URLs are sent on.
 * Demo Bros already delivers its video from Cloudinary, so this needs no new
 * vendor, just an UNSIGNED upload preset created in that same account.
 *
 * Set both of these before go-live:
 *   VITE_CLOUDINARY_CLOUD_NAME=eksopivw
 *   VITE_CLOUDINARY_UPLOAD_PRESET=<unsigned preset name>
 *
 * With them unset the field still validates and the form still submits — it just
 * reports that photos could not be attached, rather than silently dropping them.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
export const MAX_FILES = 5;

export const uploadConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export type UploadResult =
  { ok: true; urls: string[] } | { ok: false; reason: "not-configured" | "failed" };

/** Rejects anything oversized or not an image, so the user hears about it here. */
export function validateFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) return `Please choose ${MAX_FILES} photos or fewer.`;
  for (const file of files) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name} is not an image. JPG, PNG or WEBP please.`;
    }
    if (file.size > MAX_FILE_BYTES) {
      return `${file.name} is over 10MB. Please pick a smaller one.`;
    }
  }
  return null;
}

export async function uploadPhotos(files: File[]): Promise<UploadResult> {
  if (files.length === 0) return { ok: true, urls: [] };
  if (!uploadConfigured) return { ok: false, reason: "not-configured" };

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const body = new FormData();
        body.append("file", file);
        body.append("upload_preset", UPLOAD_PRESET!);
        body.append("folder", "quote-form");

        const res = await fetch(endpoint, { method: "POST", body });
        if (!res.ok) throw new Error(`Cloudinary responded ${res.status}`);
        const json = (await res.json()) as { secure_url?: string };
        if (!json.secure_url) throw new Error("Cloudinary returned no URL");
        return json.secure_url;
      }),
    );
    return { ok: true, urls };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
