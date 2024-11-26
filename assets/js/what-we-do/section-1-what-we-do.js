document.addEventListener("DOMContentLoaded", () => {

    // Add initial state class immediately
    document.body.classList.add('labels-initial-state');

    const floatingBackButton = document.getElementById("section-1-what-we-do-back-button");
    const circleInnerContainer = document.getElementById("circle_inner_container");

    const leftLabel = document.querySelector('.section-1-what-we-do__big-svg--left');
    const rightLabel = document.querySelector('.section-1-what-we-do__big-svg--right');

    const link4 = document.getElementById('floating-link-container--4');
    const link7 = document.getElementById('floating-link-container--7');
    const link10 = document.getElementById('floating-link-container--10');
    const link16 = document.getElementById('floating-link-container--16');
    const link19 = document.getElementById('floating-link-container--19');
    const link22 = document.getElementById('floating-link-container--22');

    const linkTitle4 = document.getElementById("section-1-what-we-do-floating-link-text--4");
    const linkTitle7 = document.getElementById("section-1-what-we-do-floating-link-text--7");
    const linkTitle10 = document.getElementById("section-1-what-we-do-floating-link-text--10");
    const linkTitle16 = document.getElementById("section-1-what-we-do-floating-link-text--16");
    const linkTitle19 = document.getElementById("section-1-what-we-do-floating-link-text--19");
    const linkTitle22 = document.getElementById("section-1-what-we-do-floating-link-text--22");

    const linkPlusIcon4 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--4");
    const linkPlusIcon7 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--7");
    const linkPlusIcon10 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--10");
    const linkPlusIcon16 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--16");
    const linkPlusIcon19 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--19");
    const linkPlusIcon22 = document.getElementById("section-1-what-we-do-floating-link-plus-icon--22");

    const links = [link4, link7, link10, link16, link19, link22];
    links.forEach((link) => {
        if (link) {
            const linkId = parseInt(link.id.split('--')[1]);
            link.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move(linkId));
        }
    });

    if (floatingBackButton) {
        floatingBackButton.addEventListener('click', backToInitialState);
    }

    const settledPositions = {
        'floating-link-container--4': {
            top: "-20px",
            left: "-170px",
        },
        'floating-link-container--7': {
            top: "-110px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        'floating-link-container--10': {
            top: "-20px",
            right: "-170px",
        },
        'floating-link-container--16': {
            bottom: "-20px",
            right: "-170px",
        },
        'floating-link-container--19': {
            bottom: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
        },
        'floating-link-container--22': {
            bottom: "-20px",
            left: "-170px",
        },
        // Add mappings for other floating links if they exist
    };


    const floatingLinksMap = {
        'floating-link-container--4': link4,
        'floating-link-container--7': link7,
        'floating-link-container--10': link10,
        'floating-link-container--16': link16,
        'floating-link-container--19': link19,
        'floating-link-container--22': link22,
    };

    const ELEMENT_PROPERTIES = [
        'position',
        'top',
        'left',
        'right',
        'bottom',
        'font-size',
        'line-height',
        'width',
        'height',
        'visibility',
        'opacity',
        'background-position',
        'background-image',
        'background-size',
        'background',
        'transition',
        'font-weight',
        'transform',
        'z-index',
    ];


    const initialInnerCircleStyles = {};
    const initialFloatingLinksStyles = {};
    const floatingLinkTextInitialStyles = {};
    const floatingPlusIconInitialStyles = {};
    const settledFloatingLinksStyles = {};

    let activeId = undefined;

    // Tracking variables for active timeouts and aborting animations
    let activeTimeouts = [];
    let animationAborted = false;

    function backToInitialState() {
        // Abort ongoing animations
        animationAborted = true;
        activeTimeouts.forEach(timeoutID => clearTimeout(timeoutID));
        activeTimeouts = [];

        slideLateralLabels(1);
        slideBackBtn(false)
        slideImage(activeId, false);
        slideParagraph(activeId, false);

        resetPositionInnerCircle();

        restoreFloatingLinks();
        // restoreCircleInnerContainer();
        // restoreCircleItems();

        // restoreFloatingLinkTexts();
        // restoreFloatingPlusIcons();

        // Reset the labels to their initial state

        // Reset any added classes or state variables
        document.body.classList.add('labels-initial-state');

        // Reset active ID
        activeId = undefined;

        // Reset the abort flag
        animationAborted = false;
    }

    function move(id) {
        activeId = id;

        // Abort ongoing animations
        animationAborted = true;
        activeTimeouts.forEach(timeoutID => clearTimeout(timeoutID));
        activeTimeouts = [];

        // Step 1: Hide all other floating links except the selected one
        hideFloatingLinks(id);

        // Step 2: Transform the inner circle for the selected item
        rotateInnerCircleOnSelection();

        // Step 3: Slide in the labels and back button
        slideLateralLabels(0);
        slideBackBtn(true);

        // Step 4: Animate the selected floating link and its text
        slideParagraph(id, true);
        slideImage(id, true);
        slideLinkText(id, true);
        slidePlusIcon(id, true);

        // Capture settled styles after the animation
        const timeout = setTimeout(() => {
            captureSettledFloatingLinksStyles();
        }, 1000); // Match the transition duration
        activeTimeouts.push(timeout);
    }

    function restoreFloatingLinks() {

        for (const [id, element] of Object.entries(floatingLinksMap)) {
            if (element) {
                const positions = settledPositions[id] || {};

                // Reset all positioning properties first
                element.style.top = "";
                element.style.left = "";
                element.style.right = "";
                element.style.bottom = "";
                element.style.transform = "";

                // Apply settled positions
                if (positions.top !== undefined) element.style.top = positions.top;
                if (positions.bottom !== undefined) element.style.bottom = positions.bottom;
                if (positions.left !== undefined) element.style.left = positions.left;
                if (positions.right !== undefined) element.style.right = positions.right;
                if (positions.transform !== undefined) element.style.transform = positions.transform;

                // Reset font size and line height to their normal values
                const textElement = element.querySelector('.section-1-what-we-do-floating-link-text');
                if (textElement) {
                    textElement.style.fontSize = "1.4rem"; // Normal size
                    textElement.style.lineHeight = "1.6rem"; // Normal line height
                }

            } else {
                console.warn(`⚠️ Cannot restore ${id}. Element missing.`);
            }
        }

    }

    function slideLinkText(id, slideIn) {
        const text = document.getElementById(`section-1-what-we-do-floating-link-text--${id}`);
        if (text) {
            if (slideIn) {
                // Make the text larger for the selected link
                text.style.fontSize = "3.6rem";
                text.style.lineHeight = "3.6rem";
            } else {
                // Reset to normal size
                text.style.fontSize = "1.4rem";
                text.style.lineHeight = "1.6rem";
            }
        }
    }

    function slideBackBtn(slideIn) {
        if (slideIn) {
            floatingBackButton.style.left = "400px";
        } else {
            floatingBackButton.style.left = "-600px";
        }
    }

    function slideParagraph(id, slideIn) {
        const paragraph = document.getElementById(`section-1-what-we-do-floating-paragraph--${id}`);
        if (slideIn) {
            paragraph.style.top = "400px";
        } else {
            paragraph.style.top = "1200px";
        }
    }

    function slideImage(id, slideIn) {
        const image = document.getElementById(`section-1-what-we-do-floating-image--${id}`);
        if (slideIn) {
            image.style.right = "0";
        } else {
            image.style.right = "-600px";
        }
    }

    function slidePlusIcon(id, slideIn) {
        const plusIcon = document.getElementById(`section-1-what-we-do-floating-link-plus-icon--${id}`);
        if (slideIn) {
            plusIcon.style.opacity = "0";
        } else {
            if (plusIcon && floatingPlusIconInitialStyles[plusIcon.id]) {
                ELEMENT_PROPERTIES.forEach((property) => {
                    plusIcon.style[property] = floatingPlusIconInitialStyles[plusIcon.id][property];
                });
            }
        }
    }

    function hideFloatingLinks(exceptId) {
        for (const [id, element] of Object.entries(floatingLinksMap)) {
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
            circleInnerContainer.style.transform = "translateX(-970px) translateY(-145px) scale(2.5)";
        }
    }

    function resetPositionInnerCircle() {
        if (circleInnerContainer && initialInnerCircleStyles) {

            // Step 1: Set the transition property to enable smooth animation
            const transitionValue = "transform 0.5s ease-in-out";
            circleInnerContainer.style.transition = transitionValue;

            // Step 2: Force a reflow to ensure the transition property is applied
            void circleInnerContainer.offsetHeight;

            // Step 3: Use requestAnimationFrame to apply the transform in the next frame
            requestAnimationFrame(() => {
                const resetTransform = "rotate(185deg)";
                circleInnerContainer.style.transform = resetTransform;
            });

            // Step 4: Restore other properties if necessary
            for (const property in initialInnerCircleStyles) {
                if (initialInnerCircleStyles.hasOwnProperty(property)) {
                    if (property === 'transition' || property === 'transform') continue; // Already handled

                    circleInnerContainer.style[property] = initialInnerCircleStyles[property];
                }
            }

        } else {
            console.warn("⚠️ circleInnerContainer or initialInnerCircleStyles is not defined.");
        }
    }

    function captureFloatingLinksStyles(targetStyles) {
        for (const [id, element] of Object.entries(floatingLinksMap)) {
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
        } else {
            console.warn("⚠️ circleInnerContainer is not found.");
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

    function captureInitialFloatingLinkTextStyles() {
        const linkTexts = [linkTitle4, linkTitle7, linkTitle10, linkTitle16, linkTitle19, linkTitle22];
        linkTexts.forEach((linkText) => {
            if (linkText) {
                const id = linkText.id;
                floatingLinkTextInitialStyles[id] = {};
                const computedStyles = window.getComputedStyle(linkText);
                ELEMENT_PROPERTIES.forEach((property) => {
                    floatingLinkTextInitialStyles[id][property] = computedStyles.getPropertyValue(property);
                });
            }
        });
    }

    function captureInitialFloatingPlusIconStyles() {
        const plusIcons = [linkPlusIcon4, linkPlusIcon7, linkPlusIcon10, linkPlusIcon16, linkPlusIcon19, linkPlusIcon22];
        plusIcons.forEach((plusIcon) => {
            if (plusIcon) {
                const id = plusIcon.id;
                floatingPlusIconInitialStyles[id] = {};
                const computedStyles = window.getComputedStyle(plusIcon);
                ELEMENT_PROPERTIES.forEach((property) => {
                    floatingPlusIconInitialStyles[id][property] = computedStyles.getPropertyValue(property);
                });
            }
        });
    }

    function slideLateralLabels(bool) {
        if (bool) {
            leftLabel.style.transform = "translateX(0)";
            rightLabel.style.transform = "translateX(0) scaleX(-1)";
        } else {
            leftLabel.style.transform = "translateX(-1200px)";
            rightLabel.style.transform = "translateX(1200px) scaleX(-1)";
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
            const defaultDelay = 200; // 200ms delay between each shape

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
                    console.warn(`⚠️ Circle item ${i} not found.`);
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
                                floatingLinkContainer.style.top = settledPositions[`floating-link-container--${i}`].top;
                                floatingLinkContainer.style.left = settledPositions[`floating-link-container--${i}`].left;
                                floatingLinkContainer.style.right = ''; // Reset opposite property
                                floatingLinkContainer.style.bottom = ''; // Reset opposite property
                                if (settledPositions[`floating-link-container--${i}`].transform) {
                                    floatingLinkContainer.style.transform = settledPositions[`floating-link-container--${i}`].transform;
                                }
                            } else if (i === 7) {
                                // Move to the top for item 7
                                floatingLinkContainer.style.top = settledPositions[`floating-link-container--${i}`].top;
                                floatingLinkContainer.style.left = settledPositions[`floating-link-container--${i}`].left;
                                floatingLinkContainer.style.right = ''; // Reset opposite property
                                floatingLinkContainer.style.bottom = ''; // Reset opposite property
                                if (settledPositions[`floating-link-container--${i}`].transform) {
                                    floatingLinkContainer.style.transform = settledPositions[`floating-link-container--${i}`].transform;
                                }
                            } else if (i === 16 || i === 22) {
                                // Move to the bottom for items 16, 22
                                floatingLinkContainer.style.bottom = settledPositions[`floating-link-container--${i}`].bottom;
                                floatingLinkContainer.style.right = settledPositions[`floating-link-container--${i}`].right;
                                floatingLinkContainer.style.top = ''; // Reset opposite property
                                floatingLinkContainer.style.left = ''; // Reset opposite property
                                if (settledPositions[`floating-link-container--${i}`].transform) {
                                    floatingLinkContainer.style.transform = settledPositions[`floating-link-container--${i}`].transform;
                                }
                            } else if (i === 19) {
                                // Move to the bottom for item 19
                                floatingLinkContainer.style.bottom = settledPositions[`floating-link-container--${i}`].bottom;
                                floatingLinkContainer.style.left = settledPositions[`floating-link-container--${i}`].left;
                                floatingLinkContainer.style.top = ''; // Reset opposite property
                                floatingLinkContainer.style.right = ''; // Reset opposite property
                                if (settledPositions[`floating-link-container--${i}`].transform) {
                                    floatingLinkContainer.style.transform = settledPositions[`floating-link-container--${i}`].transform;
                                }
                            }
                        } else {
                            console.warn(`⚠️ Floating link container #floating-link-container--${i} not found.`);
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
            }, 24 * defaultDelay); // Total delay for all 24 items
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
        captureInitialFloatingLinkTextStyles();
        captureInitialFloatingPlusIconStyles();

        slideLateralLabels(false)

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
