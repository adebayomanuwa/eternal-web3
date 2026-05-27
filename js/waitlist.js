(() => {
  "use strict";

  const formSet = new Set([
    ...document.querySelectorAll("[data-eternal-waitlist]"),
    document.getElementById("waitlist-form"),
    document.getElementById("newsletterForm")
  ].filter(Boolean));

  function setBusy(form, busy) {
    form.querySelectorAll("button[type='submit']").forEach((button) => {
      button.disabled = busy;
      button.setAttribute("aria-busy", String(busy));
    });
  }

  function renderStatus(form, message, tone = "success") {
    const explicitStatus = form.querySelector("[data-eternal-status]");
    const footprintsStatus = document.getElementById("waitlist-success");
    const status = explicitStatus || footprintsStatus || document.createElement("p");

    status.textContent = message;
    status.hidden = false;
    status.dataset.tone = tone;

    if (!explicitStatus && !footprintsStatus) {
      status.setAttribute("role", "status");
      status.style.marginTop = "0.75rem";
      form.appendChild(status);
    }

    const privacy = document.getElementById("waitlist-privacy");
    if (privacy && form.id === "waitlist-form") {
      privacy.hidden = true;
    }
  }

  async function submitWaitlist(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.querySelector("input[type='email']");

    if (!emailInput || !emailInput.checkValidity()) {
      emailInput?.focus();
      return;
    }

    const segment =
      form.dataset.segment ||
      (form.id === "newsletterForm" ? "web3" : "footprints");

    setBusy(form, true);

    try {
      const result = await window.EternalSupabase?.insertWaitlist({
        email: emailInput.value.trim(),
        segment
      });

      if (result?.ok || result?.reason === "not_configured") {
        renderStatus(
          form,
          result?.ok
            ? "You're on the list."
            : "Preview saved. Add the Supabase publishable key to store signups.",
          "success"
        );
        form.reset();
        emailInput.blur();
        return;
      }

      if (result?.reason === "23505") {
        renderStatus(form, "You're already on the list.", "success");
        return;
      }

      renderStatus(form, "Signup could not be saved. Try again shortly.", "error");
    } catch {
      renderStatus(form, "Signup could not be saved. Try again shortly.", "error");
    } finally {
      setBusy(form, false);
    }
  }

  formSet.forEach((form) => {
    form.addEventListener("submit", submitWaitlist);
  });
})();
