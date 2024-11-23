document.addEventListener('DOMContentLoaded', function () {
    const section2 = document.querySelector('.section-2-homepage');
    const video = document.getElementById('section3-video');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section2.classList.add('active');
                observer.unobserve(section2);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(section2);

    // Handle video playback to pause at the end
    if (video) {
        video.addEventListener('ended', function () {
            this.pause();
            // Optionally, set the currentTime to the end to ensure the final frame is displayed
            this.currentTime = this.duration;
        });
    }
});