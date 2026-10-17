const CONTACT_EMAIL = "";

(function () {
  var button = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-nav]");

  function setOpen(open) {
    if (!button || !nav) {
      return;
    }
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
  }

  if (button && nav) {
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  var form = document.querySelector("[data-brief]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var brief = [
      "Brief for Chris Miller",
      "",
      "Name: " + clean(data.get("name")),
      "Company: " + clean(data.get("company")),
      "Need: " + clean(data.get("need")),
      "Timing: " + clean(data.get("timing"))
    ].join("\n");

    var out = document.querySelector("[data-brief-out]");
    var text = document.querySelector("[data-brief-text]");
    var status = document.querySelector("[data-brief-status]");
    var mail = document.querySelector("[data-mailto]");

    if (text) {
      text.textContent = brief;
    }
    if (out) {
      out.hidden = false;
    }

    var address = String(CONTACT_EMAIL || "").trim();
    if (mail) {
      if (address) {
        mail.hidden = false;
        mail.href = "mailto:" + address
          + "?subject=" + encodeURIComponent("Brief for Chris Miller")
          + "&body=" + encodeURIComponent(brief);
        mail.textContent = "Open this brief in mail";
      } else {
        mail.hidden = true;
        mail.removeAttribute("href");
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(brief).then(function () {
        if (status) {
          status.textContent = "Copied. The brief is below.";
        }
      }).catch(function () {
        if (status) {
          status.textContent = "The brief is below. Select it and copy.";
        }
      });
      return;
    }
    if (status) {
      status.textContent = "The brief is below. Select it and copy.";
    }
  });

  function clean(value) {
    return String(value || "").trim();
  }
})();
