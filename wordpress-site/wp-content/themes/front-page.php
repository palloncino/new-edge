<?php
/* Template Name: Homepage - Front Page */
get_header(); // Includes the main header.php with <head> and opening <body>
?>

<div class="app-container front-page">
    <!-- Inject the custom header using the template part for reusability -->
    <?php get_template_part('template-parts/header-custom'); ?>
</div>

<?php
get_footer(); // Includes footer.php and wp_footer()
?>
