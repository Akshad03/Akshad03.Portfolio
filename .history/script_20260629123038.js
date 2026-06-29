document.addEventListener("DOMContentLoaded", () => {
	const animatedItems = document.querySelectorAll(
		".section-title, .hero-text, .hero-image, .about-text, .service-card, .project-card, .skills, .skill-group"
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
		observer.observe(item);
	});
});