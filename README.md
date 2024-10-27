# Project Overview

This project is designed to be installed on a WordPress site.

## Design

- **Adobe XD Link:** [View Design](https://xd.adobe.com/view/50c769fe-8a56-4936-8238-87aeee3a3658-0594/screen/94e615a1-4be8-4c1a-bae1-3b8fe8cfac10/?fullscreen)

## Typography

- **Font:** Mundial
  - **Weights:** Light and Demibold

## Timeline

- **Start Date:** October 23, 2024
- **Deadline:** December 23 (2 months)

# Project Overview

This project integrates a custom WordPress theme with a unique landing animation. The theme design and interactive animations create a high-impact user experience, aligning closely with the layout and style defined in Adobe XD. Key architectural decisions aim to optimize loading, enhance maintainability, and streamline user interactions.

## Design and Development Summary

### Architecture and Page Flow
- **Intro Page (`/intro`)**: Introduces users to the site through an engaging landing animation that only plays on their first visit, controlled by the `introSeen` local storage flag. The page uses a custom PHP template (`intro.php`) that queues a dedicated JavaScript animation file, `land-animation.js`.
- **Homepage (`/`)**: After the intro animation, users are redirected to the homepage. The homepage template (`front-page.php`) does not queue `land-animation.js` to avoid redundant animations, ensuring a smooth user experience.

### Key Functional Elements
- **Local Storage Control**: The `introSeen` flag in local storage determines whether a user has previously viewed the animation. When set, it skips the intro page and loads the homepage directly.
- **JavaScript Modularity**: Custom JavaScript files are enqueued conditionally:
  - `land-animation.js` is restricted to the `/intro` page and includes animation logic and redirection to `/` once complete.
  - **Future Scalability**: Any additional site-wide scripts, such as a URL controller, could be added to handle navigation seamlessly.

### Theme and Style
- **Typography and Fonts**: The theme uses the **Mundial** font in Light and Demibold weights for a consistent style across all pages.
- **Clean CSS Structure**: Styles are modularized by function and page (e.g., `header.css`, `land-animation.css`), which enhances maintainability and readability.

### Installation Requirements
This WordPress theme is designed for easy installation and customization through the WordPress dashboard, with template assignment options to activate the landing animation.

---

This setup provides a smooth user experience, guiding users seamlessly from an introductory animation to the main content. Let me know if you'd like to expand on any part of this overview!
