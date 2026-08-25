(function () {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const slides = Array.from(root.querySelectorAll("[data-carousel-slide]"));
    const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;

    const goTo = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      if (track.dataset.carouselMode === "scroll") {
        slides[index].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      } else {
        slides.forEach((slide, i) => {
          slide.classList.toggle("is-active", i === index);
        });
      }
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("bg-primary", active);
        dot.classList.toggle("bg-outline-variant", !active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      timer = window.setInterval(() => goTo(index + 1), 7000);
    };

    const stopAutoplay = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    prev?.addEventListener("click", () => {
      goTo(index - 1);
      startAutoplay();
    });
    next?.addEventListener("click", () => {
      goTo(index + 1);
      startAutoplay();
    });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        goTo(i);
        startAutoplay();
      })
    );

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);

    goTo(0);
    startAutoplay();
  });

  document.querySelectorAll("[data-scroll-row]").forEach((root) => {
    const track = root.querySelector("[data-scroll-track]");
    const prev = root.querySelector("[data-scroll-prev]");
    const next = root.querySelector("[data-scroll-next]");
    if (!track) return;
    const amount = () => Math.min(track.clientWidth * 0.8, 420);
    prev?.addEventListener("click", () => track.scrollBy({ left: -amount(), behavior: "smooth" }));
    next?.addEventListener("click", () => track.scrollBy({ left: amount(), behavior: "smooth" }));
  });

  const filterButtons = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll("[data-gallery-item]");
  const extraItems = document.querySelectorAll("[data-gallery-extra]");
  const loadMore = document.querySelector("[data-gallery-more]");
  let extrasLoaded = false;

  const applyGalleryFilter = (filter) => {
    galleryItems.forEach((item) => {
      const category = item.dataset.galleryItem;
      const match = filter === "all" || category === filter;
      const isExtra = item.hasAttribute("data-gallery-extra");
      item.classList.toggle("is-hidden", !match || (isExtra && !extrasLoaded));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.galleryFilter;
      filterButtons.forEach((other) => {
        const active = other === button;
        other.classList.toggle("bg-primary", active);
        other.classList.toggle("text-on-primary", active);
        other.classList.toggle("bg-surface-container", !active);
        other.classList.toggle("text-on-surface", !active);
        other.setAttribute("aria-pressed", String(active));
      });
      applyGalleryFilter(filter);
    });
  });

  loadMore?.addEventListener("click", () => {
    extrasLoaded = true;
    extraItems.forEach((item) => item.classList.remove("is-hidden"));
    const active = document.querySelector('[data-gallery-filter][aria-pressed="true"]');
    applyGalleryFilter(active?.dataset.galleryFilter || "all");
    loadMore.hidden = true;
  });

  document.querySelectorAll(".faq-item").forEach((item) => {
    const trigger = item.querySelector("button");
    const panel = item.querySelector(".faq-panel");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-item").forEach((other) => {
        const otherTrigger = other.querySelector("button");
        const otherPanel = other.querySelector(".faq-panel");
        otherTrigger?.setAttribute("aria-expanded", "false");
        other.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.hidden = true;
      });
      if (!expanded) {
        trigger.setAttribute("aria-expanded", "true");
        item.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });
})();
