document.addEventListener("DOMContentLoaded", function() {
    // Get the body class list
    const bodyClassList = document.body.classList;
    console.log("Body classes:", Array.from(bodyClassList));

    // Define a mapping between page IDs and their corresponding link hrefs
    const pageLinkMap = {
        'page-id-11': '/',
        'page-id-37': '/a-proposito-di-noi.html',
        'page-id-40': '/cosa-facciamo.html'
    };
    console.log("Page link map:", pageLinkMap);

    // Get all header navigation links
    const headerLinks = document.querySelectorAll('.header-navigation-link');
    console.log("Header links found:", headerLinks.length);
    headerLinks.forEach(link => {
        console.log("Link href:", link.getAttribute('href'));
    });

    // Check if we are on the homepage (front-page for development)
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath);

    if (currentPath === '/' || currentPath === '/front-page.html') {
        console.log("Homepage detected - activating all links");
        // If on homepage, make all links active
        headerLinks.forEach(link => {
            link.classList.add('active');
        });
    } else {
        console.log("Not on homepage - checking body classes");
        // Iterate over each class in the body class list
        bodyClassList.forEach(bodyClass => {
            console.log("Checking body class:", bodyClass);
            // Check if the body class is in the pageLinkMap
            if (pageLinkMap[bodyClass]) {
                console.log("Found matching page link for class:", bodyClass, "->", pageLinkMap[bodyClass]);
                // Find the corresponding link and add the 'active' class
                headerLinks.forEach(link => {
                    const linkHref = link.getAttribute('href');
                    console.log("Comparing with link href:", linkHref);
                    if (linkHref === pageLinkMap[bodyClass]) {
                        console.log("Match found! Adding active class to:", linkHref);
                        link.classList.add('active');
                    }
                });
            }
        });
    }
});