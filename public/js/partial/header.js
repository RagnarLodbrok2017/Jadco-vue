$(document).ready(function () {
    console.log('Header.js loaded. Initializing header animations...');

    // Check if we're on the home page
    const isHomePage = window.location.pathname === '/' ||
        window.location.pathname === '/index.php' ||
        window.location.pathname === '/home';

    /* DEBUG for heading-text class cycling issue */
    window.activeSlideDebug = 0;
    window.debugHeadingTextIssue = function() {
        console.log("--- DEBUGGING HEADING TEXT CYCLING ---");
        const headingTexts = document.querySelectorAll('.heading-text');
        headingTexts.forEach((text, i) => {
            const classes = Array.from(text.classList);
            const dataSlide = text.getAttribute('data-slide');
            console.log(`Heading ${i} [data-slide="${dataSlide}"]: ${classes.join(', ')}`);
        });
        console.log("-----------------------------------");
    };

    // Handle preloader animation and removal
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');

    if (preloader && preloaderLogo) {
        // Preload content and prepare animations while preloader is showing
        prepareAnimations();
        
        // First ensure the logo completes its entrance animation - REDUCED TIME
        setTimeout(() => {
            // Start exit animation for the logo
            preloaderLogo.classList.add('fade-out');

            // After logo exit animation is complete, fade out the preloader - REDUCED TIME
            setTimeout(() => {
                preloader.classList.add('fade-out');

                // Start animations IMMEDIATELY before preloader is fully gone
                initializeHeaderAnimations();
                updateHeaderState();
                updateScrollIndicator();
                if (isHomePage) {
                    initializeCarousel();
                }

                // Debug after initialization
                if (isHomePage) {
                    setTimeout(() => {
                        console.log("Initial classes after animation setup:");
                        window.debugHeadingTextIssue();
                    }, 1000);
                }

                // Remove preloader from DOM after fade out completes - REDUCED TIME
                setTimeout(() => {
                    preloader.remove();
                }, 100);
            }, 300); // Reduced from 1000ms
        }, 600); // Reduced from 1500ms
    } else {
        // If no preloader, initialize header animations immediately
        initializeHeaderAnimations();
        updateHeaderState();
        updateScrollIndicator();
        if (isHomePage) {
            initializeCarousel();
        }
        
        // Debug after initialization
        if (isHomePage) {
            setTimeout(() => {
                console.log("Initial classes after animation setup (no preloader):");
                window.debugHeadingTextIssue();
            }, 1000);
        }
    }

    // New function to prepare animations before preloader disappears
    function prepareAnimations() {
        // Pre-cache and prepare DOM elements for animation
        const navbar = document.querySelector('.navbar');
        const navbarBrand = document.querySelector('.navbar-brand');
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');
        const mainHeading = document.querySelector('.main-heading');
        const headerImage = document.querySelector('.header-image');
        
        // Force browser to compute layouts to avoid reflow when animations start
        if (navbar) navbar.offsetHeight;
        if (navbarBrand) navbarBrand.offsetHeight;
        if (mainHeading) mainHeading.offsetHeight;
        if (headerImage) headerImage.offsetHeight;
        
        // Hide elements but keep them in flow
        if (navbar) navbar.style.opacity = '0';
        if (navbarBrand) navbarBrand.style.opacity = '0';
        if (mainHeading) mainHeading.style.opacity = '0';
        if (headerImage) headerImage.style.opacity = '0';
    }

    // Initialize header animations
    function initializeHeaderAnimations() {
        console.log('Running keyframe animations for header');
        
        // Apply animation classes all at once - timing will be handled by CSS animation-delay
        
        // Navbar appears
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.opacity = ''; // Remove inline opacity
            navbar.classList.add('animate');
        }

        // Navbar brand
        const navbarBrand = document.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.style.opacity = ''; // Remove inline opacity
            navbarBrand.classList.add('animate');
        }

        // Navbar items
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');
        if (navItems.length) {
            navItems.forEach((item, index) => {
                item.style.animationDelay = (0.2 + (index * 0.05)) + 's'; // Reduced delay
                item.classList.add('animate');
            });
        }
        
        // Main heading
        const mainHeading = document.querySelector('.main-heading');
        if (mainHeading) {
            mainHeading.style.opacity = ''; // Remove inline opacity
            mainHeading.style.animationDelay = '0.3s'; // Reduced delay
            mainHeading.classList.add('animate');
        }

        // On home page, activate the first slide with animation
        if (isHomePage) {
            const firstHeadingText = document.querySelector('.heading-text[data-slide="0"]');
            if (firstHeadingText) {
                firstHeadingText.classList.add('active', 'animate-delay');
                console.log('Applied active, animate-delay to first heading text');
            }
        } else {
            // On other pages, activate the static heading text
            const headingText = document.querySelector('.heading-text');
            if (headingText) {
                headingText.classList.add('active', 'animate-delay');
            }
        }

        // Services menu
        const servicesMenu = document.querySelector('.heading .services-menu');
        if (servicesMenu) {
            servicesMenu.style.animationDelay = '0.5s'; // Reduced delay
            servicesMenu.classList.add('animate');
        }

        // Header image
        const headerImage = document.querySelector('.header-image');
        if (headerImage) {
            headerImage.style.opacity = ''; // Remove inline opacity
            headerImage.style.animationDelay = '0.6s'; // Reduced delay
            headerImage.classList.add('animate');
        }
    }

    // Initialize Bootstrap Carousel
    function initializeCarousel() {
        // Create a unique transition ID for each slide event
        let currentTransitionId = null;
        let isTransitioning = false;
        
        var headerCarousel = new bootstrap.Carousel(document.getElementById('headerCarousel'), {
            interval: 5000,
            wrap: true,
            touch: true
        });

        // Pause carousel on hover
        $('#headerCarousel').hover(
            function () {
                $(this).carousel('pause');
            },
            function () {
                $(this).carousel('cycle');
            }
        );

        // Handle custom carousel navigation
        $('.nav-number').on('click', function () {
            if (isTransitioning) return false;
            
            var slideIndex = $(this).data('slide');
            $('#headerCarousel').carousel(slideIndex);
        });

        // Completely remove existing handlers to prevent multiple bindings
        $('#headerCarousel').off('slide.bs.carousel');
        
        // Update the carousel slide event handling for keyframe animations
        $('#headerCarousel').on('slide.bs.carousel', function (event) {
            var slideIndex = event.to;
            var fromIndex = event.from;
            
            // Only handle events for new transitions
            if (isTransitioning) {
                event.preventDefault();
                return false;
            }
            
            // Generate a unique ID for this transition
            currentTransitionId = Date.now();
            const thisTransitionId = currentTransitionId;
            isTransitioning = true;
            
            console.log(`Starting transition ${thisTransitionId}: ${fromIndex} -> ${slideIndex}`);
            
            // Get the current and next headings
            const currentHeading = $(`.heading-text[data-slide="${fromIndex}"]`);
            const nextHeading = $(`.heading-text[data-slide="${slideIndex}"]`);
            
            // 1. First mark the old slide as exiting
            if (currentHeading.hasClass('active')) {
                currentHeading.removeClass('active').addClass('was-active');
            }
            
            // 2. After the exit animation completes, set up the new slide
            setTimeout(function() {
                // Make sure this is still the most recent transition
                if (thisTransitionId !== currentTransitionId) {
                    console.log(`Transition ${thisTransitionId} was superseded, skipping`);
                    return;
                }
                
                // Remove all transition classes from all headings
                $('.heading-text').removeClass('was-active animate-delay animate');
                
                // Add active class to the new heading
                nextHeading.addClass('active');
                
                // Force a reflow
                void nextHeading[0].offsetWidth;
                
                // Clear the transition lock
                isTransitioning = false;
                console.log(`Completed transition ${thisTransitionId}`);
            }, 800); // Match CSS animation duration
            
            // Update custom navigation
            $('.nav-number').removeClass('active');
            $('.nav-number[data-slide="' + slideIndex + '"]').addClass('active');

            // Handle indicator lines
            $('.nav-line').css('display', 'none').removeClass('active');
            $('.nav-line-fill').css('width', '0%');

            if (slideIndex < 4) {
                var activeNumberIndex = $('.nav-number[data-slide="' + slideIndex + '"]').index('.carousel-nav-numbers > div');
                var nextLine = $('.carousel-nav-numbers > div:eq(' + (activeNumberIndex + 1) + ')');
                nextLine.css('display', 'block').addClass('active');
            }
        });

        // Handle the line animation after slide has finished changing
        $('#headerCarousel').on('slid.bs.carousel', function (event) {
            var slideIndex = $('.carousel-item.active').index();

            // Animate the line fill
            if (slideIndex < 4) { // Don't animate a line after the last number
                $('.nav-line.active .nav-line-fill').css('width', '100%');
            }
        });

        // Set the first service and heading text as active by default
        // Add both active and animate-delay for initial page load only
        $('.heading-text[data-slide="0"]').addClass('active animate-delay');
        $('.nav-number[data-slide="0"]').addClass('active');

        // Hide all lines first, then show and activate only the first line
        $('.nav-line').css('display', 'none');
        var firstLine = $('.carousel-nav-numbers > div:eq(1)');
        firstLine.css('display', 'block');
        firstLine.addClass('active');

        // Start the first line animation
        setTimeout(function () {
            $('.nav-line.active .nav-line-fill').css('width', '100%');
        }, 100);
    }


    // Close navbar when clicking on a nav item on mobile
    $('.navbar-nav .nav-link').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Add active class to navbar items based on scroll position
    $(window).scroll(function () {
        var position = $(this).scrollTop();
        var currentPath = window.location.pathname;

        // Don't change active state for about and services pages when scrolling
        if (currentPath === '/about' || currentPath.startsWith('/services/')) {
            return;
        }

        // For home page, preserve the home nav link active state 
        if (currentPath === '/' || currentPath === '/home' || currentPath === '') {
            // Always keep the home nav link active regardless of scroll position
            $('#home-nav-link').addClass('active');

            // Update section-specific active classes for non-nav elements
            $('.section').each(function () {
                var target = $(this).offset().top - 100;
                var id = $(this).attr('id');

                // Only handle in-page links/sections, not top-level nav
                if (id && id !== 'home') {
                    if (position >= target) {
                        // Find and update only the in-page navigation or indicators
                        $('.section-nav .nav-link').removeClass('active');
                        $('.section-nav .nav-link[href="#' + id + '"]').addClass('active');
                    }
                }
            });
        }
    });

    // Check if user is in header section - if yes, add at-top class to body
    function updateHeaderState() {
        if (window.scrollY < 100) {
            document.body.classList.add('at-top');
        } else {
            document.body.classList.remove('at-top');
        }
    }

    // Update header state on scroll
    $(window).scroll(updateHeaderState);


    // Add active class to navbar items based on scroll position
    $(window).scroll(function () {
        var position = $(this).scrollTop();
        var currentPath = window.location.pathname;

        // Don't change active state for about and services pages when scrolling
        if (currentPath === '/about' || currentPath.startsWith('/services/')) {
            return;
        }

        // For home page, preserve the home nav link active state 
        // but update section-specific active states
        if (currentPath === '/' || currentPath === '/home' || currentPath === '') {
            // Always keep the home nav link active regardless of scroll position
            $('#home-nav-link').addClass('active');

            // Update section-specific active classes for non-nav elements
            $('.section').each(function () {
                var target = $(this).offset().top - 100;
                var id = $(this).attr('id');

                // Only handle in-page links/sections, not top-level nav
                if (id && id !== 'home') {
                    if (position >= target) {
                        // Find and update only the in-page navigation or indicators
                        $('.section-nav .nav-link').removeClass('active');
                        $('.section-nav .nav-link[href="#' + id + '"]').addClass('active');
                    }
                }
            });
        }

        // Update scroll indicator
        updateScrollIndicator();
    });
     // Function to update the scroll indicator
     function updateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        
        scrollIndicator.style.height = `${scrolled}%`;
        
        // Check if user is in header section - if yes, add at-top class to body
        if (window.scrollY < 100) {
            document.body.classList.add('at-top');
        } else {
            document.body.classList.remove('at-top');
        }
    }
});