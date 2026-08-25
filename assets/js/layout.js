(function () {
  const html = document.documentElement;
  const page = html.dataset.page || "home";
  const base = html.dataset.base || "./";
  const path = (file) => base + file;
  const logoSrc = path("assets/images/logo-og.jpeg");

  const navItems = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "about", href: "about.html", label: "About Us" },
    { id: "drives", href: "drives.html", label: "Our Drives" },
    { id: "gallery", href: "gallery.html", label: "Gallery" },
    { id: "join", href: "join.html", label: "Join Us" },
  ];

  const isActive = (id) => id === page || (id === "drives" && page === "drive-detail");

  const navLinkClass = (id) =>
    isActive(id)
      ? "transition-colors text-primary font-label-bold"
      : "text-body-md text-on-surface-variant hover:text-primary transition-colors";

  const drawerLinkClass = (id) =>
    isActive(id)
      ? "flex items-center gap-sm px-md py-sm rounded-xl bg-primary-container/20 text-primary font-label-bold"
      : "flex items-center gap-sm px-md py-sm rounded-xl text-on-surface hover:bg-surface-container transition-colors";

  const desktopNav = navItems
    .map(
      (item) =>
        `<a class="${navLinkClass(item.id)}" ${isActive(item.id) ? 'aria-current="page"' : ""} href="${path(item.href)}">${item.label}</a>`
    )
    .join("");

  const drawerNav = navItems
    .map(
      (item) =>
        `<a class="${drawerLinkClass(item.id)}" ${isActive(item.id) ? 'aria-current="page"' : ""} href="${path(item.href)}">${item.label}</a>`
    )
    .join("");

  const header = `
    <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div class="h-20 max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between">
        <div class="flex items-center gap-xs">
          <button type="button" class="lg:hidden w-11 h-11 flex items-center justify-center -ml-2 text-on-surface" data-drawer-open aria-controls="mobile-drawer" aria-expanded="false" aria-label="Open menu">
            <span class="material-symbols-outlined">menu</span>
          </button>
          <a href="${path("index.html")}" class="flex items-center gap-xs">
            <span class="header-logo-mark">
              <img alt="Cleanup Gurugram logo" src="${logoSrc}" />
            </span>
            <span class="font-headline-md text-headline-md text-primary hidden sm:block">Cleanup Gurugram</span>
          </a>
        </div>
        <nav class="hidden lg:flex items-center gap-md" aria-label="Primary">
          ${desktopNav}
        </nav>
        <div class="flex items-center gap-sm">
          <a href="${path("join.html")}" class="hidden md:inline-flex bg-secondary-container text-on-secondary-container px-md py-xs rounded-full font-label-bold hover:bg-secondary hover:text-on-secondary transition-all">Volunteer Now</a>
          <!-- <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center" aria-hidden="true">
            <span class="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div> -->
        </div>
      </div>
    </header>
    <div id="mobile-drawer" class="fixed inset-0 z-[60] lg:hidden" hidden>
      <button type="button" class="absolute inset-0 bg-on-surface/40" data-drawer-close aria-label="Close menu"></button>
      <aside class="relative h-full w-[min(20rem,86vw)] bg-surface shadow-xl flex flex-col pt-safe">
        <div class="h-20 px-margin-mobile flex items-center justify-between border-b border-outline-variant">
          <span class="font-headline-md text-headline-md text-primary">Menu</span>
          <button type="button" class="w-11 h-11 flex items-center justify-center text-on-surface" data-drawer-close aria-label="Close menu">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav class="flex flex-col gap-xs p-md" aria-label="Mobile">
          ${drawerNav}
        </nav>
        <div class="mt-auto p-md pb-safe">
          <a href="${path("join.html")}" class="flex items-center justify-center bg-primary text-on-primary px-md py-sm rounded-full font-label-bold">Volunteer Now</a>
        </div>
      </aside>
    </div>
  `;

  const footer = `
    <footer class="w-full bg-surface-container-lowest border-t border-outline-variant py-lg">
      <div class="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-lg mb-lg">
          <div class="flex flex-col gap-sm">
            <a href="${path("index.html")}" class="flex items-center gap-xs">
              <span class="header-logo-mark">
                <img alt="Cleanup Gurugram logo" src="${logoSrc}" />
              </span>
              <span class="font-headline-md text-headline-md text-primary">Cleanup Gurugram</span>
            </a>
            <p class="text-body-md text-on-surface-variant">Building a cleaner, greener tomorrow through community action and environmental stewardship.</p>
          </div>
          <div class="flex flex-col gap-sm">
            <h2 class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Quick Links</h2>
            <nav class="flex flex-col gap-xs" aria-label="Footer">
              <a class="text-body-md text-on-surface-variant hover:text-primary" href="${path("about.html")}#impact">Our Impact</a>
              <a class="text-body-md text-on-surface-variant hover:text-primary" href="${path("privacy.html")}">Privacy Policy</a>
              <a class="text-body-md text-on-surface-variant hover:text-primary" href="${path("terms.html")}">Terms of Service</a>
            </nav>
          </div>
          <div class="flex flex-col gap-sm">
            <h2 class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">Connect</h2>
            <div class="flex gap-sm">
              <a class="text-on-surface-variant hover:text-primary" href="mailto:hello@cleanupgurugram.org" aria-label="Email">
                <span class="material-symbols-outlined">mail</span>
              </a>
              <a class="text-on-surface-variant hover:text-primary" href="tel:+911244000000" aria-label="Call">
                <span class="material-symbols-outlined">call</span>
              </a>
              <a class="text-on-surface-variant hover:text-primary" href="${path("about.html")}#contact" aria-label="Location">
                <span class="material-symbols-outlined">location_on</span>
              </a>
            </div>
            <p class="text-label-sm text-on-surface-variant">Sector 44, Gurugram, Haryana</p>
          </div>
        </div>
        <div class="pt-md border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-sm text-label-sm text-on-surface-variant">
          <span>© 2026 Cleanup Gurugram NGO. All rights reserved.</span>
          <div class="flex gap-md items-center">
            <span>Follow Us</span>
            <div class="flex gap-xs">
              <a class="hover:text-primary" href="https://instagram.com/cleanupgurugram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span class="material-symbols-outlined text-[20px]">photo_camera</span>
              </a>
              <a class="hover:text-primary" href="${path("about.html")}#contact" aria-label="Website">
                <span class="material-symbols-outlined text-[20px]">public</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;

  const bottomNavActive = (id) =>
    id === page ? "text-primary font-label-bold" : "text-on-surface-variant";

  const bottomNav = `
    <nav class="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] lg:hidden" aria-label="Mobile tabs">
      <div class="flex justify-around items-center h-16 px-base">
        <a class="flex flex-col items-center justify-center w-full h-full transition-colors ${bottomNavActive("home")}" ${page === "home" ? 'aria-current="page"' : ""} href="${path("index.html")}">
          <span class="material-symbols-outlined">home</span>
          <span class="text-label-sm font-label-sm">Home</span>
        </a>
        <a class="flex flex-col items-center justify-center w-full h-full transition-colors ${bottomNavActive("drives")}" ${page === "drives" || page === "drive-detail" ? 'aria-current="page"' : ""} href="${path("drives.html")}">
          <span class="material-symbols-outlined">cleaning_services</span>
          <span class="text-label-sm font-label-sm">Drives</span>
        </a>
        <div class="relative w-full h-full flex justify-center">
          <a class="absolute -top-4 w-14 h-14 bg-secondary-container rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ${page === "join" ? "text-primary" : "text-on-secondary-container"}" ${page === "join" ? 'aria-current="page"' : ""} href="${path("join.html")}" aria-label="Join">
            <span class="material-symbols-outlined text-[32px]">group_add</span>
          </a>
          <span class="absolute bottom-1 text-label-sm font-label-bold text-secondary">Join</span>
        </div>
        <a class="flex flex-col items-center justify-center w-full h-full transition-colors ${bottomNavActive("gallery")}" ${page === "gallery" ? 'aria-current="page"' : ""} href="${path("gallery.html")}">
          <span class="material-symbols-outlined">photo_library</span>
          <span class="text-label-sm font-label-sm">Gallery</span>
        </a>
        <a class="flex flex-col items-center justify-center w-full h-full transition-colors ${bottomNavActive("about")}" ${page === "about" ? 'aria-current="page"' : ""} href="${path("about.html")}#contact">
          <span class="material-symbols-outlined">contact_support</span>
          <span class="text-label-sm font-label-sm">Contact</span>
        </a>
      </div>
    </nav>
    <a class="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform" href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <span class="material-symbols-outlined text-[32px]">chat</span>
    </a>
  `;

  document.body.classList.add("has-mobile-nav");
  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer + bottomNav);

  const drawer = document.getElementById("mobile-drawer");
  const openButtons = document.querySelectorAll("[data-drawer-open]");

  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    openButtons.forEach((btn) => btn.setAttribute("aria-expanded", String(open)));
  };

  openButtons.forEach((btn) => btn.addEventListener("click", () => setDrawer(true)));
  document.querySelectorAll("[data-drawer-close]").forEach((btn) =>
    btn.addEventListener("click", () => setDrawer(false))
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDrawer(false);
  });
})();
