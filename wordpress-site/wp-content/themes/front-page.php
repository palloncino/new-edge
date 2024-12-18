<?php
/* Template Name: Homepage - Front Page */
get_header(); // Includes the main header.php with <head> and opening <body>
?>

<!-- Inject the custom header using the template part for reusability -->
<?php get_template_part('template-parts/header-custom'); ?>

<style>
	#text-container {
		opacity: 1;
		position: absolute;
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
		position: absolute;
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

<style>
	.section-1-homepage {
		background: #F69602;
	}

	.section-2-homepage {
		position: relative;
		/* Establish positioning context */
		background: url('http://edge.chebellagiornata.it/wp-content/uploads/2024/11/bg-front-page-section-2.png') no-repeat center center;
		background-size: cover;
		/* Remove fixed height to inherit from .section-padded-content */
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		/* Hide overflow during animation */
	}


	.blue-slide {
		position: absolute;
		bottom: -100%;
		/* Start completely below the section */
		left: 0;
		width: 100%;
		height: 100%;
		background: #2456E6;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 1s ease-in-out;
		transform: translateY(0);
		/* Initial position */
		z-index: 2;
		/* Above the background image */
	}

	/* Active State - Slide Up */
	.section-2-homepage.active .blue-slide {
		transform: translateY(-100%);
		/* Slide up to cover the section */
	}

	.section-3-homepage {
		display: flex;
		background: #F7F7F7;
		width: 100%;
		/* Inherits from .section-padded-content */
		align-items: center;
		justify-content: center;
		padding: 0;
		gap: 100px;
	}

	.section-3-column-left {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.section-3-column-right {
		flex: 1;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.section-3-column-left {
		background: transparent;
		/* Remove conflicting background */
		/* Positioning and sizing handled by flexbox */
		height: 50%;
	}

	#section3-video {
		height: 100%;
	}

	.section-3-column-right {
		background: transparent;
		/* Remove conflicting background */
		flex-direction: column;
		gap: 50px;
	}

	.section-3-action-button-container {}

	.section-3-action-button-content {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 40px;
	}

	.section-3-action-button-content-plus-icon {
		background: url('http://edge.chebellagiornata.it/wp-content/uploads/2024/11/plus-button.svg');
		background-repeat: no-repeat;
		align-items: center;
		justify-content: center;
		min-height: 22px;
		min-width: 22px;
		margin-top: 1.4rem;
	}

	.section-3-action-button-content-text-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding-right: 200px;
	}

	.section-3-action-button-content-title {
		margin: 0;
	}

	.section-3-h1 {
		font-family: 'Mundial Regular';
		font-size: 3.4rem;
		line-height: 4.6rem;
	}

	.section-3-description {
		font-family: 'Mundial Thin';
		font-size: 2rem;
		line-height: 3rem;
		font-weight: 300;
	}

	.section-3-action-button-content-description {}

	/* Responsive Adjustments for Section 3 */
	@media (max-width: 768px) {
		.section-3-homepage {
			flex-direction: column;
		}

		.section-3-column-right {
			flex-direction: row;
			justify-content: space-around;
		}

		.section-3-action-button-container {
			padding: 15px 30px;
			font-size: 1rem;
		}
	}

	.h1-white-medium {
		color: #fff;
		font-family: 'Mundial Regular';
		font-size: 4rem;
		line-height: 5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.translate-y-50 {
		transform: translateY(50%);
	}
</style>

<script>
	document.addEventListener('DOMContentLoaded', function() {
		const section2 = document.querySelector('.section-2-homepage');

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					section2.classList.add('active');
					observer.unobserve(section2); // Stop observing after the animation is triggered
				}
			});
		}, {
			threshold: 0.5 // Trigger when 50% of the section is visible
		});

		observer.observe(section2);
	});
</script>

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

	<div class="section-padded-content section-1-homepage">
		<h1 class="h1-white-medium translate-y-50">Soluzioni innovative, competenze specifiche e tecnologie per
			proteggere il
			vostro presente e garantire il vostro futuro.</h1>
	</div>

	<!-- Section 2 -->
	<div class="section-padded-content section-2-homepage">
		<!-- Sliding Blue Section -->
		<div class="blue-slide">
			<h1 class="h1-white-medium">EDGE progetta, realizza e gestisce servizi assicurativi in un ambiente
				unico e dinamico, grazie
				al supporto delle società del gruppo, con l’obiettivo di tutelare persone e aziende.</h1>
		</div>
	</div>

	<!-- Section 3 -->
	<div class="section-padded-content section-3-homepage">
		<div class="section-3-column-left">
			<video id="section3-video" style="border: none"
				src="http://edge.chebellagiornata.it/wp-content/uploads/2024/11/video-front-page-sec-3.mov"
				muted autoplay playsinline>
				Your browser does not support the video tag.
			</video>
		</div>

		<div class="section-3-column-right">
			<div class="section-3-action-button-container">
				<div class="section-3-action-button-content">

					<div class="section-3-action-button-content-plus-icon"></div>

					<div class="section-3-action-button-content-text-container">
						<h1 class="section-3-action-button-content-title section-3-h1">EDGE, IL BROKER</h1>
						<div class="section-3-action-button-content-description section-3-description">A ogni
							cliente la sua soluzione.</div>
					</div>

				</div>
			</div>

			<div class="section-3-action-button-container">
				<div class="section-3-action-button-content">

					<div class="section-3-action-button-content-plus-icon"></div>

					<div class="section-3-action-button-content-text-container">
						<h1 class="section-3-action-button-content-title section-3-h1">OVER THE EDGE</h1>
						<div class="section-3-action-button-content-description section-3-description">Cresciamo
							integrando intermediari nel nostro progetto.</div>
					</div>

				</div>
			</div>

			<div class="section-3-action-button-container">
				<div class="section-3-action-button-content">

					<div class="section-3-action-button-content-plus-icon"></div>

					<div class="section-3-action-button-content-text-container">
						<h1 class="section-3-action-button-content-title section-3-h1">PEOPLE</h1>
						<div class="section-3-action-button-content-description section-3-description">Il gruppo
							per attrarre i migliori talenti</div>
					</div>

				</div>
			</div>
		</div>
	</div>

	<script>
		document.addEventListener('DOMContentLoaded', function() {
			const section2 = document.querySelector('.section-2-homepage');
			const video = document.getElementById('section3-video');

			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						section2.classList.add('active');
						observer.unobserve(section2);
					}
				});
			}, {
				threshold: 0.5
			});

			observer.observe(section2);

			// Handle video playback to pause at the end
			if (video) {
				video.addEventListener('ended', function() {
					this.pause();
					// Optionally, set the currentTime to the end to ensure the final frame is displayed
					this.currentTime = this.duration;
				});
			}
		});
	</script>

</div>

<?php
get_footer(); // Includes footer.php and wp_footer()
?>