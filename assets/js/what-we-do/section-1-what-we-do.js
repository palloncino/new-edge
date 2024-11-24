document.addEventListener("DOMContentLoaded", () => {

    // Add initial state class immediately
    document.body.classList.add('labels-initial-state');

    const circleInnerContainer = document.getElementById("circle_inner_container");
    const link4 = document.getElementById('floating-link-container--4');
    const link7 = document.getElementById('floating-link-container--7');
    const link10 = document.getElementById('floating-link-container--10');
    const link16 = document.getElementById('floating-link-container--16');
    const link19 = document.getElementById('floating-link-container--19');
    const link22 = document.getElementById('floating-link-container--22');

    if (link4) {
        link4.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move4());
    }
    if (link7) {
        link7.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move7());
    }
    if (link10) {
        link10.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move10());
    }
    if (link16) {
        link16.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move16());
    }
    if (link19) {
        link19.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move19());
    }
    if (link22) {
        link22.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move22());
    }

    const floatingLinks = {
        'floating-link-container--4': link4,
        'floating-link-container--7': link7,
        'floating-link-container--10': link10,
        'floating-link-container--16': link16,
        'floating-link-container--19': link19,
        'floating-link-container--22': link22,
    };

    const ELEMENT_PROPERTIES = ['position', 'top', 'left', 'font-size', 'line-height', 'width', 'height', 'visibility', 'opacity', 'background-position', 'transition', 'font-weight', 'transform'];

    const initialInnerCircleStyles = {};
    const initialFloatingLinksStyles = {};
    const settledFloatingLinksStyles = {};


    function hideFloatingLinks() {
        for (const [id, element] of Object.entries(floatingLinks)) {
            if (element && initialFloatingLinksStyles[id]) {
                ELEMENT_PROPERTIES.forEach(property => {
                    element.style[property] = initialFloatingLinksStyles[id][property];
                });
            }
        }
    }

    function move4() {
        slideLateralLabels(0);

        // Step 1: Restore initial styles for all floating links
        hideFloatingLinks();

        // Step 2: Apply transformation to the circleInnerContainer
        if (circleInnerContainer) {
            // Add a transition for smooth transformation
            circleInnerContainer.style.transition = "transform 1s ease-in-out";

            // Apply the desired transformation
            circleInnerContainer.style.transform = "translateX(-750px) translateY(-200px) scale(2.5)";
        }
    }


    function captureFloatingLinksStyles(targetStyles) {
        for (const [id, element] of Object.entries(floatingLinks)) {
            if (element) {
                const computedStyles = window.getComputedStyle(element);
                targetStyles[id] = {};
                ELEMENT_PROPERTIES.forEach((property) => {
                    targetStyles[id][property] = computedStyles.getPropertyValue(property);
                });
            }
        }
    }

    function captureInnerCircleStyles() {
        if (circleInnerContainer) {
            const computedStyles = window.getComputedStyle(circleInnerContainer);
            ELEMENT_PROPERTIES.forEach((property) => {
                initialInnerCircleStyles[property] = computedStyles.getPropertyValue(property);
            });
        }
    }

    function captureInitialInnerCircleStyles() {
        captureInnerCircleStyles();
    }

    function captureInitialFloatingLinksStyles() {
        captureFloatingLinksStyles(initialFloatingLinksStyles);
    }

    function captureSettledFloatingLinksStyles() {
        captureFloatingLinksStyles(settledFloatingLinksStyles);
    }

    function slideLateralLabels(num) {
        const leftLabel = document.querySelector('.section-1-what-we-do__big-svg--left');
        const rightLabel = document.querySelector('.section-1-what-we-do__big-svg--right');

        if (!leftLabel || !rightLabel) {
            console.warn("Lateral labels not found");
            return;
        }

        if (num === 1) {
            // Remove the initial state class to trigger the animation
            document.body.classList.remove('labels-initial-state');
        } else {
            // Add the class back to hide the labels
            document.body.classList.add('labels-initial-state');
        }
    }

    // Phase 1: Rotate the circle_inner_container and two specific items simultaneously
    function phaseOne() {
        return new Promise((resolve) => {

            slideLateralLabels(1);

            // Set initial transform to ensure the browser registers it
            circleInnerContainer.style.transform = "rotate(0deg)";

            // Apply the transition for rotation
            circleInnerContainer.style.transition = "transform 1s ease-in-out";

            // Select the two specific circle items
            const circleItem1Inner = document.querySelector(".circle-item-1 .inner-container");
            const circleItem13Inner = document.querySelector(".circle-item-13 .inner-container");

            if (!circleItem1Inner || !circleItem13Inner) {
                console.warn("One or both of the circle-item-1 or circle-item-13 not found.");
            }

            // Apply transitions and rotations to the two selected items
            if (circleItem1Inner) {
                circleItem1Inner.style.transition = "transform 1s ease-in-out";
                circleItem1Inner.style.transform = "rotate(-85deg)";
            }

            if (circleItem13Inner) {
                circleItem13Inner.style.transition = "transform 1s ease-in-out";
                circleItem13Inner.style.transform = "rotate(-95deg)";
            }

            // Use a slight delay to ensure the initial state is registered
            setTimeout(() => {
                circleInnerContainer.style.transform = "rotate(185deg)";
            }, 50); // 50ms delay

            // Wait for the animation to complete before resolving
            setTimeout(() => {
                // Verify the rotation via computed styles
                const computedStyle = window.getComputedStyle(circleInnerContainer);
                resolve();
            }, 1050); // 1s transition + 50ms delay
        });
    }

    // Phase 2: Incrementally change shape backgrounds to orange, starting from 2 to 24, excluding 13
    function phaseTwo() {
        return new Promise((resolve) => {
            const orangeBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-orange.svg")';
            const lightBlueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-lightblue.svg")';
            const defaultDelay = 200;

            // Special cases: Only adjust the inner-container for outward orientation
            const specialCases = {
                1: 275,
                4: 275,
                7: 275,
                10: 275,
                13: 265,
                16: 275,
                19: 275,
                22: 275,
            };

            // Collect all circle items
            for (let i = 1; i <= 24; i++) {
                const parentItem = document.querySelector(`.circle-item-${i}`);
                const item = document.querySelector(`.circle-item-${i} .inner-container`);

                if (!parentItem || !item) {
                    console.warn(`Circle item ${i} not found.`);
                    continue;
                }

                setTimeout(() => {
                    if (specialCases[i] !== undefined) {

                        const floatingLinkContainer = document.getElementById(`floating-link-container--${i}`);

                        if (floatingLinkContainer) {
                            // Apply smooth transition for the movement
                            // floatingLinkContainer.style.transition = "top 1s ease, bottom 1s ease";

                            // Determine the movement based on the item number
                            if (i === 4 || i === 10) {
                                // Move to the top for items 4, 10
                                floatingLinkContainer.style.top = "-20px";
                                floatingLinkContainer.style.bottom = "";
                            } else if (i === 7) {
                                // Move to the top for item 7
                                floatingLinkContainer.style.top = "-110px";
                                floatingLinkContainer.style.bottom = "";
                            } else if (i === 16 || i === 22) {
                                // Move to the bottom for items 16, 22
                                floatingLinkContainer.style.bottom = "-20px";
                                floatingLinkContainer.style.top = ""; // Reset top position
                            } else if (i === 19) {
                                // Move to the bottom for item 19
                                floatingLinkContainer.style.bottom = "-120px";
                                floatingLinkContainer.style.top = ""; // Reset top position
                            }
                        } else {
                            console.warn(`Floating link container #floating-link-container--${i} not found.`);
                        }

                        // Apply light blue background and outward rotation
                        item.style.transition = "none";
                        item.style.backgroundImage = lightBlueBackground;

                        // Apply outward rotation directly to the inner-container
                        item.style.transform = `rotate(${specialCases[i]}deg)`;
                    } else {
                        // Apply orange background for default cases
                        item.style.transition = "none";
                        item.style.backgroundImage = orangeBackground;
                    }
                }, i * defaultDelay); // Incremental delay
            }

            // Wait for all animations to complete
            setTimeout(() => {
                resolve();
            }, 24 * defaultDelay);
        });
    }

    // Start the animation sequence
    async function startAnimation() {

        // Capture initial styles after DOM is ready
        captureInitialFloatingLinksStyles();
        captureInitialInnerCircleStyles()

        await phaseOne();
        await phaseTwo();

        captureSettledFloatingLinksStyles();
    }

    // Start the animation with a slight delay to ensure initial states are applied
    setTimeout(startAnimation, 0);
});