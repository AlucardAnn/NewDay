(() => {
  const body = document.body;

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.innerHTML = '<div class="reading-progress__bar"></div>';
  body.prepend(progress);

  const progressBar = progress.querySelector(".reading-progress__bar");
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        tocLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll(".merch-grid").forEach((grid) => {
    const cards = Array.from(grid.querySelectorAll(".merch-card"));
    const labels = Array.from(
      new Set(
        cards
          .map((card) => card.querySelector(".pill.hot")?.textContent?.trim())
          .filter(Boolean)
      )
    );
    if (labels.length < 2) return;

    const toolbar = document.createElement("div");
    toolbar.className = "merch-toolbar";
    const allButton = document.createElement("button");
    allButton.className = "merch-filter is-active";
    allButton.type = "button";
    allButton.textContent = "\u5168\u90e8";
    toolbar.append(allButton);

    labels.forEach((label) => {
      const button = document.createElement("button");
      button.className = "merch-filter";
      button.type = "button";
      button.textContent = label;
      toolbar.append(button);
    });

    grid.before(toolbar);

    toolbar.addEventListener("click", (event) => {
      const button = event.target.closest(".merch-filter");
      if (!button) return;
      const filter = button.textContent.trim();
      toolbar.querySelectorAll(".merch-filter").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      cards.forEach((card) => {
        const label = card.querySelector(".pill.hot")?.textContent?.trim();
        card.classList.toggle("is-hidden", filter !== "\u5168\u90e8" && label !== filter);
      });
    });
  });

  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <button class="image-modal__close" type="button" aria-label="\u5173\u95ed\u56fe\u7247">\u00d7</button>
    <div class="image-modal__inner">
      <img alt="">
      <div class="image-modal__caption"></div>
    </div>
  `;
  body.append(modal);

  const modalImg = modal.querySelector("img");
  const modalCaption = modal.querySelector(".image-modal__caption");
  const closeModal = () => {
    modal.classList.remove("is-open");
    body.classList.remove("nd-modal-open");
    modalImg.removeAttribute("src");
  };

  document.querySelectorAll(".merch-card .media img").forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.currentSrc || img.src;
      modalImg.alt = img.alt || "";
      const title = img.closest(".merch-card")?.querySelector("h3")?.textContent?.trim();
      modalCaption.textContent = title || img.alt || "";
      modal.classList.add("is-open");
      body.classList.add("nd-modal-open");
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest(".image-modal__close")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  const topButton = document.createElement("button");
  topButton.className = "back-to-top";
  topButton.type = "button";
  topButton.setAttribute("aria-label", "\u56de\u5230\u9876\u90e8");
  topButton.textContent = "↑";
  body.append(topButton);
  topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const updateTopButton = () => {
    topButton.classList.toggle("is-visible", window.scrollY > 720);
  };
  updateTopButton();
  window.addEventListener("scroll", updateTopButton, { passive: true });
})();
