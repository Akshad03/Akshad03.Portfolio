document.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");
	const navToggle = document.querySelector(".nav-toggle");
	const navLinks = document.querySelectorAll(".nav-menu a");

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
			link.addEventListener("click", () => {
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

	const animatedItems = document.querySelectorAll(
		".section-title, .hero-text, .hero-image, .about-text, .experience-card, .service-card, .project-card, .skills, .skill-group"
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