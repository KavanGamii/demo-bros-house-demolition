import { z } from "zod";

// Visible quote-form fields. Used by the QuoteForm's client-side resolver AND
// re-validated server-side inside the submitLead server function, so the browser
// and the server agree on exactly what a valid submission looks like.
//
// Shape comes from copy deck v8, section 02 (build note 2): a SINGLE step, with
// name, email, phone, suburb, job type and start date required, and photos and
// comments optional.
export const quoteSchema = z.object({
  name: z.string().trim().nonempty("Please enter your name").max(100),
  // Required here, unlike earlier versions of this form. The deck makes it a
  // required field so a quote can actually be sent in writing.
  email: z.email("Please enter a valid email").max(255),
  phone: z.string().trim().min(8, "Please enter a valid phone number").max(20),
  suburb: z.string().trim().nonempty("Please enter your suburb or postcode").max(100),
  /**
   * MULTI-SELECT. Deck build note 2: the lead record must store every option
   * ticked, not just the first.
   *
   * Always an array, never a bare string — the MultiSelect control is driven
   * through a field controller that hands back the full selection on every
   * change, so there is no "one value or many" ambiguity to normalise here.
   */
  services: z.array(z.string()).min(1, "Please choose what needs to come out").max(20),
  /*
   * There is no `timing` field. The deck's build note 2 listed a required start
   * date, and it has been dropped since — it was a required answer that gated
   * the form on a guess most people have not made yet, and the crew asks it on
   * the follow-up call anyway.
   */
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
});

export type LeadInput = z.infer<typeof leadSchema>;
