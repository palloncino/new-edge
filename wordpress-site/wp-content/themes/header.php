<!DOCTYPE html>
<html <?php language_attributes(); ?> <?php generic_schema_type(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php is_single() ? esc_html(wp_strip_all_tags(get_the_excerpt(), true)) : bloginfo('description'); ?>">
    <meta name="keywords" content="<?php echo esc_html(implode(', ', wp_get_post_tags(get_the_ID(), ['fields' => 'names']))); ?>">
    <meta property="og:image" content="<?php is_single() && has_post_thumbnail() ? the_post_thumbnail_url('full') : (has_site_icon() ? esc_url(get_site_icon_url()) : ''); ?>">
    <meta name="twitter:card" content="photo">
    <meta name="twitter:site" content="<?php bloginfo('name'); ?>">
    <meta name="twitter:title" content="<?php is_single() ? the_title() : bloginfo('name'); ?>">
    <meta name="twitter:description" content="<?php is_single() ? esc_html(wp_strip_all_tags(get_the_excerpt(), true)) : bloginfo('description'); ?>">
    <meta name="twitter:image" content="<?php is_single() && has_post_thumbnail() ? the_post_thumbnail_url('full') : (has_site_icon() ? esc_url(get_site_icon_url()) : ''); ?>">
    <meta name="twitter:url" content="<?php is_single() ? esc_url(the_permalink()) : esc_url(home_url()) . '/'; ?>">
    <link rel="canonical" href="<?php echo esc_url('https://' . $_SERVER['HTTP_HOST'] . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)); ?>">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org/",
        "@type": "Organization",
        "name": "<?php bloginfo('name'); ?>",
        "url": "<?php echo esc_url(home_url('/')); ?>",
        "logo": "<?php if (has_custom_logo()) { $logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full'); echo esc_url($logo[0]); } ?>",
        "image": "<?php if (has_site_icon()) { echo esc_url(get_site_icon_url()); } ?>",
        "description": "<?php bloginfo('description'); ?>"
    }
    </script>

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="wrapper">
    <!-- Load Custom Header Template -->
    <?php get_template_part('template-parts/header-custom'); ?>
    
    <div id="container">
        <main id="content">
