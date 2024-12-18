<?php
/* Template Name: Intro - Landing Animation */
get_header(); // Includes the main header.php with <head> and opening <body>

// Enqueue the land-animation.css specifically for this template
wp_enqueue_style('land-animation-css', get_template_directory_uri() . '/assets/css/land-animation.css');
?>


<!-- Inject the custom header using the template part for reusability -->
<?php get_template_part('template-parts/header-custom'); ?>

<div id="intro-fixed-background" class="intro-fixed-background">
    <div id="intro-header-logo-container" class="intro-header-logo-container">
        <img class="intro-header-logo-img" id="intro-header-logo-img" src="<?php echo get_template_directory_uri(); ?>/assets/svgs/logo.svg" alt="Edge" />
        <h1 class="intro-header-logo-edge" id="intro-header-logo-edge">edge</h1>
    </div>

    <div id="text-container">
        <h1 class="Heading" id="text-container__h1">
            <span id="YOUR_CARE">YOUR CARE,</span><br />
            <span id="UNLIMITED">UNLIMITED</span>
        </h1>
    </div>

    <div id="intro-start-button-container-row">
        <div id="intro-start-button-container">
            <span id="intro-start-button">inizia</span>
        </div>
    </div>

    <!-- Rail Containers for the Marquee Effect -->
    <div class="rail-container">
        <div class="marquee-wrapper">
            <div class="rail rail-1 move-left"></div>
        </div>
    </div>
    <div class="rail-container">
        <div class="marquee-wrapper">
            <div class="rail rail-2 move-right"></div>
        </div>
    </div>
    <div class="rail-container">
        <div class="marquee-wrapper">
            <div class="rail rail-3 move-left"></div>
        </div>
    </div>
    <div class="rail-container">
        <div class="marquee-wrapper">
            <div class="rail rail-4 move-right"></div>
        </div>
    </div>
</div>

<?php
get_footer(); // Includes footer.php and wp_footer()
?>
