document.addEventListener('DOMContentLoaded', function () {

    // Common elements
    const mainTitle1 = document.querySelector('#section-1-over-the-edge__section-1-main-title');
    const backBtn1 = document.querySelector('#section-1-over-the-edge__back-btn');
    // Link 1 elements
    const link1shape = document.querySelector('#section-1-over-the-edge__link-1-shape');
    const link1plus = document.querySelector('#section-1-over-the-edge__link-1-plus');
    const link1title = document.querySelector('#section-1-over-the-edge__link-1-title');
    const link1description = document.querySelector('#section-1-over-the-edge__link-1-description');
    // Link 2 elements (if any)
    const link2shape = document.querySelector('#section-1-over-the-edge__link-2-shape');
    const link2plus = document.querySelector('#section-1-over-the-edge__link-2-plus');
    const link2title = document.querySelector('#section-1-over-the-edge__link-2-title');
    const link2description = document.querySelector('#section-1-over-the-edge__link-2-description');
    // Link 3 elements (if any)
    const link3shape = document.querySelector('#section-1-over-the-edge__link-3-shape');
    const link3plus = document.querySelector('#section-1-over-the-edge__link-3-plus');
    const link3title = document.querySelector('#section-1-over-the-edge__link-3-title');
    const link3description = document.querySelector('#section-1-over-the-edge__link-3-description');

    const PARAGRAPH_TOP = '370px';
    const PARAGRAPH_HIDDEN = '2000px';
    const PARAGRAPH_LEFT = '470px';

    // Object to store the initial styles
    const initialStyles = {};

    function captureInitialStyles() {
        // Capture computed styles for all elements
        const elements = {
            'section-1-over-the-edge__back-btn': backBtn1,
            // Link 1
            'section-1-over-the-edge__link-1-shape': link1shape,
            'section-1-over-the-edge__link-1-plus': link1plus,
            'section-1-over-the-edge__link-1-title': link1title,
            'section-1-over-the-edge__link-1-description': link1description,
            // Link 2
            'section-1-over-the-edge__link-2-shape': link2shape,
            'section-1-over-the-edge__link-2-plus': link2plus,
            'section-1-over-the-edge__link-2-title': link2title,
            'section-1-over-the-edge__link-2-description': link2description,
            // Link 3
            'section-1-over-the-edge__link-3-shape': link3shape,
            'section-1-over-the-edge__link-3-plus': link3plus,
            'section-1-over-the-edge__link-3-title': link3title,
            'section-1-over-the-edge__link-3-description': link3description,
        };

        for (const [id, element] of Object.entries(elements)) {
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
                    'transform',
                ].forEach((property) => {
                    initialStyles[id][property] = computedStyles.getPropertyValue(property);
                });
            }
        }
    }

    function section1AboutUsSelectLink(id) {
        if (mainTitle1) {
            mainTitle1.style.position = 'absolute';
            mainTitle1.style.top = '200px';
            mainTitle1.style.left = '0';
            mainTitle1.style.fontSize = '2rem';
            mainTitle1.style.transition = 'top .5s, font-size .5s, left .5s';
        }

        if (backBtn1) {
            backBtn1.style.left = '0';
        }

        switch (id) {
            case 1:
                move1();
                break;

            case 2:
                move2();
                break;

            case 3:
                move3();
                break;

            default:
                break;
        }
    }

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
    }

    function move1() {
        if (link1shape) {
            link1shape.style.height = '160px';
            link1shape.style.width = '270px';
            link1shape.style.top = '170px';
            link1shape.style.left = '0';
            link1shape.style.backgroundPosition = 'center';
            if (link1shape.style.transform === 'rotate(0deg)') {
                link1shape.style.transform = 'rotate(180deg)';
            } else if (link1shape.style.transform === 'rotate(180deg)') {
                link1shape.style.transform = 'rotate(0deg)'
            }
        }

        if (link1plus) {
            link1plus.style.visibility = 'hidden';
            link1plus.style.width = '0';
        }

        if (link1title) {
            link1title.style.width = '600px';
            link1title.style.top = '170px';
            link1title.style.left = PARAGRAPH_LEFT;
            link1title.style.fontSize = '4rem';
            link1title.style.lineHeight = '4rem';
            link1title.style.fontWeight = '700';
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_TOP;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 2
        if (link2shape) {
            link2shape.style.width = '100px';
            link2shape.style.height = '60px';
            link2shape.style.top = 'calc(100% - 200px)';
            link2shape.style.left = 'calc(100% - 340px)';
            link2shape.style.transform = 'rotate(180deg)';
        }

        if (link2plus) {
            link2plus.style.visibility = 'visible';
            link2plus.style.opacity = '1';
            link2plus.style.width = '16px';
            link2plus.style.top = 'calc(100% - 200px)';
            link2plus.style.left = 'calc(100% - 230px)';
        }

        if (link2title) {
            link2title.style.width = '100px';
            link2title.style.top = 'calc(100% - 200px)';
            link2title.style.left = 'calc(100% - 200px)';
            link2title.style.fontSize = '1.4rem';
            link2title.style.lineHeight = '24px';
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_HIDDEN;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 3
        if (link3shape) {
            link3shape.style.width = '100px';
            link3shape.style.height = '60px';
            link3shape.style.top = 'calc(100% - 100px)';
            link3shape.style.left = 'calc(100% - 340px)';
            link3shape.style.transform = 'rotate(180deg)';
        }

        if (link3plus) {
            link3plus.style.visibility = 'visible';
            link3plus.style.opacity = '1';
            link3plus.style.width = '16px';
            link3plus.style.top = 'calc(100% - 100px)';
            link3plus.style.left = 'calc(100% - 230px)';
        }

        if (link3title) {
            link3title.style.width = '100px';
            link3title.style.top = 'calc(100% - 100px)';
            link3title.style.left = 'calc(100% - 200px)';
            link3title.style.fontSize = '1.4rem';
            link3title.style.lineHeight = '24px';
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_HIDDEN;
            link1description.style.left = PARAGRAPH_LEFT;
        }
    }

    function move2() {
        if (link2shape) {
            link2shape.style.height = '160px';
            link2shape.style.width = '270px';
            link2shape.style.top = '170px';
            link2shape.style.left = '0';
            link2shape.style.backgroundPosition = 'center';
            if (link2shape.style.transform === 'rotate(0deg)') {
                link2shape.style.transform = 'rotate(180deg)';
            } else if (link2shape.style.transform === 'rotate(180deg)') {
                link2shape.style.transform = 'rotate(0deg)'
            }
        }

        if (link2plus) {
            link2plus.style.visibility = 'hidden';
            link2plus.style.width = '0';
        }

        if (link2title) {
            link2title.style.width = '600px';
            link2title.style.top = '170px';
            link2title.style.left = PARAGRAPH_LEFT;
            link2title.style.fontSize = '4rem';
            link2title.style.lineHeight = '4rem';
            link2title.style.fontWeight = '700';
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_TOP;
            link2description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 1
        if (link1shape) {
            link1shape.style.width = '100px';
            link1shape.style.height = '60px';
            link1shape.style.top = 'calc(100% - 300px)';
            link1shape.style.left = 'calc(100% - 340px)';
            link1shape.style.transform = 'rotate(180deg)';
        }

        if (link1plus) {
            link1plus.style.visibility = 'visible';
            link1plus.style.opacity = '1';
            link1plus.style.width = '16px';
            link1plus.style.top = 'calc(100% - 300px)';
            link1plus.style.left = 'calc(100% - 230px)';
        }

        if (link1title) {
            link1title.style.width = '100px';
            link1title.style.top = 'calc(100% - 300px)';
            link1title.style.left = 'calc(100% - 200px)';
            link1title.style.fontSize = '1.4rem';
            link1title.style.lineHeight = '24px';
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_HIDDEN;
            link2description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 3
        if (link3shape) {
            link3shape.style.width = '100px';
            link3shape.style.height = '60px';
            link3shape.style.top = 'calc(100% - 100px)';
            link3shape.style.left = 'calc(100% - 340px)';
            link3shape.style.transform = 'rotate(180deg)';
        }

        if (link3plus) {
            link3plus.style.visibility = 'visible';
            link3plus.style.opacity = '1';
            link3plus.style.width = '16px';
            link3plus.style.top = 'calc(100% - 100px)';
            link3plus.style.left = 'calc(100% - 230px)';
        }

        if (link3title) {
            link3title.style.width = '100px';
            link3title.style.top = 'calc(100% - 100px)';
            link3title.style.left = 'calc(100% - 200px)';
            link3title.style.fontSize = '1.4rem';
            link3title.style.lineHeight = '24px';
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_HIDDEN;
            link3description.style.left = PARAGRAPH_LEFT;
        }

    }

    function move3() {
        if (link3shape) {
            link3shape.style.height = '160px';
            link3shape.style.width = '270px';
            link3shape.style.top = '170px';
            link3shape.style.left = '0';
            link3shape.style.backgroundPosition = 'center';
            if (link3shape.style.transform === 'rotate(0deg)') {
                link3shape.style.transform = 'rotate(180deg)';
            } else if (link3shape.style.transform === 'rotate(180deg)') {
                link3shape.style.transform = 'rotate(0deg)'
            }
        }

        if (link3plus) {
            link3plus.style.visibility = 'hidden';
            link3plus.style.width = '0';
        }

        if (link3title) {
            link3title.style.width = '600px';
            link3title.style.top = '170px';
            link3title.style.left = PARAGRAPH_LEFT;
            link3title.style.fontSize = '4rem';
            link3title.style.lineHeight = '4rem';
            link3title.style.fontWeight = '700';
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_TOP;
            link3description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 1
        if (link1shape) {
            link1shape.style.width = '100px';
            link1shape.style.height = '60px';
            link1shape.style.top = 'calc(100% - 300px)';
            link1shape.style.left = 'calc(100% - 340px)';
            link1shape.style.transform = 'rotate(180deg)';
        }

        if (link1plus) {
            link1plus.style.visibility = 'visible';
            link1plus.style.opacity = '1';
            link1plus.style.width = '16px';
            link1plus.style.top = 'calc(100% - 300px)';
            link1plus.style.left = 'calc(100% - 230px)';
        }

        if (link1title) {
            link1title.style.width = '100px';
            link1title.style.top = 'calc(100% - 300px)';
            link1title.style.left = 'calc(100% - 200px)';
            link1title.style.fontSize = '1.4rem';
            link1title.style.lineHeight = '24px';
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_HIDDEN;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 2
        if (link2shape) {
            link2shape.style.width = '100px';
            link2shape.style.height = '60px';
            link2shape.style.top = 'calc(100% - 100px)';
            link2shape.style.left = 'calc(100% - 340px)';
            link2shape.style.transform = 'rotate(180deg)';
        }

        if (link2plus) {
            link2plus.style.visibility = 'visible';
            link2plus.style.opacity = '1';
            link2plus.style.width = '16px';
            link2plus.style.top = 'calc(100% - 100px)';
            link2plus.style.left = 'calc(100% - 230px)';
        }

        if (link2title) {
            link2title.style.width = '100px';
            link2title.style.top = 'calc(100% - 100px)';
            link2title.style.left = 'calc(100% - 200px)';
            link2title.style.fontSize = '1.4rem';
            link2title.style.lineHeight = '24px';
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_HIDDEN;
            link3description.style.left = PARAGRAPH_LEFT;
        }
    }

    // Capture initial styles after DOM is ready
    captureInitialStyles();

    // Expose functions globally
    window.section1AboutUsSelectLink = section1AboutUsSelectLink;
    window.section1AboutUsUnselect = section1AboutUsUnselect;
});