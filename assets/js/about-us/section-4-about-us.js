document.addEventListener('DOMContentLoaded', function () {
    // Common elements
    const mainTitle4 = document.querySelector('#section-4-about-us__main-title');
    const backBtn4 = document.querySelector('#section-4-about-us__back-btn');
    // Link 1 elements
    const link1shape = document.querySelector('#section-4-about-us__link-1-shape');
    const link1plus = document.querySelector('#section-4-about-us__link-1-plus');
    const link1title = document.querySelector('#section-4-about-us__link-1-title');
    const link1description = document.querySelector('#section-4-about-us__link-1-description');
    // Link 2 elements
    const link2shape = document.querySelector('#section-4-about-us__link-2-shape');
    const link2plus = document.querySelector('#section-4-about-us__link-2-plus');
    const link2title = document.querySelector('#section-4-about-us__link-2-title');
    const link2description = document.querySelector('#section-4-about-us__link-2-description');
    // Link 3 elements
    const link3shape = document.querySelector('#section-4-about-us__link-3-shape');
    const link3plus = document.querySelector('#section-4-about-us__link-3-plus');
    const link3title = document.querySelector('#section-4-about-us__link-3-title');
    const link3description = document.querySelector('#section-4-about-us__link-3-description');

    const initialStyles = {};

    function captureInitialStyles() {
        // Capture computed styles for all elements
        const elements = {
            'section-4-about-us__main-title': mainTitle4,
            'section-4-about-us__back-btn': backBtn4,
            // Link 1
            'section-4-about-us__link-1-shape': link1shape,
            'section-4-about-us__link-1-plus': link1plus,
            'section-4-about-us__link-1-title': link1title,
            'section-4-about-us__link-1-description': link1description,
            // Link 2
            'section-4-about-us__link-2-shape': link2shape,
            'section-4-about-us__link-2-plus': link2plus,
            'section-4-about-us__link-2-title': link2title,
            'section-4-about-us__link-2-description': link2description,
            // Link 3
            'section-4-about-us__link-3-shape': link3shape,
            'section-4-about-us__link-3-plus': link3plus,
            'section-4-about-us__link-3-title': link3title,
            'section-4-about-us__link-3-description': link3description,
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

    function section4AboutUsSelectLink(id) {
        if (mainTitle4) {
            mainTitle4.style.position = 'absolute';
            mainTitle4.style.top = '410px';
            mainTitle4.style.left = '0';
            mainTitle4.style.fontSize = '2rem';
            mainTitle4.style.transition = 'top .5s, font-size .5s, left .5s';
        }

        if (backBtn4) {
            backBtn4.style.left = '0';
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

    function section4AboutUsUnselect() {
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

    const PARAGRAPH_TOP = '310px';
    const PARAGRAPH_HIDDEN = '2000px';
    const PARAGRAPH_LEFT = '470px';

    const SELECTED_LINK_SHAPE_HEIGHT = '200px';
    const SELECTED_LINK_SHAPE_WIDTH = '218px';
    const SELECTED_LINK_SHAPE_TOP = '170px';
    const SELECTED_LINK_SHAPE_LEFT = '0';
    const SELECTED_LINK_SHAPE_BG_POSITION = 'center';
    const SELECTED_LINK_SHAPE_TRANSFORM = 'rotate(180deg)';

    const SELECTED_LINK_PLUS_VISIBILITY = 'hidden';
    const SELECTED_LINK_PLUS_WIDTH = '0';

    const SELECTED_LINK_TITLE_WIDTH = '600px';
    const SELECTED_LINK_TITLE_TOP = '170px';
    const SELECTED_LINK_TITLE_LEFT = PARAGRAPH_LEFT;
    const SELECTED_LINK_TITLE_FONT_SIZE = '4rem';
    const SELECTED_LINK_TITLE_LINE_HEIGHT = '4rem';
    const SELECTED_LINK_TITLE_FONT_WEIGHT = '700';

    const MOVING_LINK_SHAPE_WIDTH = '100px';
    const MOVING_LINK_SHAPE_HEIGHT = '60px';
    const MOVING_LINK_SHAPE_LEFT = 'calc(100% - 340px)';
    const MOVING_LINK_SHAPE_TRANSFORM = 'rotate(360deg)';

    const MOVING_LINK_PLUS_VISIBILITY = 'visible';
    const MOVING_LINK_PLUS_OPACITY = '1';
    const MOVING_LINK_PLUS_WIDTH = '16px';
    const MOVING_LINK_PLUS_HEIGHT = '60px';
    const MOVING_LINK_PLUS_LEFT = 'calc(100% - 230px)';

    const MOVING_LINK_TITLE_WIDTH = '100px';
    const MOVING_LINK_TITLE_LEFT = 'calc(100% - 200px)';
    const MOVING_LINK_TITLE_FONT_SIZE = '1.4rem';
    const MOVING_LINK_TITLE_LINE_HEIGHT = '60px';

    /* Specifics */
    const MOVING_LINK1_TOP = 'calc(100% - 240px - 10px - 10px - 10px)';
    const MOVING_LINK2_TOP = 'calc(100% - 180px - 10px - 10px)';
    const MOVING_LINK3_TOP = 'calc(100% - 120px - 10px)';
    const MOVING_LINK4_TOP = 'calc(100% - 60px)';

    function move1() {
        if (link1shape) {
            link1shape.style.height = SELECTED_LINK_SHAPE_HEIGHT;
            link1shape.style.width = SELECTED_LINK_SHAPE_WIDTH;
            link1shape.style.top = SELECTED_LINK_SHAPE_TOP;
            link1shape.style.left = SELECTED_LINK_SHAPE_LEFT;
            link1shape.style.backgroundPosition = SELECTED_LINK_SHAPE_BG_POSITION;
            link1shape.style.transform = SELECTED_LINK_SHAPE_TRANSFORM;
        }

        if (link1plus) {
            link1plus.style.visibility = SELECTED_LINK_PLUS_VISIBILITY;
            link1plus.style.width = SELECTED_LINK_PLUS_WIDTH;
        }

        if (link1title) {
            link1title.style.width = SELECTED_LINK_TITLE_WIDTH;
            link1title.style.top = SELECTED_LINK_TITLE_TOP;
            link1title.style.left = SELECTED_LINK_TITLE_LEFT;
            link1title.style.fontSize = SELECTED_LINK_TITLE_FONT_SIZE;
            link1title.style.lineHeight = SELECTED_LINK_TITLE_LINE_HEIGHT;
            link1title.style.fontWeight = SELECTED_LINK_TITLE_FONT_WEIGHT;
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_TOP;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 2
        if (link2shape) {
            link2shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link2shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link2shape.style.top = MOVING_LINK2_TOP;
            link2shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link2shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link2plus) {
            link2plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link2plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link2plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link2plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link2plus.style.top = MOVING_LINK2_TOP;
            link2plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link2title) {
            link2title.style.width = MOVING_LINK_TITLE_WIDTH;
            link2title.style.top = MOVING_LINK2_TOP;
            link2title.style.left = MOVING_LINK_TITLE_LEFT;
            link2title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link2title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_HIDDEN;
            link2description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 3
        if (link3shape) {
            link3shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link3shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link3shape.style.top = MOVING_LINK3_TOP;
            link3shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link3shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link3plus) {
            link3plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link3plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link3plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link3plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link3plus.style.top = MOVING_LINK3_TOP;
            link3plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link3title) {
            link3title.style.width = MOVING_LINK_TITLE_WIDTH;
            link3title.style.top = MOVING_LINK3_TOP;
            link3title.style.left = MOVING_LINK_TITLE_LEFT;
            link3title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link3title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_HIDDEN;
            link3description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 4
        if (link4shape) {
            link4shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link4shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link4shape.style.top = MOVING_LINK4_TOP;
            link4shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link4shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link4plus) {
            link4plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link4plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link4plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link4plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link4plus.style.top = MOVING_LINK4_TOP;
            link4plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link4title) {
            link4title.style.width = MOVING_LINK_TITLE_WIDTH;
            link4title.style.top = MOVING_LINK4_TOP;
            link4title.style.left = MOVING_LINK_TITLE_LEFT;
            link4title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link4title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link4description) {
            link4description.style.top = PARAGRAPH_HIDDEN;
            link4description.style.left = PARAGRAPH_LEFT;
        }
    }

    function move2() {
        if (link2shape) {
            link2shape.style.height = SELECTED_LINK_SHAPE_HEIGHT;
            link2shape.style.width = SELECTED_LINK_SHAPE_WIDTH;
            link2shape.style.top = SELECTED_LINK_SHAPE_TOP;
            link2shape.style.left = SELECTED_LINK_SHAPE_LEFT;
            link2shape.style.backgroundPosition = SELECTED_LINK_SHAPE_BG_POSITION;
            link2shape.style.transform = SELECTED_LINK_SHAPE_TRANSFORM;
        }

        if (link2plus) {
            link2plus.style.visibility = SELECTED_LINK_PLUS_VISIBILITY;
            link2plus.style.width = SELECTED_LINK_PLUS_WIDTH;
        }

        if (link2title) {
            link2title.style.width = SELECTED_LINK_TITLE_WIDTH;
            link2title.style.top = SELECTED_LINK_TITLE_TOP;
            link2title.style.left = SELECTED_LINK_TITLE_LEFT;
            link2title.style.fontSize = SELECTED_LINK_TITLE_FONT_SIZE;
            link2title.style.lineHeight = SELECTED_LINK_TITLE_LINE_HEIGHT;
            link2title.style.fontWeight = SELECTED_LINK_TITLE_FONT_WEIGHT;
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_TOP;
            link2description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 1
        if (link1shape) {
            link1shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link1shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link1shape.style.top = MOVING_LINK1_TOP;
            link1shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link1shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link1plus) {
            link1plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link1plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link1plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link1plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link1plus.style.top = MOVING_LINK1_TOP;
            link1plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link1title) {
            link1title.style.width = MOVING_LINK_TITLE_WIDTH;
            link1title.style.top = MOVING_LINK1_TOP;
            link1title.style.left = MOVING_LINK_TITLE_LEFT;
            link1title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link1title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_HIDDEN;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 3
        if (link3shape) {
            link3shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link3shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link3shape.style.top = MOVING_LINK3_TOP;
            link3shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link3shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link3plus) {
            link3plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link3plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link3plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link3plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link3plus.style.top = MOVING_LINK3_TOP;
            link3plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link3title) {
            link3title.style.width = MOVING_LINK_TITLE_WIDTH;
            link3title.style.top = MOVING_LINK3_TOP;
            link3title.style.left = MOVING_LINK_TITLE_LEFT;
            link3title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link3title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_HIDDEN;
            link3description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 4
        if (link4shape) {
            link4shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link4shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link4shape.style.top = MOVING_LINK4_TOP;
            link4shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link4shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link4plus) {
            link4plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link4plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link4plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link4plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link4plus.style.top = MOVING_LINK4_TOP;
            link4plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link4title) {
            link4title.style.width = MOVING_LINK_TITLE_WIDTH;
            link4title.style.top = MOVING_LINK4_TOP;
            link4title.style.left = MOVING_LINK_TITLE_LEFT;
            link4title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link4title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link4description) {
            link4description.style.top = PARAGRAPH_HIDDEN;
            link4description.style.left = PARAGRAPH_LEFT;
        }
    }

    function move3() {
        if (link3shape) {
            link3shape.style.height = SELECTED_LINK_SHAPE_HEIGHT;
            link3shape.style.width = SELECTED_LINK_SHAPE_WIDTH;
            link3shape.style.top = SELECTED_LINK_SHAPE_TOP;
            link3shape.style.left = SELECTED_LINK_SHAPE_LEFT;
            link3shape.style.backgroundPosition = SELECTED_LINK_SHAPE_BG_POSITION;
            link3shape.style.transform = SELECTED_LINK_SHAPE_TRANSFORM;
        }

        if (link3plus) {
            link3plus.style.visibility = SELECTED_LINK_PLUS_VISIBILITY;
            link3plus.style.width = SELECTED_LINK_PLUS_WIDTH;
        }

        if (link3title) {
            link3title.style.width = SELECTED_LINK_TITLE_WIDTH;
            link3title.style.top = SELECTED_LINK_TITLE_TOP;
            link3title.style.left = SELECTED_LINK_TITLE_LEFT;
            link3title.style.fontSize = SELECTED_LINK_TITLE_FONT_SIZE;
            link3title.style.lineHeight = SELECTED_LINK_TITLE_LINE_HEIGHT;
            link3title.style.fontWeight = SELECTED_LINK_TITLE_FONT_WEIGHT;
        }

        if (link3description) {
            link3description.style.top = PARAGRAPH_TOP;
            link3description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 1
        if (link1shape) {
            link1shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link1shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link1shape.style.top = MOVING_LINK1_TOP;
            link1shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link1shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link1plus) {
            link1plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link1plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link1plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link1plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link1plus.style.top = MOVING_LINK1_TOP;
            link1plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link1title) {
            link1title.style.width = MOVING_LINK_TITLE_WIDTH;
            link1title.style.top = MOVING_LINK1_TOP;
            link1title.style.left = MOVING_LINK_TITLE_LEFT;
            link1title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link1title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link1description) {
            link1description.style.top = PARAGRAPH_HIDDEN;
            link1description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 2
        if (link2shape) {
            link2shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link2shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link2shape.style.top = MOVING_LINK2_TOP;
            link2shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link2shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link2plus) {
            link2plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link2plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link2plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link2plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link2plus.style.top = MOVING_LINK2_TOP;
            link2plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link2title) {
            link2title.style.width = MOVING_LINK_TITLE_WIDTH;
            link2title.style.top = MOVING_LINK2_TOP;
            link2title.style.left = MOVING_LINK_TITLE_LEFT;
            link2title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link2title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link2description) {
            link2description.style.top = PARAGRAPH_HIDDEN;
            link2description.style.left = PARAGRAPH_LEFT;
        }

        // moving link 4
        if (link4shape) {
            link4shape.style.width = MOVING_LINK_SHAPE_WIDTH;
            link4shape.style.height = MOVING_LINK_SHAPE_HEIGHT;
            link4shape.style.top = MOVING_LINK4_TOP;
            link4shape.style.left = MOVING_LINK_SHAPE_LEFT;
            link4shape.style.transform = MOVING_LINK_SHAPE_TRANSFORM;
        }

        if (link4plus) {
            link4plus.style.visibility = MOVING_LINK_PLUS_VISIBILITY;
            link4plus.style.opacity = MOVING_LINK_PLUS_OPACITY;
            link4plus.style.width = MOVING_LINK_PLUS_WIDTH;
            link4plus.style.height = MOVING_LINK_PLUS_HEIGHT
            link4plus.style.top = MOVING_LINK4_TOP;
            link4plus.style.left = MOVING_LINK_PLUS_LEFT;
        }

        if (link4title) {
            link4title.style.width = MOVING_LINK_TITLE_WIDTH;
            link4title.style.top = MOVING_LINK4_TOP;
            link4title.style.left = MOVING_LINK_TITLE_LEFT;
            link4title.style.fontSize = MOVING_LINK_TITLE_FONT_SIZE;
            link4title.style.lineHeight = MOVING_LINK_TITLE_LINE_HEIGHT;
        }

        if (link4description) {
            link4description.style.top = PARAGRAPH_HIDDEN;
            link4description.style.left = PARAGRAPH_LEFT;
        }
    }

    // Capture initial styles after DOM is ready
    captureInitialStyles();

    // Expose functions globally
    window.section4AboutUsSelectLink = section4AboutUsSelectLink;
    window.section4AboutUsUnselect = section4AboutUsUnselect;

    /* - - - - - - - - - - - - - - - -   
    
        SLIDE INTO VIEW 
    
    + - - - - - - - - - - - - - - - - */
    const section4AboutUsContent = document.querySelector('.section-4-about-us-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section4AboutUsContent.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const section4AboutUs = document.querySelector('.section-4-about-us');
    observer.observe(section4AboutUs);
});