<?php
/* Template Name: Page Name */
get_header(); // Includes header.php with the <head> and <body> tags
?>

<div class="app-container page-a-proposito-di-noi">
    <?php get_template_part('template-parts/header-custom'); ?> <!-- Dynamic Header Call -->

    <div class="content-section">
        <!-- Add specific HTML content for this page or keep it dynamic -->
        <?php
        while ( have_posts() ) : the_post();
            the_content();
        endwhile;
        ?>
    </div>
</div>

<?php get_footer(); // Includes footer.php ?>