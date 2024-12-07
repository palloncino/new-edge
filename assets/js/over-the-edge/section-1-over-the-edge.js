document.addEventListener('DOMContentLoaded', function () {

    // Constants for positioning
    const PARAGRAPH_TOP = '370px';
    const PARAGRAPH_HIDDEN = '2000px';
    const PARAGRAPH_LEFT = '470px';

    // Object to store the initial styles
    const initialStyles = {};

    // Total number of links
    const TOTAL_LINKS = 5;

    // Common elements
    const mainTitle = document.querySelector('#section-1-over-the-edge__section-1-main-title');
    const backBtn = document.querySelector('#section-1-over-the-edge__back-btn');

    // Links data structure
    const links = [];

    for (let i = 1; i <= TOTAL_LINKS; i++) {
        links.push({
            shape: document.querySelector(`#section-1-over-the-edge__link-${i}-shape`),
            plus: document.querySelector(`#section-1-over-the-edge__link-${i}-plus`),
            title: document.querySelector(`#section-1-over-the-edge__link-${i}-title`),
            description: document.querySelector(`#section-1-over-the-edge__link-${i}-description`)
        });
    }

    // Function to capture initial styles
    function captureInitialStyles() {
        // Capture computed styles for back button
        captureElementStyles('section-1-over-the-edge__back-btn', backBtn);

        // Capture computed styles for each link
        links.forEach((link, index) => {
            const linkId = `section-1-over-the-edge__link-${index + 1}`;
            captureElementStyles(`${linkId}-shape`, link.shape);
            captureElementStyles(`${linkId}-plus`, link.plus);
            captureElementStyles(`${linkId}-title`, link.title);
            captureElementStyles(`${linkId}-description`, link.description);
        });
    }

    // Helper function to capture styles of a single element
    function captureElementStyles(id, element) {
        if (element) {
            const computedStyles = window.getComputedStyle(element);
            initialStyles[id] = {};
            [
                'position',
                'top',
                'left',
                'font-size',
                'line-height',
                'width',
                'height',
                'visibility',
                'opacity',
                'background-position',
                'transition',
                'font-weight',
                'transform'
            ].forEach((property) => {
                initialStyles[id][property] = computedStyles.getPropertyValue(property);
            });
        }
    }

    // Function to select a link
    function section1AboutUsSelectLink(id) {
        // Adjust main title
        if (mainTitle) {
            mainTitle.style.position = 'absolute';
            mainTitle.style.top = '200px';
            mainTitle.style.left = '0';
            mainTitle.style.fontSize = '2rem';
            mainTitle.style.transition = 'top 0.5s, font-size 0.5s, left 0.5s';
        }

        // Adjust back button
        if (backBtn) {
            backBtn.style.left = '0';
        }

        // Iterate through all links
        links.forEach((link, index) => {
            const currentId = index + 1;
            if (currentId === id) {
                applySelectedStyles(link, currentId);
            } else {
                applyMovingStyles(link, currentId);
            }
        });
    }

    // Function to unselect all links
    function section1AboutUsUnselect() {
        // Restore the initial styles of all elements
        for (const [id, savedStyles] of Object.entries(initialStyles)) {
            const element = document.querySelector(`#${id}`);
            if (element) {
                Object.entries(savedStyles).forEach(([property, value]) => {
                    element.style.setProperty(property, value);
                });
            }
        }

        // Restore main title and back button positioning
        if (mainTitle) {
            mainTitle.style.position = 'absolute';
            mainTitle.style.top = '0px';
            mainTitle.style.left = '200px';
            mainTitle.style.fontSize = 'initial';
            mainTitle.style.transition = 'top 0.5s, font-size 0.5s, left 0.5s';
        }

        if (backBtn) {
            // Position back button at initial position
            backBtn.style.left = '-600px';
            backBtn.style.top = 'calc(100% - 100px)';
        }
    }

    // Function to apply selected styles to a link
    function applySelectedStyles(link, id) {
        if (link.shape) {
            link.shape.style.height = '160px';
            link.shape.style.width = '270px';
            link.shape.style.top = '170px';
            link.shape.style.left = '0';
            link.shape.style.backgroundPosition = 'center';
            toggleTransform(link.shape, 'rotate(180deg)', 'rotate(0deg)');
        }

        if (link.plus) {
            link.plus.style.visibility = 'hidden';
            link.plus.style.width = '0';
            link.plus.style.height = '0';
        }

        if (link.title) {
            link.title.style.width = '600px';
            link.title.style.top = '170px';
            link.title.style.left = PARAGRAPH_LEFT;
            link.title.style.fontSize = '4rem';
            link.title.style.lineHeight = '4rem';
            link.title.style.fontWeight = '700';
        }

        if (link.description) {
            link.description.style.top = PARAGRAPH_TOP;
            link.description.style.left = PARAGRAPH_LEFT;
            link.description.style.visibility = 'visible';
            link.description.style.opacity = '1';
        }
    }

    // Function to apply moving/reset styles to non-selected links
    function applyMovingStyles(link, id) {
        if (link.shape) {
            link.shape.style.width = '100px';
            link.shape.style.height = '60px';
            // Adjust top and left based on link number to stack them
            const offsetY = 100 + (id - 1) * 80; // Example offset, adjust as needed
            link.shape.style.top = `calc(100% - ${offsetY}px)`;
            link.shape.style.left = 'calc(100% - 340px)';
            link.shape.style.transform = 'rotate(360deg)';
        }

        if (link.plus) {
            link.plus.style.visibility = 'visible';
            link.plus.style.opacity = '1';
            link.plus.style.width = '16px';
            link.plus.style.height = '16px';
            // Adjust top based on link number
            const offsetY = 100 + (id - 1) * 80; // Example offset, adjust as needed
            link.plus.style.top = `calc(100% - ${offsetY}px)`;
            link.plus.style.left = 'calc(100% - 230px)';
        }

        if (link.title) {
            link.title.style.width = '100px';
            link.title.style.top = `calc(100% - ${100 + (id - 1) * 80}px)`; // Example offset
            link.title.style.left = 'calc(100% - 200px)';
            link.title.style.fontSize = '1.4rem';
            link.title.style.lineHeight = '24px';
        }

        if (link.description) {
            link.description.style.top = PARAGRAPH_HIDDEN;
            link.description.style.left = PARAGRAPH_LEFT;
            link.description.style.visibility = 'hidden';
            link.description.style.opacity = '0';
        }
    }

    // Helper function to toggle transform property
    function toggleTransform(element, transform1, transform2) {
        if (element.style.transform === transform1) {
            element.style.transform = transform2;
        } else {
            element.style.transform = transform1;
        }
    }

    // Capture initial styles after DOM is ready
    captureInitialStyles();

    // Expose functions globally
    window.section1AboutUsSelectLink = section1AboutUsSelectLink;
    window.section1AboutUsUnselect = section1AboutUsUnselect;
});
