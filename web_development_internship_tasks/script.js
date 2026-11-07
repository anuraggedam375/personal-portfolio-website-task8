const form = document.querySelector("#contactForm");
if (form) {
  const fields = {
    name: { error: "nameError", message: "Please enter at least 2 characters.", valid: v => v.trim().length >= 2 },
    email: { error: "emailError", message: "Enter a valid email address.", valid: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    phone: { error: "phoneError", message: "Enter a valid phone number (at least 7 characters).", valid: v => /^[0-9+() -]{7,}$/.test(v.trim()) },
    message: { error: "messageError", message: "Please enter at least 10 characters.", valid: v => v.trim().length >= 10 }
  };
  form.addEventListener("submit", event => {
    event.preventDefault();
    let isValid = true;
    Object.entries(fields).forEach(([id, rule]) => {
      const input = document.getElementById(id);
      const valid = rule.valid(input.value);
      document.getElementById(rule.error).textContent = valid ? "" : rule.message;
      input.setAttribute("aria-invalid", String(!valid));
      if (!valid) isValid = false;
    });
    const status = document.getElementById("formStatus");
    if (isValid) {
      status.textContent = "Thanks! Your form passed validation. (Demo only — nothing was sent.)";
      form.reset();
    } else {
      status.textContent = "Please fix the highlighted fields and try again.";
    }
  });
  Object.keys(fields).forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
      const rule = fields[id], input = document.getElementById(id);
      if (rule.valid(input.value)) document.getElementById(rule.error).textContent = "";
    });
  });
}