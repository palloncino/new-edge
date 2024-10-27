<?php
/* Template Name: Homepage - Front Page */
get_header(); // Includes the main header.php with <head> and opening <body>
?>

<!-- Inject the custom header using the template part for reusability -->
<?php get_template_part( 'template-parts/header-custom' ); ?>

<div class="app-container">
	<div class="section-padded-content">

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
	</div>
</div>

<?php
get_footer(); // Includes footer.php and wp_footer()
?>