// Adds a "Copy" button to each command block. The page works without it.
(function () {
  if (!navigator.clipboard) return;
  document.querySelectorAll("pre[data-copy]").forEach(function (pre) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy command");
    button.addEventListener("click", function () {
      var code = pre.querySelector("code");
      navigator.clipboard.writeText((code || pre).innerText.trim()).then(function () {
        button.textContent = "Copied";
        button.classList.add("done");
        setTimeout(function () {
          button.textContent = "Copy";
          button.classList.remove("done");
        }, 1600);
      });
    });
    pre.appendChild(button);
  });
})();
