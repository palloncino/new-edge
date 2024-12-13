<?php
/* Template Name: Front Page Template */
get_header(); // This includes your <head> and opening <body> tags as defined in header.php
?>

<div class="outer-app-container front-page">
    <div class="inner-app-container">
        <!-- Section 0 -->
        <div class="section-padded-content section-0-homepage">
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

        <!-- Section 1 -->
        <div class="section-padded-content section-1-homepage">
            <h1 class="h1-m color-FFF translate-y-50">Soluzioni innovative, competenze specifiche e tecnologie per
                proteggere il vostro presente e garantire il vostro futuro.</h1>
        </div>

        <!-- Section 2 -->
        <div class="section-padded-content section-2-homepage">
            <div class="blue-slide">
                <h1 class="h1-m color-FFF">EDGE progetta, realizza e gestisce servizi assicurativi in un ambiente
                    unico e dinamico, grazie al supporto delle società del gruppo, con l’obiettivo di tutelare persone e aziende.</h1>
            </div>
        </div>

        <!-- Section 3 -->
        <div class="section-padded-content section-3-homepage">
            <div class="section-3-column-left">
                <video id="section3-video" style="border: none"
                    src="http://edge.chebellagiornata.it/wp-content/uploads/2024/11/logo-generation.mov" muted
                    autoplay playsinline>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="section-3-column-right">
                <div class="section-3-action-button-container">
                    <div class="section-3-action-button-content">
                        <div class="section-3-action-button-content-plus-icon plus-icon"></div>
                        <div class="section-3-action-button-content-text-container">
                            <h1 class="section-3-action-button-content-title section-3-h1">EDGE, IL BROKER</h1>
                            <div class="section-3-action-button-content-description section-3-description">A ogni
                                cliente la sua soluzione.</div>
                        </div>
                    </div>
                </div>
                <div class="section-3-action-button-container">
                    <div class="section-3-action-button-content">
                        <div class="section-3-action-button-content-plus-icon plus-icon"></div>
                        <div class="section-3-action-button-content-text-container">
                            <h1 class="section-3-action-button-content-title section-3-h1">OVER THE EDGE</h1>
                            <div class="section-3-action-button-content-description section-3-description">Cresciamo
                                integrando intermediari nel nostro progetto.</div>
                        </div>
                    </div>
                </div>
                <div class="section-3-action-button-container">
                    <div class="section-3-action-button-content">
                        <div class="section-3-action-button-content-plus-icon plus-icon"></div>
                        <div class="section-3-action-button-content-text-container">
                            <h1 class="section-3-action-button-content-title section-3-h1">PEOPLE</h1>
                            <div class="section-3-action-button-content-description section-3-description">Il gruppo
                                per attrarre i migliori talenti</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
get_footer(); // closes <body> and includes wp_footer()
?>
