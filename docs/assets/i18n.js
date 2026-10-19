// Prayer Mode legal/support — language + direction switch.
// Both English and Arabic content live in the page; this toggles which is shown,
// sets <html lang/dir>, remembers the choice, and detects the browser language first.
(function () {
  var KEY = "pm-lang";
  var root = document.documentElement;

  function apply(lang) {
    lang = lang === "ar" ? "ar" : "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    var btns = document.querySelectorAll(".lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", String(btns[i].dataset.lang === lang));
    }
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || ((navigator.language || "en").slice(0, 2).toLowerCase() === "ar" ? "ar" : "en");
  apply(initial);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".lang button") : null;
    if (btn && btn.dataset.lang) apply(btn.dataset.lang);
  });
})();
