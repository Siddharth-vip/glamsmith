/* ==========================================================================
   GLAMSMITH - LUXURY CINEMATIC INTERACTIVE ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    /* ------------------------------------------------------------------------
     * 1. LENIS SMOOTH SCROLL ENGINE
     * ------------------------------------------------------------------------ */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    /* ------------------------------------------------------------------------
     * 2. CUSTOM LUXURY CURSOR
     * ------------------------------------------------------------------------ */
    const cursorDot = document.getElementById("cursorDot");
    const cursorRing = document.getElementById("cursorRing");

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    if (cursorDot && cursorRing) {
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Direct update for dot
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        // Smooth Lerp for ring
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll("a, button, .btn, .service-card, .tilt-card, .social-icon");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => document.body.classList.add("hovered"));
            el.addEventListener("mouseleave", () => document.body.classList.remove("hovered"));
        });
    }

    /* ------------------------------------------------------------------------
     * 3. GOLD DUST CANVAS PARTICLE SYSTEM
     * ------------------------------------------------------------------------ */
    const canvas = document.getElementById("particleCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const particleCount = Math.min(window.innerWidth < 768 ? 35 : 70, 80);

        class GoldParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2.2 + 0.6;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4 - 0.2;
                this.opacity = Math.random() * 0.7 + 0.2;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Opacity pulse
                this.opacity += Math.sin(Date.now() * this.pulseSpeed) * 0.005;

                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, Math.min(1, this.opacity))})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(212, 175, 55, 0.8)";
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new GoldParticle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* ------------------------------------------------------------------------
     * 4. GSAP HERO MASTER REVEAL TIMELINE
     * ------------------------------------------------------------------------ */
    const heroTl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 }
    });

    // 1. Navbar Fade Down
    heroTl.fromTo(".navbar", 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }
    );

    // 2. Subtitle
    heroTl.fromTo(".hero-subtitle-wrap",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.6"
    );

    // 3. Split Heading Word Reveal
    heroTl.fromTo(".hero-title .word",
        { y: 70, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.09, duration: 1.1 },
        "-=0.5"
    );

    // 4. Diamond Line Divider
    heroTl.fromTo(".d-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.6"
    );
    heroTl.fromTo(".d-sparkle",
        { scale: 0, rotate: -180 },
        { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.6"
    );

    // 5. Description & Buttons
    heroTl.fromTo("#heroDesc",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
    );

    heroTl.fromTo(".hero-actions .btn",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8 },
        "-=0.6"
    );

    // 6. Model Image Slide in from right with 3D Depth
    heroTl.fromTo("#heroModel",
        { x: 120, opacity: 0, scale: 0.95, filter: "blur(10px)" },
        { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" },
        "-=1.2"
    );

    // 7. Glassmorphism Card Reveal
    heroTl.fromTo("#glassCardFloating",
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
    );

    // 8. Stats Fade In & Counter Trigger
    heroTl.fromTo(".hero-stats",
        { y: 20, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            onComplete: () => initCounters()
        },
        "-=0.6"
    );

    /* ------------------------------------------------------------------------
     * 5. ANIMATED STATISTICS COUNTER
     * ------------------------------------------------------------------------ */
    function initCounters() {
        const statNumbers = document.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
            const targetVal = parseInt(stat.getAttribute("data-target"), 10);
            gsap.to(stat, {
                innerText: targetVal,
                duration: 2.2,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function() {
                    stat.innerHTML = Math.ceil(this.targets()[0].innerText);
                }
            });
        });
    }

    /* ------------------------------------------------------------------------
     * 6. 3D MULTI-LAYER MOUSE PARALLAX ENGINE
     * ------------------------------------------------------------------------ */
    const heroSection = document.querySelector(".hero");
    const heroModel = document.getElementById("heroModel");
    const goldGlow = document.getElementById("goldGlow");
    const glassCard = document.getElementById("glassCardFloating");
    const heroBg = document.getElementById("heroBg");

    if (heroSection) {
        window.addEventListener("mousemove", (e) => {
            const { innerWidth, innerHeight } = window;
            const mouseX = (e.clientX - innerWidth / 2);
            const mouseY = (e.clientY - innerHeight / 2);

            // Layer 1: Background Subtle Parallax
            if (heroBg) {
                gsap.to(heroBg, {
                    x: mouseX * -0.015,
                    y: mouseY * -0.015,
                    duration: 1.2,
                    ease: "power1.out"
                });
            }

            // Layer 2: Gold Glow Accent
            if (goldGlow) {
                gsap.to(goldGlow, {
                    x: mouseX * 0.025,
                    y: mouseY * 0.025,
                    duration: 1.4,
                    ease: "power1.out"
                });
            }

            // Layer 3: Model 3D Tilt & Parallax Shift
            if (heroModel) {
                gsap.to(heroModel, {
                    x: mouseX * 0.035,
                    y: mouseY * 0.025,
                    rotateY: mouseX * 0.015,
                    rotateX: -mouseY * 0.015,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            // Layer 4: Floating Glass Card Counter-Parallax
            if (glassCard) {
                gsap.to(glassCard, {
                    x: mouseX * -0.03,
                    y: mouseY * -0.03,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });
    }

    /* ------------------------------------------------------------------------
     * 7. MAGNETIC HOVER PHYSICS FOR BUTTONS
     * ------------------------------------------------------------------------ */
    const magneticBtns = document.querySelectorAll(".btn-magnetic");
    magneticBtns.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.4,
                ease: "power2.out"
            });

            const btnText = btn.querySelector(".btn-text");
            if (btnText) {
                gsap.to(btnText, {
                    x: x * 0.15,
                    y: y * 0.15,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });

        btn.addEventListener("mouseleave", () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
            });

            const btnText = btn.querySelector(".btn-text");
            if (btnText) {
                gsap.to(btnText, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)"
                });
            }
        });

        // Button Ripple Effect
        btn.addEventListener("click", function(e) {
            const circle = document.createElement("span");
            const x = e.clientX - btn.getBoundingClientRect().left;
            const y = e.clientY - btn.getBoundingClientRect().top;

            circle.classList.add("btn-ripple-active");
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            this.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        });
    });

    /* ------------------------------------------------------------------------
     * 8. SCROLLTRIGGER SECTION REVEALS & ACTIVE NAVBAR HIGHLIGHT (SCROLL SPY)
     * ------------------------------------------------------------------------ */
    // Navbar Background on Scroll
    ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
            const navbar = document.getElementById("mainNavbar");
            if (navbar) {
                if (self.direction === 1 && self.progress > 0.05) {
                    navbar.classList.add("scrolled");
                } else if (self.progress <= 0.02) {
                    navbar.classList.remove("scrolled");
                }
            }
        }
    });

    // Active Link ScrollSpy via ScrollTrigger
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((sec) => {
        ScrollTrigger.create({
            trigger: sec,
            start: "top 40%",
            end: "bottom 40%",
            onEnter: () => updateActiveNav(sec.id),
            onEnterBack: () => updateActiveNav(sec.id)
        });
    });

    function updateActiveNav(sectionId) {
        navItems.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${sectionId}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Reveal Sections Fade Up
    const revealSections = document.querySelectorAll(".section-about, .section-services, .section-pricing, .section-reviews, .section-contact");
    revealSections.forEach((sec) => {
        gsap.fromTo(sec,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    once: true
                }
            }
        );
    });

    /* ------------------------------------------------------------------------
     * 8.1 SERVICES TAB FILTERING
     * ------------------------------------------------------------------------ */
    const tabBtns = document.querySelectorAll(".tab-btn");
    const serviceBoxes = document.querySelectorAll(".service-item-box");

    tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        serviceBoxes.forEach((box) => {

            const category = box.dataset.category;

            if (filter === "all" || category === filter) {

                box.style.display = "flex";

                gsap.fromTo(
                    box,
                    {
                        opacity: 0,
                        y: 20,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    }
                );

            } else {

                gsap.to(box, {
                    opacity: 0,
                    y: -20,
                    scale: 0.95,
                    duration: 0.25,
                    ease: "power2.in",
                    onComplete: () => {
                        box.style.display = "none";
                    }
                });

            }

        });

        ScrollTrigger.refresh();

    });
});

    /* ------------------------------------------------------------------------
     * 8.2 REVIEWS STAR FILTERING
     * ------------------------------------------------------------------------ */
    const reviewFilterBtns = document.querySelectorAll(".review-filter-btn");
    const reviewCards = document.querySelectorAll(".review-card[data-rating]");

    reviewFilterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            reviewFilterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const stars = btn.getAttribute("data-stars");

            reviewCards.forEach((card) => {
                const rating = parseInt(card.getAttribute("data-rating"), 10);
                if (stars === "all" || (stars === "5" && rating === 5) || (stars === "4" && rating >= 4)) {
                    gsap.to(card, { opacity: 1, scale: 1, display: "block", duration: 0.4, ease: "power2.out" });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.9, display: "none", duration: 0.3, ease: "power2.in" });
                }
            });
        });
    });

    /* ------------------------------------------------------------------------
     * 9. VANILLA TILT INITIALIZATION
     * ------------------------------------------------------------------------ */
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 12,
            speed: 800,
            glare: true,
            "max-glare": 0.25,
            scale: 1.02
        });
    }

    /* ------------------------------------------------------------------------
     * 10. MOBILE MENU TOGGLE
     * ------------------------------------------------------------------------ */
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            mobileToggle.classList.toggle("open");
        });
    }
});
