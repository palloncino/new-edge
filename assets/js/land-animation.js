const FADE_IN_DURATION = "1s";
const ANIMATION_DURATION = "3s";
const ANIMATION_DELAY = "1s";
const POST_ANIMATION_PAUSE = 1000;
const RAIL_HEIGHT_GAP = 32;
const ANIMATION_TOTAL_DURATION = 5000;
const FINAL_SHAPE_HEIGHT = 50;
const LOGO_CONTAINER_WIDTH = 48;
const LOGO_CONTAINER_HEIGHT = 105;

// Set CSS variables for durations
document.documentElement.style.setProperty('--FADE_IN_DURATION', FADE_IN_DURATION);
document.documentElement.style.setProperty('--ANIMATION_DURATION', ANIMATION_DURATION);
document.documentElement.style.setProperty('--ANIMATION_DELAY', ANIMATION_DELAY);

let selectedShape = null;

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

function enterThirdPhase(shape) {
    const introBackground = document.querySelector('.intro-fixed-background');
    const rails = document.querySelectorAll('.rail-container');
    rails.forEach(rail => rail.remove());

    const headerContainer = document.getElementById('header-container');
    headerContainer.classList.add('container-visible');

    const logoContainer = document.getElementById('logo-container');
    logoContainer.style.opacity = '1';

    const logoRect = logoContainer.getBoundingClientRect();
    const finalTop = logoRect.top + window.scrollY + (logoRect.height / 2) - (FINAL_SHAPE_HEIGHT / 2);
    const finalLeft = logoRect.left + window.scrollX + (logoRect.width / 2) - (LOGO_CONTAINER_WIDTH / 2);

    shape.style.position = 'fixed';
    shape.style.transition = 'top 1s ease-in-out, left 1s ease-in-out, width 1s ease-in-out, height 1s ease-in-out';
    shape.style.top = `${finalTop}px`;
    shape.style.left = `${finalLeft}px`;
    shape.style.width = `${LOGO_CONTAINER_WIDTH}px`;
    shape.style.height = `${FINAL_SHAPE_HEIGHT}px`;

    // Explicitly set the opacity to 1 to ensure it becomes visible
    headerContainer.style.opacity = '1';
    headerContainer.style.visibility = 'visible';

    // Log the moment header becomes visible
    setTimeout(() => {
    }, 1000); // Wait for shape to move to final position before logging
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
        for (let i = 0; i < 15; i++) {
            const img = document.createElement('img');

            if (index === 0 || index === 2) {
                img.src = (i % 2 === 0) ? './assets/svgs/shape-3-violet.svg' : './assets/svgs/shape-2-lightblue.svg';
                if (img.src.includes('lightblue')) {
                    img.classList.add('rotate-180');
                }
            } else if (index === 1 || index === 3) {
                img.src = (i % 2 === 0) ? './assets/svgs/shape-3-pink.svg' : './assets/svgs/shape-2-orange.svg';
                if (img.src.includes('pink')) {
                    img.classList.add('rotate-180');
                }
            }

            img.alt = 'Shape';
            rail.appendChild(img);
        }
    });
}

window.onload = function () {
    calculateAndSetRailHeight();
    populateRails();
    applyAnimationPauseAndSelectShape();
};