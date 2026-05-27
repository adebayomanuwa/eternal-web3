(() => {
  "use strict";

  /*
    Static HTML caveat from eternal-web3-supabase-architecture.md:
    only the publishable key may live in browser code. Never place
    ETERNAL_SUPABASE_SECRET_KEY in this file or any client HTML.
  */
  const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xxxxx";

  const hasUsableConfig =
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR-PROJECT") &&
    SUPABASE_PUBLISHABLE_KEY.startsWith("sb_publishable_") &&
    !SUPABASE_PUBLISHABLE_KEY.includes("xxxxx");

  const client =
    hasUsableConfig && window.supabase
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
      : null;

  async function insertWaitlist({ email, segment }) {
    if (!client) {
      return { ok: false, reason: "not_configured" };
    }

    const { error } = await client
      .from("waitlist")
      .insert({ email, segment });

    if (error) {
      return { ok: false, reason: error.code || "insert_failed", error };
    }

    return { ok: true };
  }

  async function insertLead({ name, email, interest_type, message, source_page }) {
    if (!client) {
      return { ok: false, reason: "not_configured" };
    }

    const { error } = await client
      .from("marketplace_leads")
      .insert({ name, email, interest_type, message, source_page });

    if (error) {
      return { ok: false, reason: error.code || "insert_failed", error };
    }

    return { ok: true };
  }

  window.EternalSupabase = {
    client,
    isConfigured: Boolean(client),
    insertWaitlist,
    insertLead
  };
})();
