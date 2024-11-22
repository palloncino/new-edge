document.addEventListener('DOMContentLoaded', function() {
    const section3AboutUsContent = document.querySelector('.section-3-about-us-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section3AboutUsContent.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const section3AboutUs = document.querySelector('.section-3-about-us');
    observer.observe(section3AboutUs);
});