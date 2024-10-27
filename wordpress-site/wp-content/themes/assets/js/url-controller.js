document.addEventListener("DOMContentLoaded", () => {
    const isIntroSeen = localStorage.getItem("introSeen");

    if (window.location.pathname === '/intro') {
        // Redirect to / if introSeen is set
        if (isIntroSeen) {
            window.location.href = "/";
        }
    } else if (window.location.pathname === '/') {
        // Redirect to /intro if introSeen is not set
        if (!isIntroSeen) {
            window.location.href = "/intro";
        }
    }
});
