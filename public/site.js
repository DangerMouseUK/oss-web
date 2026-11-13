// Progressive enhancement only. The page reads and works without any of this:
// copy buttons on command blocks, the current section marked in the header,
// sections easing in as they are reached, and screenshots opening full size.
(function () {
  "use strict";

  var doc = document;
  var hasObserver = "IntersectionObserver" in window;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- copy buttons ----
  if (navigator.clipboard) {
    doc.querySelectorAll(".term[data-copy]").forEach(function (term) {
      var bar = term.querySelector(".term-bar");
      var code = term.querySelector("code");
      if (!bar || !code) return;

      var button = doc.createElement("button");
      var reset;
      button.type = "button";
      button.className = "copy";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy command");
      button.addEventListener("click", function () {
        navigator.clipboard.writeText(code.innerText.trim()).then(function () {
          button.textContent = "Copied";
          button.classList.add("done");
          clearTimeout(reset);
          reset = setTimeout(function () {
            button.textContent = "Copy";
            button.classList.remove("done");
          }, 1600);
        });
      });
      bar.appendChild(button);
    });
  }

  // ---- mark the section being read in the header ----
  var navList = doc.querySelector(".top nav ul");
  var links = {};
  doc.querySelectorAll('.top nav a[href^="#"]').forEach(function (link) {
    links[link.hash.slice(1)] = link;
  });
  var sections = Object.keys(links)
    .map(function (id) { return doc.getElementById(id); })
    .filter(Boolean);

  if (hasObserver && navList && sections.length) {
    var current = null;
    var mark = function (id) {
      if (id === current) return;
      if (current) links[current].removeAttribute("aria-current");
      current = id;
      if (!id) return;
      var link = links[id];
      link.setAttribute("aria-current", "true");
      // on a narrow screen the list scrolls sideways: keep the marked link in view
      if (navList.scrollWidth > navList.clientWidth) {
        navList.scrollTo({
          left: link.offsetLeft - navList.offsetLeft - 16,
          behavior: reducedMotion ? "auto" : "smooth"
        });
      }
    };
    var spy = new IntersectionObserver(function (entries) {
      var entered = null;
      var left = false;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entered = entry.target.id;
        else if (entry.target.id === current) left = true;
      });
      if (entered) mark(entered);
      else if (left) mark(null);
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { spy.observe(section); });
  }

  // ---- ease blocks in as they are reached ----
  // Only blocks that start below the fold are ever hidden, so nothing flashes on load.
  if (hasObserver && !reducedMotion) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("pre-reveal");
        reveal.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    doc.querySelectorAll("[data-reveal]").forEach(function (block) {
      if (block.getBoundingClientRect().top < window.innerHeight) return;
      block.classList.add("pre-reveal");
      // add the transition a frame later, so hiding the block is not itself animated
      requestAnimationFrame(function () { block.classList.add("reveal"); });
      reveal.observe(block);
    });
  }

  // ---- screenshots open full size ----
  var zooms = doc.querySelectorAll("a.zoom");
  if (zooms.length && typeof HTMLDialogElement === "function") {
    var dialog = doc.createElement("dialog");
    var close = doc.createElement("button");
    var full = doc.createElement("img");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Screenshot, full size");
    close.type = "button";
    close.textContent = "Close";
    dialog.appendChild(full);
    dialog.appendChild(close);
    dialog.addEventListener("click", function () { dialog.close(); });
    doc.body.appendChild(dialog);

    zooms.forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        var thumb = link.querySelector("img");
        full.src = link.href;
        full.alt = thumb ? thumb.alt : "";
        dialog.showModal();
      });
    });
  }
})();
