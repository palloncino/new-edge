<?php
// Theme setup
add_action('after_setup_theme', 'generic_setup');
function generic_setup() {
    load_theme_textdomain('generic', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', array('search-form', 'navigation-widgets'));
    add_theme_support('appearance-tools');
    add_theme_support('woocommerce');
}

// Enqueue styles and scripts
add_action('wp_enqueue_scripts', 'generic_enqueue');
function generic_enqueue() {
    // Remove unnecessary styles if present
    wp_dequeue_style('generic-style');
    wp_dequeue_style('generic-icons');

    // Enqueue custom styles and scripts
    wp_enqueue_style('font-css', get_template_directory_uri() . '/assets/css/font.css');
    wp_enqueue_style('global-css', get_template_directory_uri() . '/assets/css/global.css');
    wp_enqueue_style('land-animation-css', get_template_directory_uri() . '/assets/css/land-animation.css');
    wp_enqueue_style('header-css', get_template_directory_uri() . '/assets/css/header.css');
    
    wp_enqueue_script('jquery');
    wp_enqueue_script('land-animation-js', get_template_directory_uri() . '/assets/js/land-animation.js', array(), null, true);

    // Pass template directory URI to the script
    wp_localize_script('land-animation-js', 'themeData', array(
        'templateDirectoryUri' => get_template_directory_uri(),
    ));
}

// Footer custom scripts
add_action('wp_footer', 'generic_footer');
function generic_footer() {
?>
<script>
jQuery(document).ready(function($) {
    $(".before").on("focus", function() {
        $(".last").focus();
    });
    $(".after").on("focus", function() {
        $(".first").focus();
    });
    $(".menu-toggle").on("keypress click", function(e) {
        if (e.which == 13 || e.type === "click") {
            e.preventDefault();
            $("#menu").toggleClass("toggled");
            $(".looper").toggle();
        }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            if ($("#menu").hasClass("toggled")) {
                $("#menu").toggleClass("toggled");
            }
        }
    });
    $("img.no-logo").each(function() {
        var alt = $(this).attr("alt");
        $(this).replaceWith(alt);
    });
});
</script>
<?php
}

// Document title separator
add_filter('document_title_separator', 'generic_document_title_separator');
function generic_document_title_separator($sep) {
    $sep = esc_html('|');
    return $sep;
}

// Custom title
add_filter('the_title', 'generic_title');
function generic_title($title) {
    if ($title == '') {
        return esc_html('...');
    } else {
        return wp_kses_post($title);
    }
}

// Schema type
function generic_schema_type() {
    $schema = 'https://schema.org/';
    if (is_single()) {
        $type = "Article";
    } elseif (is_author()) {
        $type = 'ProfilePage';
    } elseif (is_search()) {
        $type = 'SearchResultsPage';
    } else {
        $type = 'WebPage';
    }
    echo 'itemscope itemtype="' . esc_url($schema) . esc_attr($type) . '"';
}
add_filter('nav_menu_link_attributes', 'generic_schema_url', 10);
function generic_schema_url($atts) {
    $atts['itemprop'] = 'url';
    return $atts;
}

// Support for skip link
if (!function_exists('generic_wp_body_open')) {
    function generic_wp_body_open() {
        do_action('wp_body_open');
    }
}
add_action('wp_body_open', 'generic_skip_link', 5);
function generic_skip_link() {
    echo '<a href="#content" class="skip-link screen-reader-text">' . esc_html__('Skip to the content', 'generic') . '</a>';
}

// Read more link for posts
add_filter('the_content_more_link', 'generic_read_more_link');
function generic_read_more_link() {
    if (!is_admin()) {
        return ' <a href="' . esc_url(get_permalink()) . '" class="more-link">' . sprintf(__('...%s', 'generic'), '<span class="screen-reader-text">  ' . esc_html(get_the_title()) . '</span>') . '</a>';
    }
}

// Excerpt read more link
add_filter('excerpt_more', 'generic_excerpt_read_more_link');
function generic_excerpt_read_more_link($more) {
    if (!is_admin()) {
        global $post;
        return ' <a href="' . esc_url(get_permalink($post->ID)) . '" class="more-link">' . sprintf(__('...%s', 'generic'), '<span class="screen-reader-text">  ' . esc_html(get_the_title()) . '</span>') . '</a>';
    }
}

// Disable big image size threshold
add_filter('big_image_size_threshold', '__return_false');

// Image size overrides
add_filter('intermediate_image_sizes_advanced', 'generic_image_insert_override');
function generic_image_insert_override($sizes) {
    unset($sizes['medium_large']);
    unset($sizes['1536x1536']);
    unset($sizes['2048x2048']);
    return $sizes;
}

// Sidebar widget area
add_action('widgets_init', 'generic_widgets_init');
function generic_widgets_init() {
    register_sidebar(array(
        'name' => esc_html__('Sidebar Widget Area', 'generic'),
        'id' => 'primary-widget-area',
        'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
        'after_widget' => '</li>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>',
    ));
}

// Pingback header
add_action('wp_head', 'generic_pingback_header');
function generic_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">' . "\n", esc_url(get_bloginfo('pingback_url')));
    }
}

// Comment reply script
add_action('comment_form_before', 'generic_enqueue_comment_reply_script');
function generic_enqueue_comment_reply_script() {
    if (get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

// Custom ping template
function generic_custom_pings($comment) {
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo esc_url(comment_author_link()); ?></li>
    <?php
}

// Custom comment count
add_filter('get_comments_number', 'generic_comment_count', 0);
function generic_comment_count($count) {
    if (!is_admin()) {
        global $id;
        $get_comments = get_comments('status=approve&post_id=' . $id);
        $comments_by_type = separate_comments($get_comments);
        return count($comments_by_type['comment']);
    } else {
        return $count;
    }
}

// Remove Default Widgets and Sidebars
function remove_default_widgets() {
    unregister_sidebar('primary-widget-area'); // Adjust this to match any registered sidebar IDs
}
add_action('widgets_init', 'remove_default_widgets', 11);

// Disable Admin Bar for All Users
add_filter('show_admin_bar', '__return_false');

// Enqueue scripts conditionally
add_action('wp_enqueue_scripts', 'conditional_enqueue_scripts');
function conditional_enqueue_scripts() {
    // Enqueue url-controller.js on all relevant pages
    wp_enqueue_script('url-controller-js', get_template_directory_uri() . '/assets/js/url-controller.js', array(), null, true);

    // Only enqueue land-animation.js on the /intro page
    if (is_page_template('intro.php')) {
        wp_enqueue_script('land-animation-js', get_template_directory_uri() . '/assets/js/land-animation.js', array(), null, true);
        wp_localize_script('land-animation-js', 'themeData', array(
            'templateDirectoryUri' => get_template_directory_uri(),
        ));
    }
}