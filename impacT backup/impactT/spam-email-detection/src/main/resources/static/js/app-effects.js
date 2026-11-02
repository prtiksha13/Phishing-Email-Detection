(() => {
    const revealTargets = [
        ".page-card",
        ".feature",
        ".card",
        ".stat-card",
        ".cyber-card",
        ".result-spam",
        ".result-safe",
        ".form-container",
        ".detail-container",
        ".history-container",
        ".register-card",
        ".login-card",
        ".error-card",
        ".admin-content > .row"
    ].join(",");
    const surfaceTargets = [
        ".page-card",
        ".feature",
        ".card",
        ".stat-card",
        ".cyber-card",
        ".register-card",
        ".login-card",
        ".result-spam",
        ".result-safe"
    ].join(",");
    const pageEffects = {
        landing: ["lift", "tilt", "glow", "sweep", "float"],
        auth: ["glow", "lift"],
        dashboard: ["float", "glow", "tilt", "sweep"],
        analysis: ["sweep", "glow", "lift"],
        detail: ["glow", "sweep", "lift"],
        history: ["sweep", "lift", "glow"],
        profile: ["tilt", "glow", "lift"],
        feedback: ["float", "sweep", "glow"],
        error: ["glow", "lift"],
        admin: ["sweep", "glow", "tilt", "lift"]
    };
    const revealEffects = {
        landing: ["rise", "left", "depth"],
        auth: ["depth", "rise"],
        dashboard: ["depth", "rise", "left"],
        analysis: ["left", "depth", "rise"],
        detail: ["depth", "left", "rise"],
        history: ["left", "rise", "depth"],
        profile: ["depth", "rise"],
        feedback: ["rise", "depth", "left"],
        error: ["depth", "rise"],
        admin: ["left", "depth", "rise"]
    };

    const applyPageIdentity = () => {
        const path = window.location.pathname;
        let page = "landing";

        if (path.startsWith("/analysis/")) {
            page = "detail";
        } else if (path === "/403") {
            page = "error";
        } else if (path.startsWith("/admin")) {
            page = "admin";
        } else if (path.includes("dashboard")) {
            page = "dashboard";
        } else if (path === "/analyze") {
            page = "analysis";
        } else if (path.includes("history")) {
            page = "history";
        } else if (path.includes("profile")) {
            page = "profile";
        } else if (path.includes("feedback")) {
            page = "feedback";
        } else if (path.includes("register") || path.includes("login")) {
            page = "auth";
        }

        document.body.dataset.page = page;

        document.querySelectorAll(".navbar .nav-link, .sidebar-link").forEach((link) => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath === path) {
                link.classList.add("is-current");
                link.setAttribute("aria-current", "page");
            }
        });

        return page;
    };

    const initializeRevealEffects = (page) => {
        const elements = [...document.querySelectorAll(revealTargets)];
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const canObserve = "IntersectionObserver" in window;
        const variants = revealEffects[page] || revealEffects.landing;

        elements.forEach((element, index) => {
            element.classList.add("reveal-ready");
            element.dataset.reveal = variants[index % variants.length];
            element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
        });

        if (reducedMotion || !canObserve) {
            elements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        });

        elements.forEach((element) => observer.observe(element));
    };

    const initializeSurfaceEffects = (page) => {
        const finePointer = window.matchMedia("(pointer: fine)").matches;
        const variants = pageEffects[page] || pageEffects.landing;

        document.querySelectorAll(surfaceTargets).forEach((element, index) => {
            element.classList.add("spotlight-surface");
            element.dataset.effect = variants[index % variants.length];

            if (!finePointer) {
                return;
            }

            let frameRequested = false;
            let pointerX = 50;
            let pointerY = 50;
            let tiltX = 0;
            let tiltY = 0;

            element.addEventListener("pointermove", (event) => {
                const bounds = element.getBoundingClientRect();
                if (!bounds.width || !bounds.height) {
                    return;
                }
                pointerX = ((event.clientX - bounds.left) / bounds.width) * 100;
                pointerY = ((event.clientY - bounds.top) / bounds.height) * 100;
                tiltX = ((pointerY - 50) / 50) * -2.2;
                tiltY = ((pointerX - 50) / 50) * 2.2;

                if (frameRequested) {
                    return;
                }

                frameRequested = true;
                window.requestAnimationFrame(() => {
                    element.style.setProperty("--spot-x", `${pointerX}%`);
                    element.style.setProperty("--spot-y", `${pointerY}%`);
                    element.style.setProperty("--tilt-x", `${tiltX}deg`);
                    element.style.setProperty("--tilt-y", `${tiltY}deg`);
                    frameRequested = false;
                });
            }, { passive: true });

            element.addEventListener("pointerleave", () => {
                element.style.setProperty("--tilt-x", "0deg");
                element.style.setProperty("--tilt-y", "0deg");
            }, { passive: true });
        });
    };

    const initializeScrollControls = () => {
        const progress = document.createElement("div");
        progress.className = "site-scroll-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.append(progress);

        const backToTop = document.createElement("button");
        backToTop.className = "site-back-to-top";
        backToTop.type = "button";
        backToTop.setAttribute("aria-label", "Back to top");
        backToTop.setAttribute("aria-hidden", "true");
        backToTop.tabIndex = -1;
        backToTop.title = "Back to top";
        backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
        document.body.append(backToTop);

        let frameRequested = false;
        const updateScrollControls = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = scrollable > 0 ? window.scrollY / scrollable : 0;
            const isVisible = window.scrollY > 420;
            progress.style.setProperty("--scroll-progress", `${Math.min(percentage, 1)}`);
            backToTop.classList.toggle("is-visible", isVisible);
            backToTop.setAttribute("aria-hidden", String(!isVisible));
            backToTop.tabIndex = isVisible ? 0 : -1;
            frameRequested = false;
        };
        const scheduleUpdate = () => {
            if (!frameRequested) {
                frameRequested = true;
                window.requestAnimationFrame(updateScrollControls);
            }
        };

        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate, { passive: true });
        backToTop.addEventListener("click", () => {
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
        });
        updateScrollControls();
    };

    const initialize = () => {
        const page = applyPageIdentity();
        initializeRevealEffects(page);
        initializeSurfaceEffects(page);
        document.querySelectorAll(".table tbody tr").forEach((row, index) => {
            row.classList.add("row-reveal");
            row.style.setProperty("--row-delay", `${Math.min(index, 10) * 45}ms`);
        });
        document.querySelectorAll(".admin-sidebar .sidebar-item").forEach((item, index) => {
            item.style.setProperty("--item-index", index);
        });
        initializeScrollControls();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();
