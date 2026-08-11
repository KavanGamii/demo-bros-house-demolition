import { z } from "zod";

// Visible quote-form fields. Used by the QuoteForm's client-side resolver AND
// re-validated server-side inside the submitLead server function, so the browser
// and the server agree on exactly what a valid submission looks like.
//
// Shape comes from Campaign 1 deck, section 02: a SINGLE step, with name, email,
// phone, property address, what's on the block, house size, asbestos and start
// date required, and photos and comments optional.
export const quoteSchema = z.object({
  name: z.string().trim().nonempty("Please enter your name").max(100),
  // Required here, so a quote can actually be sent in writing.
  email: z.email("Please enter a valid email").max(255),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  // Address of the property (or suburb). A five-figure demolition quote needs the
  // block, not just a postcode.
  address: z.string().trim().nonempty("Please enter the property address or suburb").max(200),
  /**
   * "What's on the block?" — MULTI-SELECT. The lead record must store every
   * option ticked, not just the first. Driven through a field controller that
   * hands back the full selection on every change.
   */
  blockItems: z.array(z.string()).min(1, "Please choose what's on the block").max(20),
  /** "Roughly how big is the house?" — single select, plain language. */
  houseSize: z.string().nonempty("Please choose roughly how big the house is"),
  /** "Do you know if there's asbestos?" — single select. */
  asbestos: z.string().nonempty("Please choose an asbestos option"),
  /** "When are you hoping to start?" — single select. */
  timing: z.string().nonempty("Please choose when you're hoping to start"),
  comments: z.string().trim().max(2000).optional(),
});

export type QuoteValues = z.infer<typeof quoteSchema>;

// Full payload the browser sends to the server: the visible fields plus a spam
// honeypot and marketing attribution captured from the page/URL. Every extra
// field is optional so older cached clients never fail validation.
export const leadSchema = quoteSchema.extend({
  // Honeypot — hidden from real users; only bots fill it. Handled server-side.
  website: z.string().max(500).optional().default(""),
  page: z.string().max(300).optional().default(""),
  pageUrl: z.string().max(1000).optional().default(""),
  referrer: z.string().max(1000).optional().default(""),
  tracking: z.record(z.string(), z.string()).optional().default({}),
  /* Cloudinary URLs for any photos the customer attached. */
  photoUrls: z.array(z.string().max(500)).max(5).optional().default([]),
  photoNote: z.string().max(300).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;
