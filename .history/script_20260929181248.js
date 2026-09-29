document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const navbar = document.querySelector(".navbar");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const pageSections = Array.from(document.querySelectorAll("section[id]"));
    const header = document.querySelector("header");

    const setActiveNavLink = (targetId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${targetId}`;
            link.classList.toggle("active", isActive);
        });
    };

    if (navbar && navToggle) {
        const setNavState = (isOpen) => {
            navbar.classList.toggle("nav-open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        };

        navToggle.addEventListener("click", () => {
            setNavState(!navbar.classList.contains("nav-open"));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href")?.replace("#", "");

                if (targetId) {
                    const targetSection = document.getElementById(targetId);
                    setActiveNavLink(targetId);

                    if (targetSection) {
                        event.preventDefault();

                        const headerOffset = header
                            ? header.offsetHeight + 16
                            : 86;

                        const targetPosition =
                            targetSection.getBoundingClientRect().top +
                            window.scrollY -
                            headerOffset;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: "smooth"
                        });
                    }
                }

                if (window.innerWidth <= 768) {
                    setNavState(false);
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                setNavState(false);
            }
        });
    }

    /* =====================================================
       ACTIVE SECTION ON SCROLL
    ===================================================== */

    if (pageSections.length && navLinks.length) {
        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + 140;
            let currentSectionId = pageSections[0].id;

            pageSections.forEach((section) => {
                if (scrollPosition >= section.offsetTop) {
                    currentSectionId = section.id;
                }
            });

            setActiveNavLink(currentSectionId);
        };

        updateActiveSection();

        window.addEventListener("scroll", updateActiveSection, {
            passive: true
        });
    }

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const animatedItems = document.querySelectorAll(
        ".section-title, " +
        ".hero-text, " +
        ".hero-image, " +
        ".about-text, " +
        ".about-info > div, " +
        ".experience-card, " +
        ".service-card, " +
        ".project-card:not(.projects-track .project-card), " +
        ".skills, " +
        ".skill-group, " +
        ".contact-info, " +
        ".contact-form, " +
        ".contact-item"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    const staggeredCardGroups = [
        ".about-info > div",
        ".services-grid > .service-card",
        ".projects-track > .project-card",
        ".skills-grid > .skill-group",
        ".contact-list > .contact-item"
    ];

    staggeredCardGroups.forEach((selector) => {
        document.querySelectorAll(selector).forEach((item, index) => {
            item.style.transitionDelay = `${index * 90}ms`;
        });
    });

    /* =====================================================
       PROJECT CAROUSEL
    ===================================================== */

    const projectsTrack = document.querySelector(".projects-track");

    const projectCards = projectsTrack
        ? Array.from(
            projectsTrack.querySelectorAll(".project-card")
        )
        : [];

    const previousProjectButton = document.querySelector(
        ".carousel-control--prev"
    );

    const nextProjectButton = document.querySelector(
        ".carousel-control--next"
    );

    let projectIndex = 0;

    if (
        projectsTrack &&
        projectCards.length &&
        previousProjectButton &&
        nextProjectButton
    ) {
        const getVisibleProjectCount = () => {
            return window.innerWidth <= 768 ? 1 : 2;
        };

        const getCardStep = () => {
            const firstCard = projectCards[0];

            if (!firstCard) {
                return 0;
            }

            const cardWidth =
                firstCard.getBoundingClientRect().width;

            const trackStyles =
                window.getComputedStyle(projectsTrack);

            const gap =
                parseFloat(trackStyles.columnGap) ||
                parseFloat(trackStyles.gap) ||
                24;

            return cardWidth + gap;
        };

        const updateProjectCarousel = () => {
            const visibleProjectCount =
                getVisibleProjectCount();

            const maxProjectIndex = Math.max(
                0,
                projectCards.length - visibleProjectCount
            );

            projectIndex = Math.max(
                0,
                Math.min(
                    projectIndex,
                    maxProjectIndex
                )
            );

            const cardStep = getCardStep();

            const translateAmount =
                projectIndex * cardStep;

            projectsTrack.style.transform =
                `translate3d(-${translateAmount}px, 0, 0)`;

            previousProjectButton.disabled =
                projectIndex === 0;

            nextProjectButton.disabled =
                projectIndex >= maxProjectIndex;
        };

        previousProjectButton.addEventListener("click", () => {
            projectIndex -= getVisibleProjectCount();
            updateProjectCarousel();
        });

        nextProjectButton.addEventListener("click", () => {
            projectIndex += getVisibleProjectCount();
            updateProjectCarousel();
        });

        let resizeTimer;

        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                updateProjectCarousel();
            }, 100);
        });

        updateProjectCarousel();
    }

    /* =====================================================
       START REVEAL OBSERVER
    ===================================================== */

    animatedItems.forEach((item) => {
        item.classList.add("reveal");
        observer.observe(item);
    });

});