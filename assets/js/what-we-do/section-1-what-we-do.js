document.addEventListener("DOMContentLoaded", () => {

    // Add initial state class immediately
    document.body.classList.add('labels-initial-state');

    const floatingBackButton = document.getElementById("section-1-what-we-do-back-button");
    const floatingParagraph4 = document.getElementById("section-1-what-we-do-floating-paragraph--4");
    const floatingImage4 = document.getElementById("section-1-what-we-do-floating-image--4");
    const linkTitle4 = document.getElementById("section-1-what-we-do-floating-link-text--4");
    const linkPlusIcon4 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--4");

    const circleInnerContainer = document.getElementById("circle_inner_container");
    const link4 = document.getElementById('floating-link-container--4');
    const link7 = document.getElementById('floating-link-container--7');
    const link10 = document.getElementById('floating-link-container--10');
    const link16 = document.getElementById('floating-link-container--16');
    const link19 = document.getElementById('floating-link-container--19');
    const link22 = document.getElementById('floating-link-container--22');

    const links = [link4, link7, link10, link16, link19, link22];
    links.forEach((link, index) => {
        if (link) {
            link.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move(index * 3 + 4));
        }
    });

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

    // Tracking variables for active timeouts and aborting animations
    let activeTimeouts = [];
    let animationAborted = false;

    function move(id) {
        // Abort ongoing animations
        animationAborted = true;
        activeTimeouts.forEach(timeoutID => clearTimeout(timeoutID));
        activeTimeouts = [];

        slideLateralLabels(0);

        // Step 1: Restore initial styles for all floating links
        hideFloatingLinks(id);

        // Step 2: Apply transformation to the circleInnerContainer
        rotateInnerCircleOnSelection();

        // Move floatingBackButton into view by translating x to 0
        floatingBackButton.style.left = "400px";

        // Move floatingParagraph4 into view by translating y to 0
        floatingParagraph4.style.top = "400px";

        // Move floatingImage4 into view by translating x to 0
        floatingImage4.style.right = "0";

        // Move linkTitle4 into view by translating y to 0
        linkTitle4.style.fontSize = '3.6rem'
        linkTitle4.style.lineHeight = '3.6rem'

        // Dissipate linkPlusIcon4 by opacity 0
        linkPlusIcon4.style.opacity = "0";

        // Capture settled styles after transformation
        const timeout = setTimeout(() => {
            captureSettledFloatingLinksStyles();
        }, 1000); // Match this timeout with the transition duration
        activeTimeouts.push(timeout);
    }

    function hideFloatingLinks(exceptId) {
        for (const [id, element] of Object.entries(floatingLinks)) {
            if (id !== `floating-link-container--${exceptId}` && element && initialFloatingLinksStyles[id]) {
                ELEMENT_PROPERTIES.forEach(property => {
                    element.style[property] = initialFloatingLinksStyles[id][property];
                });
            }
        }
    }

    function rotateInnerCircleOnSelection() {
        if (circleInnerContainer) {
            // Add a transition for smooth transformation
            circleInnerContainer.style.transition = "transform 1s ease-in-out";

            // Apply the desired transformation
            circleInnerContainer.style.transform = "translateX(-900px) translateY(-200px) scale(2.5)";
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

            if (animationAborted) {
                resolve();
                return;
            }

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
            const timeout1 = setTimeout(() => {
                if (!animationAborted) {
                    circleInnerContainer.style.transform = "rotate(185deg)";
                }
            }, 50); // 50ms delay
            activeTimeouts.push(timeout1);

            // Wait for the animation to complete before resolving
            const timeout2 = setTimeout(() => {
                if (!animationAborted) {
                    // Verify the rotation via computed styles
                    const computedStyle = window.getComputedStyle(circleInnerContainer);
                    resolve();
                }
            }, 1050); // 1s transition + 50ms delay
            activeTimeouts.push(timeout2);
        });
    }

    // Phase 2: Incrementally change shape backgrounds to orange, starting from 2 to 24, excluding 13
    function phaseTwo() {
        return new Promise((resolve) => {
            if (animationAborted) {
                resolve();
                return;
            }

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

                const timeout = setTimeout(() => {
                    if (animationAborted) return;

                    if (specialCases[i] !== undefined) {

                        const floatingLinkContainer = document.getElementById(`floating-link-container--${i}`);

                        if (floatingLinkContainer) {
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

                activeTimeouts.push(timeout);
            }

            // Wait for all animations to complete
            const finalTimeout = setTimeout(() => {
                if (!animationAborted) {
                    resolve();
                }
            }, 24 * defaultDelay);
            activeTimeouts.push(finalTimeout);
        });
    }

    // Start the animation sequence
    async function startAnimation() {

        // Reset the abort flag
        animationAborted = false;

        // Capture initial styles after DOM is ready
        captureInitialFloatingLinksStyles();
        captureInitialInnerCircleStyles();
        // TODOs
        // captureInitialBackButtonStyles();
        // captureInitialParagraphStyles();
        // captureInitialFloatingImagesStyles();

        await phaseOne();
        if (animationAborted) return; // Exit if aborted

        await phaseTwo();
        if (animationAborted) return; // Exit if aborted

        captureSettledFloatingLinksStyles();
    }

    // Start the animation with a slight delay to ensure initial states are applied
    const initialTimeout = setTimeout(startAnimation, 0);
    activeTimeouts.push(initialTimeout);
});
