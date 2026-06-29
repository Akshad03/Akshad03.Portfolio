document.addEventListener("DOMContentLoaded", () => {
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
			navToggle.innerHTML = isOpen
				? '<i class="fa-solid fa-xmark"></i>'
				: '<i class="fa-solid fa-bars"></i>';
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
						const headerOffset = header ? header.offsetHeight + 16 : 86;
						const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;

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
		window.addEventListener("scroll", updateActiveSection, { passive: true });
	}

	const animatedItems = document.querySelectorAll(
		".section-title, .hero-text, .hero-image, .about-text, .experience-card, .service-card, .project-card, .skills, .skill-group, .contact-info, .contact-form"
	);

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.18,
		rootMargin: "0px 0px -60px 0px"
	});

	animatedItems.forEach((item) => {
		item.classList.add("reveal");

		if (item.classList.contains("skill-group")) {
			const skillGroups = Array.from(document.querySelectorAll(".skill-group"));
			const index = skillGroups.indexOf(item);
			item.style.transitionDelay = `${index * 120}ms`;
		}

		observer.observe(item);
	});
});
