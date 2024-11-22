document.addEventListener('DOMContentLoaded', function() {
    const section2AboutUsContent = document.querySelector('.section-2-about-us-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section2AboutUsContent.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const section2AboutUs = document.querySelector('.section-2-about-us');
    observer.observe(section2AboutUs);
});