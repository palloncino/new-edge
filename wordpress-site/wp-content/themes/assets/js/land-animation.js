const FIXED_BACKGROUND = document.getElementById('intro-fixed-background'); 

const EDGE_HEADER = document.getElementById('edge-header');
const HEADER_LOGO_CONTAINER = document.getElementById('header-logo-container');
const HEADER_LINKS_CONTAINER = document.querySelector('.page-template-intro .edge-header .header-navigation-links-container');

const LOGO_CONTAINER = document.getElementById('intro-header-logo-container');
const LOGO_CONTAINER_EDGE_IMG = document.getElementById('intro-header-logo-img');
const LOGO_CONTAINER_EDGE_H1 = document.getElementById('intro-header-logo-edge');

const TEXT_CONTAINER = document.getElementById('text-container');
const YOUR_CARE = document.getElementById('YOUR_CARE');
const UNLIMITED = document.getElementById('UNLIMITED');

const FinalButtonRow = document.getElementById('intro-start-button-container-row');
const FinalButtonContainer = document.getElementById('intro-start-button-container');

let selectedShape = null;

const FADE_IN_DURATION = "1s";
const ANIMATION_DURATION = "3s";
const ANIMATION_DELAY = "1s";
const POST_ANIMATION_PAUSE = 1000;
const RAIL_HEIGHT_GAP = 48;
const ANIMATION_TOTAL_DURATION = 5000;
const FINAL_SHAPE_HEIGHT = 50;
const LOGO_CONTAINER_WIDTH = 150;
const LOGO_CONTAINER_HEIGHT = 250;

// Set CSS variables for durations
document.documentElement.style.setProperty('--FADE_IN_DURATION', FADE_IN_DURATION);
document.documentElement.style.setProperty('--ANIMATION_DURATION', ANIMATION_DURATION);
document.documentElement.style.setProperty('--ANIMATION_DELAY', ANIMATION_DELAY);

function getCenteredOrangeShape() {
    const viewportCenter = window.innerWidth / 2;

    const rail2 = document.querySelector('.rail-2');
    const shapes = rail2.querySelectorAll('img');

    let closestDistance = Infinity;

    shapes.forEach((shape) => {
        if (shape.src.includes('orange')) {
            const shapeRect = shape.getBoundingClientRect();
            const shapeCenter = shapeRect.left + shapeRect.width / 2;

            const distanceFromCenter = Math.abs(viewportCenter - shapeCenter);

            if (distanceFromCenter < closestDistance) {
                selectedShape = shape;
                closestDistance = distanceFromCenter;
            }
        }
    });

    if (selectedShape) {
        selectedShape.id = 'selectedOrangeShape';
    }

    enterSecondPhase();
}

function enterSecondPhase() {
    const clonedShape = selectedShape.cloneNode(true);
    document.body.appendChild(clonedShape);

    const selectedShapeRect = selectedShape.getBoundingClientRect();

    clonedShape.style.position = 'absolute';
    clonedShape.style.top = `${selectedShapeRect.top}px`;
    clonedShape.style.left = `${selectedShapeRect.left}px`;
    clonedShape.style.width = `${selectedShapeRect.width}px`;
    clonedShape.style.height = `${selectedShapeRect.height}px`;
    clonedShape.style.transform = 'none';
    clonedShape.style.transition = 'none';

    const rails = document.querySelectorAll('.rail');
    rails.forEach((rail) => {
        rail.querySelectorAll('img').forEach((img) => {
            if (img !== selectedShape) {
                img.style.transition = `opacity ${FADE_IN_DURATION} ease-in-out`;
                img.style.opacity = '0';
            }
        });
    });

    setTimeout(() => {
        rails.forEach((rail) => {
            if (!rail.contains(selectedShape)) {
                rail.style.display = 'none';
            }
        });

        selectedShape.style.display = 'none';

        enterThirdPhase(clonedShape);
    }, POST_ANIMATION_PAUSE);
}

function enterThirdPhase(selectedOrangeShape) {
    const introBackground = document.querySelector('.intro-fixed-background');
    const rails = document.querySelectorAll('.rail-container');
    rails.forEach(rail => rail.remove());

    const logoRect = LOGO_CONTAINER.getBoundingClientRect();
    const selectedShapeRect = selectedOrangeShape.getBoundingClientRect(); // Get the original position of the shape

    // Create a new relative container positioned exactly at the logo container's position
    const relativeContainer = document.createElement('div');
    relativeContainer.style.position = 'absolute'; // Absolute based on the document
    relativeContainer.style.top = `${logoRect.top + window.scrollY}px`;
    relativeContainer.style.left = `${logoRect.left + window.scrollX}px`;
    relativeContainer.style.width = `${logoRect.width}px`;
    relativeContainer.style.height = `${logoRect.height}px`;
    relativeContainer.style.zIndex = '1000'; // To make sure it's above other elements

    document.body.appendChild(relativeContainer); // Append the new container to the body

    // Place the orange shape inside the new container, keeping its original position
    selectedOrangeShape.style.position = 'absolute'; // Make it absolute in the new container
    selectedOrangeShape.style.top = `${selectedShapeRect.top - logoRect.top}px`; // Keep its relative position
    selectedOrangeShape.style.left = `${selectedShapeRect.left - logoRect.left}px`;
    selectedOrangeShape.style.width = `${selectedShapeRect.width}px`;
    selectedOrangeShape.style.height = `${selectedShapeRect.height}px`;

    relativeContainer.appendChild(selectedOrangeShape); // Append the orange shape to the new container

    // Force layout recalculation before applying transition
    getComputedStyle(selectedOrangeShape).top;

    // Trigger the transition smoothly
    requestAnimationFrame(() => {
        selectedOrangeShape.style.transition = 'all 1s ease-in-out';

        // Move the shape to the final position
        selectedOrangeShape.style.top = '43.69%';
        selectedOrangeShape.style.left = '19.5%';
        selectedOrangeShape.style.width = `${LOGO_CONTAINER_WIDTH}px`; // Target width
        selectedOrangeShape.style.height = '55px'; // Target height

        YOUR_CARE.style.opacity = '0';
        UNLIMITED.style.opacity = '0';
    });

    setTimeout(() => {
        LOGO_CONTAINER.style.opacity = '1';
        TEXT_CONTAINER.style.opacity = '1';
    }, 1000);

    setTimeout(() => {
        YOUR_CARE.style.opacity = '1';
        selectedOrangeShape.style.opacity = '0';
    }, 2000);

    setTimeout(() => {
        UNLIMITED.style.opacity = '1';
    }, 3000);


    setTimeout(() => {
        enterFourthPhase();
    }, 4000);
}

function enterFourthPhase() {
    const textContainerH1 = document.getElementById('text-container__h1');

    const headerLogoRect = HEADER_LOGO_CONTAINER.getBoundingClientRect();
    const selectedOrangeShape = document.getElementById('selectedOrangeShape');
    selectedOrangeShape.style.display = 'none';

    // Reset logoContainer properties to match headerLogoRect
    LOGO_CONTAINER.style.transform = 'none';
    LOGO_CONTAINER.style.position = 'fixed';
    LOGO_CONTAINER.style.top = `${headerLogoRect.top}px`;
    LOGO_CONTAINER.style.left = `${headerLogoRect.left}px`;
    LOGO_CONTAINER.style.width = `${headerLogoRect.width}px`;
    LOGO_CONTAINER.style.height = `${headerLogoRect.height}px`;

    LOGO_CONTAINER_EDGE_H1.style.fontSize = '24px';
    LOGO_CONTAINER_EDGE_H1.style.marginTop = '16px';

    HEADER_LOGO_CONTAINER.style.opacity = '.0';

    FIXED_BACKGROUND.style.transition = 'background 1s';
    FIXED_BACKGROUND.style.background = '#F7F7F7';

    EDGE_HEADER.style.transition = 'opacity 1s';
    EDGE_HEADER.style.opacity = '1';

    HEADER_LINKS_CONTAINER.style.transition = 'opacity 1s';
    HEADER_LINKS_CONTAINER.style.opacity = '1';

    // Reset textContainer and textContainerH1 styles
    TEXT_CONTAINER.style.left = `200px`;
    TEXT_CONTAINER.style.height = `auto`;
    textContainerH1.style.fontSize = `150px`;
    textContainerH1.style.lineHeight = `150px`;


    FinalButtonRow.style.position = 'relative';
    FinalButtonRow.style.opacity = 1;

    FinalButtonRow.style.display = 'flex';
    FinalButtonRow.style.transition = 'all 1s';
    FinalButtonRow.style.transform = 'translateX(0%)';

}

function applyAnimationPauseAndSelectShape() {
    setTimeout(() => {
        getCenteredOrangeShape();
    }, ANIMATION_TOTAL_DURATION);
}

function calculateAndSetRailHeight() {
    const viewportHeight = window.innerHeight;
    const railHeight = (viewportHeight - (3 * RAIL_HEIGHT_GAP)) / 4;
    const railContainers = document.querySelectorAll('.rail-container');
    railContainers.forEach(container => {
        container.style.height = `${railHeight}px`;
    });
}

function populateRails() {
    const rails = document.querySelectorAll('.rail');

    rails.forEach((rail, index) => {
        for (let i = 0; i < 30; i++) {
            const img = document.createElement('img');

            if (index === 0 || index === 2) {
                img.src = (i % 2 === 0) ? `${themeData.templateDirectoryUri}/assets/svgs/shape-3-violet.svg` : `${themeData.templateDirectoryUri}/assets/svgs/shape-2-lightblue.svg`;
                if (img.src.includes('lightblue')) {
                    img.classList.add('rotate-180');
                }
            } else if (index === 1 || index === 3) {
                img.src = (i % 2 === 0) ? `${themeData.templateDirectoryUri}/assets/svgs/shape-3-pink.svg` : `${themeData.templateDirectoryUri}/assets/svgs/shape-2-orange.svg`;
                if (img.src.includes('pink')) {
                    img.classList.add('rotate-180');
                }
            }

            img.alt = 'Shape';
            rail.appendChild(img);
        }
    });
}

function setInitialRailPositions() {
    const rails = document.querySelectorAll('.rail');
    rails.forEach((rail, index) => {
        // Set initial position based on direction
        if (index % 2 === 0) {
            rail.style.transform = 'translateX(0)'; // For left-moving rails
        } else {
            rail.style.transform = 'translateX(-50%)'; // For right-moving rails
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the intro page by looking for an element unique to it
    const introPageElement = document.getElementById('intro-header-logo-container');
    if (!introPageElement) {
        // Exit if not on the intro page
        return;
    }

    // Check if the animation should be skipped
    const skipAnimation = localStorage.getItem("introSeen");
    if (skipAnimation) {
        window.location.href = "/";
        return;
    }

    try {
        // Animation setup
        setInitialRailPositions();
        calculateAndSetRailHeight();
        populateRails();
        applyAnimationPauseAndSelectShape();

        // Set `introSeen` after the animation finishes and redirect to `/`
        const animationDuration = 12000;
        setTimeout(() => {
            localStorage.setItem("introSeen", "true");
            window.location.href = "/";
        }, animationDuration);

    } catch (error) {
        console.error("Animation setup error:", error);
    }
});

