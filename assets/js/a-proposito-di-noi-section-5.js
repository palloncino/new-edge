document.addEventListener("DOMContentLoaded", () => {
    function setEventListeners() {
        window.addEventListener('resize', adjustLayout);
        window.addEventListener('load', adjustLayout);
    }

    function adjustLayout() {
        const appContainer = document.querySelector('.app-container');
        const header = document.querySelector('.edge-header');
        const firstGridContainer = document.querySelector('.first-grid-container');
        const gridItems = document.querySelectorAll('.grid-item');
        
        const svg_3 = document.querySelector('.svg-background-3');
        const svg_4 = document.querySelector('.svg-background-4');

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        let computedWidth = (16 / 9) * viewportHeight;

        if (computedWidth > viewportWidth) {
            computedWidth = viewportWidth;
        }

        appContainer.style.width = `${computedWidth}px`;
        header.style.width = `${computedWidth}px`;

        const itemWidth = computedWidth / 6 - 10; // 6 items per row, accounting for gaps
        const itemHeight = itemWidth * 1.5; // Aspect ratio of 1:1.5

        firstGridContainer.style.height = `calc(100vh - 130px - 200px)`;
        
        gridItems.forEach(item => {
            item.style.width = `${itemWidth}px`;
            item.style.height = `${itemHeight}px`;
        });

        // adjusting the height and size of the intermediate (relative to section) svgs
        svg_3.style.top = `${itemHeight*1 + 100}px`;
        svg_3.style.height = `${itemHeight*3 - 120}px`;
        svg_4.style.height = `${itemHeight*2 - 100}px`;


    }

    function initialSetup() {
        adjustLayout();
        setEventListeners();
    }

    initialSetup();
});
