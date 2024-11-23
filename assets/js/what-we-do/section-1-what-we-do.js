
document.addEventListener("DOMContentLoaded", () => {
    const circleInnerContainer = document.getElementById("circle_inner_container");

    if (!circleInnerContainer) {
        console.error("Element with ID 'circle_inner_container' not found.");
        return;
    }

    // Phase 1: Rotate the circle_inner_container and two specific items simultaneously
    function phaseOne() {
        return new Promise((resolve) => {
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
                console.log("Phase 1: Computed transform after animation", computedStyle.transform);
                resolve();
            }, 1050); // 1s transition + 50ms delay
        });
    }

    // Phase 2: Incrementally change shape backgrounds to orange, starting from 2 to 24, excluding 13
    function phaseTwo() {
        return new Promise((resolve) => {
            const orangeBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-orange.svg")';
            const lightBlueBackground = 'url("https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-3-lightblue.svg")';
            const defaultDelay = 250;

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
                                floatingLinkContainer.style.top = "-60px";
                                floatingLinkContainer.style.bottom = "";
                            } else if (i === 7) {
                                // Move to the top for item 7
                                floatingLinkContainer.style.top = "-150px";
                                floatingLinkContainer.style.bottom = "";
                            } else if (i === 16 || i === 22) {
                                // Move to the bottom for items 16, 22
                                floatingLinkContainer.style.bottom = "-60px";
                                floatingLinkContainer.style.top = ""; // Reset top position
                            } else if (i === 19) {
                                // Move to the bottom for item 19
                                floatingLinkContainer.style.bottom = "-140px";
                                floatingLinkContainer.style.top = ""; // Reset top position
                            }

                            console.log(`Element #floating-link-container--${i} moved to its new position.`);
                        } else {
                            console.warn(`Floating link container #floating-link-container--${i} not found.`);
                        }

                        // Apply light blue background and outward rotation
                        item.style.transition = "none";
                        item.style.backgroundImage = lightBlueBackground;

                        // Apply outward rotation directly to the inner-container
                        item.style.transform = `rotate(${specialCases[i]}deg)`;

                        console.log(`Phase 2: Special case for ${i} (light blue background, outward rotation)`, {
                            backgroundImage: item.style.backgroundImage,
                            transform: item.style.transform,
                        });
                    } else {
                        // Apply orange background for default cases
                        item.style.transition = "none";
                        item.style.backgroundImage = orangeBackground;

                        console.log(`Phase 2: Background applied to ${item.parentElement.className}`, {
                            backgroundImage: item.style.backgroundImage,
                        });
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
        await phaseOne();
        await phaseTwo();
    }

    startAnimation();
});