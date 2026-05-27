(() => {
  "use strict";

  const leadForms = document.querySelectorAll("[data-eternal-lead]");

  async function submitLead(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const status = form.querySelector("[data-eternal-status]");

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      interest_type: String(formData.get("interest_type") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source_page: form.dataset.sourcePage || "hub"
    };

    if (!payload.email) {
      form.querySelector("input[type='email']")?.focus();
      return;
    }

    const result = await window.EternalSupabase?.insertLead(payload);

    if (status) {
      status.hidden = false;
      status.textContent = result?.ok
        ? "Lead received."
        : "Preview saved. Add the Supabase publishable key to store leads.";
    }

    form.reset();
  }

  leadForms.forEach((form) => {
    form.addEventListener("submit", submitLead);
  });
})();
