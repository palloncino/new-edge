<?php
/* Template Name: Homepage - Front Page */
get_header(); // Includes the main header.php with <head> and opening <body>
?>

<!-- Inject the custom header using the template part for reusability -->
<?php get_template_part('template-parts/header-custom'); ?>

<style>
	#text-container {
		opacity: 1;
		position: fixed;
		top: 50%;
		left: 200px;
		transform: translateY(-50%);
		height: auto;
		width: 100%;
		max-width: 1100px;
	}

	#text-container__h1 {
		font-size: 150px;
		line-height: 150px;
		text-wrap: nowrap;
		margin: 0;
	}

	#text-container,
	#text-container__h1 {
		transition: all 1s ease-in-out;
	}

	#intro-start-button-container-row {
		opacity: 1;
		position: fixed;
		bottom: 48px;
		right: 48px;
		/* transform: translateY(-50%); */
	}

	#intro-start-button-container {
		cursor: pointer;
		display: flex;
		height: 65px;
		width: 120px;
		font-size: 24px;
		background: url('https://edge.chebellagiornata.it/wp-content/themes/generic/assets/svgs/shape-2-orange.svg');
		background-repeat: no-repeat;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: 'Mundial Regular';
	}
</style>

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