document.addEventListener("DOMContentLoaded", () => {

    // Add initial state class immediately
    document.body.classList.add('labels-initial-state');

    const floatingBackButton = document.getElementById("section-1-what-we-do-back-button");
    const circleInnerContainer = document.getElementById("circle_inner_container");
    const centralLogo = document.getElementById("section-1-what-we-do--central-logo");
    const centralLogoHover = document.getElementById("section-1-what-we-do--central-logo-hover");

    const leftLabel = document.querySelector('.section-1-what-we-do__big-svg--left');
    const rightLabel = document.querySelector('.section-1-what-we-do__big-svg--right');

    const linkContainer4 = document.getElementById('floating-link-container--4');
    const linkContainer7 = document.getElementById('floating-link-container--7');
    const linkContainer10 = document.getElementById('floating-link-container--10');
    const linkContainer16 = document.getElementById('floating-link-container--16');
    const linkContainer19 = document.getElementById('floating-link-container--19');
    const linkContainer22 = document.getElementById('floating-link-container--22');

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

    const floatingLinksContainersMap = {
        'floating-link-container--4': linkContainer4,
        'floating-link-container--7': linkContainer7,
        'floating-link-container--10': linkContainer10,
        'floating-link-container--16': linkContainer16,
        'floating-link-container--19': linkContainer19,
        'floating-link-container--22': linkContainer22,
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
    const initialFloatingLinksContainersStyles = {};
    const floatingLinkTextInitialStyles = {};
    const floatingPlusIconInitialStyles = {};
    const settledFloatingLinksContainersStyles = {};

    let activeId = undefined;

    // Tracking variables for active timeouts and aborting animations
    let activeTimeouts = [];
    let animationAborted = false;

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

    const linksContainers = [linkContainer4, linkContainer7, linkContainer10, linkContainer16, linkContainer19, linkContainer22];
    linksContainers.forEach((link) => {
        if (link) {
            const linkId = parseInt(link.id.split('--')[1]);
            link.querySelector('.section-1-what-we-do-floating-link-plus-icon').addEventListener('click', () => move(linkId));
        }
    });

    centralLogo.addEventListener('mouseenter', () => hoverLogo(true));
    centralLogo.addEventListener('mouseleave', () => hoverLogo(false));

    function hoverLogo(isHovering) {
        if (!activeId) {
            if (isHovering) {
                centralLogoHover.style.transition = "all .2s"
                centralLogoHover.style.opacity = 1;
                centralLogo.style.transition = "all .2s"
                centralLogo.style.opacity = 0;
            } else {
                centralLogoHover.style.transition = "all .2s"
                centralLogoHover.style.opacity = 0;
                centralLogo.style.transition = "all .2s"
                centralLogo.style.opacity = 1;
            }
        }
    }


    if (floatingBackButton) {
        floatingBackButton.addEventListener('click', backToInitialState);
    }

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
        restoreFloatingLinksContainers();
        moveSelectedTitleCompoundLink(activeId, false)

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

        applyPhaseTwoFinalStyles();

        // Step 1: Hide all other floating links except the selected one
        hideFloatingLinksContainers(id);
        
        moveSelectedTitleCompoundLink(id, true);

        // Step 2: Transform the inner circle for the selected item
        rotateInnerCircleOnSelection();

        // Step 3: Slide in the labels and back button
        slideLateralLabels(0);
        slideBackBtn(true);

        // Step 4: Animate the selected floating link and its text
        slideParagraph(id, true);
        slideImage(id, true);

        // Capture settled styles after the animation
        const timeout = setTimeout(() => {
            captureSettledFloatingLinksContainersStyles();
        }, 1000); // Match the transition duration
        activeTimeouts.push(timeout);
    }

    function restoreFloatingLinksContainers() {

        for (const [id, element] of Object.entries(floatingLinksContainersMap)) {
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

    function moveSelectedTitleCompoundLink(id, slideIn) {
        
        const selectedLinkContainer = document.getElementById(`floating-link-container--${id}`);
        const selectedLinkPlusIcon = document.getElementById(`section-1-what-we-do-floating-link-plus-icon--${id}`);
        const selectedLinkTitle = document.getElementById(`section-1-what-we-do-floating-link-text--${id}`);

        if (selectedLinkTitle && selectedLinkContainer) {
            if (slideIn) {

                selectedLinkPlusIcon.style.visibility = 'hidden'
                // Make the text larger for the selected link
                selectedLinkTitle.style.position = "absolute";
                selectedLinkTitle.style.fontSize = "3.6rem";
                selectedLinkTitle.style.lineHeight = "3.6rem";

                // Set specific top and left values based on the link number
                switch (id) {
                    case 4:
                        selectedLinkContainer.style.top = "-20px";
                        selectedLinkContainer.style.left = "-120px";
                        break;
                    case 7:
                        selectedLinkContainer.style.top = "-10px";
                        selectedLinkContainer.style.left = "0px";
                        break;
                    case 10:
                        selectedLinkContainer.style.top = "-20px";
                        selectedLinkContainer.style.right = "280px";
                        break;
                    case 16:
                        selectedLinkContainer.style.top = "0px";
                        selectedLinkContainer.style.right = "285px";
                        break;
                    case 19:
                        selectedLinkContainer.style.top = "0px";
                        selectedLinkContainer.style.left = "0px";
                        break;
                    case 22:
                        selectedLinkContainer.style.top = "0px";
                        selectedLinkContainer.style.left = "-110px";
                        break;
                    default:
                        console.warn(`No specific position defined for link text with id: ${id}`);
                }
            } else {
                selectedLinkPlusIcon.style.visibility = 'visible'
                
                // Reset to normal size
                selectedLinkTitle.style.position = "static";
                selectedLinkTitle.style.fontSize = "1.4rem";
                selectedLinkTitle.style.lineHeight = "1.6rem";
            }
        }
    }

    function slideBackBtn(slideIn) {
        if (slideIn) {
            floatingBackButton.style.left = "370px";
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

    function hideFloatingLinksContainers(exceptId) {
        for (const [id, element] of Object.entries(floatingLinksContainersMap)) {
            if (id !== `floating-link-container--${exceptId}` && element && initialFloatingLinksContainersStyles[id]) {
                ELEMENT_PROPERTIES.forEach(property => {
                    element.style[property] = initialFloatingLinksContainersStyles[id][property];
                });
            }
        }
    }

    function rotateInnerCircleOnSelection() {
        if (circleInnerContainer) {
            // // Add a transition for smooth transformation
            circleInnerContainer.style.transition = "transform 1.5s";
            centralLogo.style.transition = "transform 1.5s";

            // // Apply the desired transformation
            circleInnerContainer.style.transform = "translateX(-1070px) translateY(-175px) scale(3) rotate(5deg)";
            centralLogo.style.transform = "translate(-50%, -50%) rotate(-360deg)";
        }
    }

    function resetPositionInnerCircle() {
        if (circleInnerContainer && initialInnerCircleStyles) {

            // Step 1: Set the transition property to enable smooth animation
            circleInnerContainer.style.transition = "transform .5s";
            centralLogo.style.transition = "transform .5s";

            // Step 2: Force a reflow to ensure the transition property is applied
            void circleInnerContainer.offsetHeight;

            // Step 3: Use requestAnimationFrame to apply the transform in the next frame
            requestAnimationFrame(() => {
                const resetTransform = "rotate(185deg)";
                circleInnerContainer.style.transform = resetTransform;
                centralLogo.style.transform = "translate(-50%, -50%) rotate(-185deg)";
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

    function captureFloatingLinksContainersStyles(targetStyles) {
        for (const [id, element] of Object.entries(floatingLinksContainersMap)) {
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

    function captureInitialFloatingLinksContainersStyles() {
        captureFloatingLinksContainersStyles(initialFloatingLinksContainersStyles);
    }

    function captureSettledFloatingLinksContainersStyles() {
        captureFloatingLinksContainersStyles(settledFloatingLinksContainersStyles);
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
            circleInnerContainer.style.transition = "transform .5s";
            centralLogo.style.transition = "transform .5s";

            // Select the two specific circle items
            const circleItem1Inner = document.querySelector(".circle-item-1 .inner-container");
            const circleItem13Inner = document.querySelector(".circle-item-13 .inner-container");

            if (!circleItem1Inner || !circleItem13Inner) {
                console.warn("One or both of the circle-item-1 or circle-item-13 not found.");
            }

            // Apply transitions and rotations to the two selected items
            if (circleItem1Inner) {
                circleItem1Inner.style.transition = "transform .5s";
                circleItem1Inner.style.transform = "rotate(-85deg)";
            }

            if (circleItem13Inner) {
                circleItem13Inner.style.transition = "transform .5s";
                circleItem13Inner.style.transform = "rotate(-95deg)";
            }

            // Use a slight delay to ensure the initial state is registered
            const timeout1 = setTimeout(() => {
                if (!animationAborted) {
                    circleInnerContainer.style.transform = "rotate(185deg)";
                    centralLogo.style.transform = "translate(-50%, -50%) rotate(-185deg)";
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
                // Apply all pending style changes immediately
                applyPhaseTwoFinalStyles();
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
                    if (animationAborted) {
                        // Apply all pending style changes immediately
                        applyPhaseTwoFinalStyles();
                        resolve();
                        return;
                    }
    
                    applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, orangeBackground);
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

    function applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, orangeBackground) {
        if (specialCases[i] !== undefined) {
            // Apply light blue background and outward rotation
            item.style.transition = "none";
            item.style.backgroundImage = lightBlueBackground;
    
            // Apply outward rotation directly to the inner-container
            item.style.transform = `rotate(${specialCases[i]}deg)`;
    
            // Move the floating link containers if necessary
            moveFloatingLinkContainer(i);
        } else {
            // Apply orange background for default cases
            item.style.transition = "none";
            item.style.backgroundImage = orangeBackground;
        }
    }
    
    function moveFloatingLinkContainer(i) {
        const floatingLinkContainer = document.getElementById(`floating-link-container--${i}`);
    
        if (floatingLinkContainer) {
            const positions = settledPositions[`floating-link-container--${i}`] || {};
    
            // Reset all positioning properties first
            floatingLinkContainer.style.top = "";
            floatingLinkContainer.style.left = "";
            floatingLinkContainer.style.right = "";
            floatingLinkContainer.style.bottom = "";
            floatingLinkContainer.style.transform = "";
    
            // Apply settled positions
            if (positions.top !== undefined) floatingLinkContainer.style.top = positions.top;
            if (positions.bottom !== undefined) floatingLinkContainer.style.bottom = positions.bottom;
            if (positions.left !== undefined) floatingLinkContainer.style.left = positions.left;
            if (positions.right !== undefined) floatingLinkContainer.style.right = positions.right;
            if (positions.transform !== undefined) floatingLinkContainer.style.transform = positions.transform;
        } else {
            console.warn(`⚠️ Floating link container #floating-link-container--${i} not found.`);
        }
    }
    
    function applyPhaseTwoFinalStyles() {
        const orangeBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-orange.svg")';
        const lightBlueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-lightblue.svg")';
    
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
    
        for (let i = 1; i <= 24; i++) {
            const parentItem = document.querySelector(`.circle-item-${i}`);
            const item = document.querySelector(`.circle-item-${i} .inner-container`);
    
            if (!parentItem || !item) {
                console.warn(`⚠️ Circle item ${i} not found.`);
                continue;
            }
    
            applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, orangeBackground);
        }
    }

    // Start the animation sequence
    async function startAnimation() {

        // Reset the abort flag
        animationAborted = false;

        // Capture initial styles after DOM is ready
        captureInitialFloatingLinksContainersStyles();
        captureInitialInnerCircleStyles();
        captureInitialFloatingLinkTextStyles();
        captureInitialFloatingPlusIconStyles();

        slideLateralLabels(false)

        await phaseOne();
        if (animationAborted) return; // Exit if aborted

        await phaseTwo();
        if (animationAborted) return; // Exit if aborted

        captureSettledFloatingLinksContainersStyles();
    }

    // Start the animation with a slight delay to ensure initial states are applied
    const initialTimeout = setTimeout(startAnimation, 0);
    activeTimeouts.push(initialTimeout);
});
