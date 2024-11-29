document.addEventListener("DOMContentLoaded", function() {
    // Get the body class list
    const bodyClassList = document.body.classList;

    // Define a mapping between page IDs and their corresponding link hrefs
    const pageLinkMap = {
        'page-id-11': '/',
        'page-id-37': '/a-proposito-di-noi.html',
        'page-id-40': '/cosa-facciamo.html',
        'page-id-44': '/il-gruppo.html'
    };

    // Get all header navigation links
    const headerLinks = document.querySelectorAll('.header-navigation-link');

    // Check if we are on the homepage (front-page for development)
    const currentPath = window.location.pathname;

    if (currentPath === '/' || currentPath === '/front-page.html') {
        // If on homepage, make all links active
        headerLinks.forEach(link => {
            link.classList.add('active');
        });
    } else {
        // Iterate over each class in the body class list
        bodyClassList.forEach(bodyClass => {
            // Check if the body class is in the pageLinkMap
            if (pageLinkMap[bodyClass]) {
                // Find the corresponding link and add the 'active' class
                headerLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    if (linkHref === pageLinkMap[bodyClass]) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});