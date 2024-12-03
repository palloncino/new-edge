document.addEventListener("DOMContentLoaded", () => {

    // Add initial state class immediately
    document.body.classList.add('labels-initial-state');

    const floatingBackButton = document.getElementById("section-1-the-group-back-button");
    const circleInnerContainer = document.getElementById("circle_inner_container");
    const centralLogo = document.getElementById("section-1-the-group--central-logo");
    const centralLogoHover = document.getElementById("section-1-the-group--central-logo-hover");

    const linkContainer1 = document.getElementById('floating-link-container--1');
    const linkContainer3 = document.getElementById('floating-link-container--3');
    const linkContainer5 = document.getElementById('floating-link-container--5');
    const linkContainer7 = document.getElementById('floating-link-container--7');
    const linkContainer9 = document.getElementById('floating-link-container--9');
    const linkContainer11 = document.getElementById('floating-link-container--11');

    const linkTitle1 = document.getElementById("section-1-the-group-floating-link-text--1");
    const linkTitle3 = document.getElementById("section-1-the-group-floating-link-text--3");
    const linkTitle5 = document.getElementById("section-1-the-group-floating-link-text--5");
    const linkTitle7 = document.getElementById("section-1-the-group-floating-link-text--7");
    const linkTitle9 = document.getElementById("section-1-the-group-floating-link-text--9");
    const linkTitle11 = document.getElementById("section-1-the-group-floating-link-text--11");

    const linkPlusIcon1 = document.getElementById("section-1-the-group-floating-link-plus-icon--1");
    const linkPlusIcon3 = document.getElementById("section-1-the-group-floating-link-plus-icon--3");
    const linkPlusIcon5 = document.getElementById("section-1-the-group-floating-link-plus-icon--5");
    const linkPlusIcon7 = document.getElementById("section-1-the-group-floating-link-plus-icon--7");
    const linkPlusIcon9 = document.getElementById("section-1-the-group-floating-link-plus-icon--9");
    const linkPlusIcon11 = document.getElementById("section-1-the-group-floating-link-plus-icon--11");

    const floatingLinksContainersMap = {
        'floating-link-container--1': linkContainer1,
        'floating-link-container--3': linkContainer3,
        'floating-link-container--5': linkContainer5,
        'floating-link-container--7': linkContainer7,
        'floating-link-container--9': linkContainer9,
        'floating-link-container--11': linkContainer11,
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

    const floatingLinkSettledPositions = {
        'floating-link-container--1': { // H2O // R => L
            top: "180px",
            left: "442px",
        },
        'floating-link-container--3': { // La quindicesima // R => L
            top: "420px",
            left: "310px",
        },
        'floating-link-container--5': { // Z&M // L => R
            top: "420px",
            left: "0px",
        },
        'floating-link-container--7': { // Risk // L => R
            top: "180px",
            left: "-180px",
        },
        'floating-link-container--9': { // Edge, il broker // L => R
            top: "-50px",
            left: "-130px",
        },
        'floating-link-container--11': { // Bind // R => L
            top: "-50px",
            left: "310px",
        },
    };

    let activeId = undefined;

    // Tracking variables for active timeouts and aborting animations
    let activeTimeouts = [];
    let animationAborted = false;

    const linksContainers = [linkContainer1, linkContainer3, linkContainer5, linkContainer7, linkContainer9, linkContainer11];
    linksContainers.forEach((link) => {
        if (link) {
            const linkId = parseInt(link.id.split('--')[1]);
            link.querySelector('.section-1-the-group-floating-link-plus-icon').addEventListener('click', () => move(linkId));
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

        slideBackBtn(false)
        slideImage(activeId, false);
        slideParagraph(activeId, false);
        resetPositionInnerCircle();
        restoreFloatingLinksContainers();
        moveSelectedTitleCompoundLink(activeId, false)
        resetExtraRotationCircleItem1();

        // Reset any added classes or state variables
        document.body.classList.add('labels-initial-state');

        // Reset active ID
        activeId = undefined;

        // Reset the abort flag
        animationAborted = false;
    }

    function move(id) {
        activeId = id;

        // Hide all other floating links except the selected one
        hideFloatingLinksContainers(id);
        
        // Move the link and plus icon, with the container also
        moveSelectedTitleCompoundLink(id, true);

        // Transform the inner circle for the selected item
        rotateInnerCircleOnSelection();

        // Circle item one has a 360deg extra rotation
        extraRotationCircleItem1()

        // Slide in the labels and back button
        slideBackBtn(true);

        // Step 4: Animate the selected floating link and its text
        slideParagraph(id, true);
        slideImage(id, true);
    }

    function restoreFloatingLinksContainers() {

        for (const [id, element] of Object.entries(floatingLinksContainersMap)) {
            if (element) {
                const positions = floatingLinkSettledPositions[id] || {};

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
                const textElement = element.querySelector('.section-1-the-group-floating-link-text');
                if (textElement) {
                    textElement.style.fontSize = "1.4rem"; // Normal size
                    textElement.style.lineHeight = "1.6rem"; // Normal line height
                }

            } else {
                console.warn(`⚠️ Cannot restore ${id}. Element missing.`);
            }
        }

    }

    function resetExtraRotationCircleItem1() {
        const circleItem = document.querySelector('.circle-item-1 .inner-container');
        if (circleItem) {
            circleItem.style.transition = "none";
            circleItem.style.transform = "rotate(180deg)";
        } else {
            console.warn("⚠️ circle-item-1 .inner-container not found.");
        }
    }

    function extraRotationCircleItem1() {
        const circleItem = document.querySelector('.circle-item-1 .inner-container');
        if (circleItem) {
            circleItem.style.transition = "transform 1.5s";
            circleItem.style.transform = "rotate(535deg)";
        } else {
            console.warn("⚠️ circle-item-1 .inner-container not found.");
        }
    }

    function moveSelectedTitleCompoundLink(id, slideIn) {
        
        const selectedLinkContainer = document.getElementById(`floating-link-container--${id}`);
        const selectedLinkPlusIcon = document.getElementById(`section-1-the-group-floating-link-plus-icon--${id}`);
        const selectedLinkTitle = document.getElementById(`section-1-the-group-floating-link-text--${id}`);

        if (selectedLinkTitle && selectedLinkContainer) {
            if (slideIn) {

                selectedLinkPlusIcon.style.visibility = 'hidden'
                // Make the text larger for the selected link
                selectedLinkTitle.style.position = "absolute";
                selectedLinkTitle.style.fontSize = "3.6rem";
                selectedLinkTitle.style.lineHeight = "3.6rem";

                // Set specific top and left values based on the link number
                switch (id) {
                    case 1:
                        selectedLinkContainer.style.top = "-20px";
                        selectedLinkContainer.style.left = "-120px";
                        break;
                    case 3:
                        selectedLinkContainer.style.top = "-20px";
                        selectedLinkContainer.style.left = "-120px";
                        break;
                    case 5:
                        selectedLinkContainer.style.top = "-20px";
                        selectedLinkContainer.style.left = "-110px";
                        break;
                    case 7:
                        selectedLinkContainer.style.top = "0px";
                        selectedLinkContainer.style.left = "-110px";
                        break;
                    case 9:
                        selectedLinkContainer.style.top = "0px";
                        selectedLinkContainer.style.left = "-110px";
                        break;
                    case 11:
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
            floatingBackButton.style.left = "-110px";
        } else {
            floatingBackButton.style.left = "-1200px";
        }
    }

    function slideParagraph(id, slideIn) {
        const paragraph = document.getElementById(`section-1-the-group-floating-paragraph--${id}`);
        if (slideIn) {
            paragraph.style.top = "100px";
            paragraph.style.left = "-110px";
        } else {
            paragraph.style.top = "1200px";
            paragraph.style.left = "-110px";
        }
    }

    function slideImage(id, slideIn) {
        const image = document.getElementById(`section-1-the-group-floating-image--${id}`);
        if (slideIn) {
            image.style.right = "0px";
            image.style.bottom = "0px";
        } else {
            image.style.right = "-1200px";
            image.style.bottom = "0px";
        }
    }

    function hideFloatingLinksContainers(exceptId) {
        for (const [id, element] of Object.entries(floatingLinksContainersMap)) {
            if (id !== `floating-link-container--${exceptId}` && element && initialFloatingLinksContainersStyles[id]) {
                ['top','left'].forEach(property => {
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
                const resetTransform = "rotate(180deg)";
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
        const linkTexts = [linkTitle1, linkTitle3, linkTitle5, linkTitle7, linkTitle9, linkTitle11];
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
        const plusIcons = [linkPlusIcon1, linkPlusIcon3, linkPlusIcon5, linkPlusIcon7, linkPlusIcon9, linkPlusIcon11];
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

    function phaseOne() {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (animationAborted) {
                    // Apply all pending style changes immediately
                    applyPhaseTwoFinalStyles();
                    resolve();
                    return;
                }
                
                const blueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-2-blue.svg")';
                const lightBlueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-2-lightblue.svg")';

                // Special cases: Only adjust the inner-container for outward orientation
                const specialCases = {
                    1: 180,
                    3: 180,
                    5: 180,
                    7: 180,
                    9: 180,
                    11: 180,
                };
        
                // Collect all circle items
                for (let i = 1; i <= 12; i++) {
                    const parentItem = document.querySelector(`.circle-item-${i}`);
                    const item = document.querySelector(`.circle-item-${i} .inner-container`);
        
                    if (!parentItem || !item) {
                        console.warn(`⚠️ Circle item ${i} not found.`);
                        continue;
                    }
        
                    // Apply styles to circle items with a 1s transition
                    applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, blueBackground);
                }
        
                resolve();
            }, 500);
        });
    }

    function applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, blueBackground) {
        item.style.transition = "background-image 1s, transform 1s";
        if (specialCases[i] !== undefined) {
            // Apply light blue background and outward rotation
            item.style.backgroundImage = lightBlueBackground;
            item.style.transform = `rotate(${specialCases[i]}deg)`;
    
            // Move the floating link containers if necessary
            moveFloatingLinkContainer(i);
        } else {
            // Apply blue background for default cases
            item.style.backgroundImage = blueBackground;
        }
    }
    
    function moveFloatingLinkContainer(i) {
        const floatingLinkContainer = document.getElementById(`floating-link-container--${i}`);
    
        if (floatingLinkContainer) {
            const positions = floatingLinkSettledPositions[`floating-link-container--${i}`] || {};
    
            // Apply transition duration
            floatingLinkContainer.style.transition = `all 1s`;
    
            // Apply settled positions
            floatingLinkContainer.style.top = positions.top;
            floatingLinkContainer.style.bottom = positions.bottom;
            floatingLinkContainer.style.left = positions.left;
            floatingLinkContainer.style.right = positions.right;
            floatingLinkContainer.style.transform = positions.transform;
        } else {
            console.warn(`⚠️ Floating link container #floating-link-container--${i} not found.`);
        }
    }

    function applyPhaseTwoFinalStyles() {
        const blueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-orange.svg")';
        const lightBlueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-lightblue.svg")';
    
        const specialCases = {
            1: 275,
            3: 275,
            5: 275,
            7: 265,
            9: 275,
            11: 275,
        };
    
        for (let i = 1; i <= 12; i++) {
            const parentItem = document.querySelector(`.circle-item-${i}`);
            const item = document.querySelector(`.circle-item-${i} .inner-container`);
    
            if (!parentItem || !item) {
                console.warn(`⚠️ Circle item ${i} not found.`);
                continue;
            }
    
            applyStyleToCircleItem(i, item, specialCases, lightBlueBackground, blueBackground);
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


        await phaseOne();
        if (animationAborted) return; // Exit if aborted
    }

    // Start the animation with a slight delay to ensure initial states are applied
    const initialTimeout = setTimeout(startAnimation, 0);
    activeTimeouts.push(initialTimeout);
});
