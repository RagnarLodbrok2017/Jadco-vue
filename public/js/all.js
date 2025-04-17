/**
 * JADCO - Main JavaScript File
 * This file contains all general JavaScript functionality for the site
 */

$(document).ready(function() {
    
    /**
     * Mobile Menu Improvements
     * Handles closing the mobile menu when clicking on links or outside the menu
     */
    (function() {
        // Close menu when clicking a nav item on mobile
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .btn-talk');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 && 
                navbarCollapse.classList.contains('show') && 
                !e.target.closest('.navbar-collapse') && 
                !e.target.closest('.navbar-toggler')) {
                navbarToggler.click();
            }
        });
    })();

    /**
     * =============================================================
     * LET'S TALK BUTTON HANDLER
     * =============================================================
     * This section provides a direct click handler for the "Let's Talk" buttons
     * 1. Works with both "#contact" and "/#contact" href formats
     * 2. Scrolls to an optimized position in the contact section
     * 3. Provides debugging console logs for troubleshooting
     */
    (function() {
        // Find all Let's Talk buttons
        const talkButtons = document.querySelectorAll('.btn-talk');
        console.log('Found ' + talkButtons.length + ' Let\'s Talk buttons');
        
        // Add click handler to each button
        talkButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                console.log('Button clicked with href: ' + href);
                
                // Check for both /#contact and #contact formats
                if (href === '#contact' || href.endsWith('/#contact')) {
                    event.preventDefault();
                    console.log('Let\'s Talk button clicked!');
                    
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        // Calculate position to show more of the form
                        const contactBottom = contactSection.offsetTop + contactSection.offsetHeight;
                        const adjustedPosition = contactBottom - 600; // Show more of the form
                        
                        console.log('Scrolling to position: ' + adjustedPosition);
                        
                        // Use both scrollTo for immediate effect and animate for smooth scrolling
                        window.scrollTo({
                            top: adjustedPosition,
                            behavior: 'smooth'
                        });
                        
                        // Also try jQuery animation as backup
                        if (typeof jQuery !== 'undefined') {
                            jQuery('html, body').animate({
                                scrollTop: adjustedPosition
                            }, 800, function() {
                                console.log('Scroll animation completed');
                            });
                        }
                    }
                }
            });
        });
    })();

    /**
     * =============================================================
     * ABOUT SECTION ANIMATIONS
     * =============================================================
     * This section handles all animations for the about section:
     * 1. Sequential entry animations with fade and slide effects
     * 2. Dynamic parallax effects based on scroll position
     * 3. Custom exit behavior for specific elements
     */
    (function() {
        // Select all elements we want to animate
        const aboutSection = document.querySelector('.about-section');
        const sectionTitle = document.querySelector('.about-section .section-title');
        const aboutText = document.querySelector('.about-section .about-text');
        const aboutMainDesc = document.querySelector('.about-section .about-main-description');
        const paragraphs = document.querySelectorAll('.about-section .about-description');
        const mainImage = document.querySelector('.about-section .about-image-main');
        const secondaryImage = document.querySelector('.about-section .about-image-secondary');
        
        // Exit if about section doesn't exist on this page
        if (!aboutSection) return;
        
        // Add animate-ready class to prepare elements for animation
        if (sectionTitle) sectionTitle.classList.add('animate-ready');
        if (aboutText) aboutText.classList.add('animate-ready');
        if (aboutMainDesc) aboutMainDesc.classList.add('animate-ready');
        if (paragraphs.length > 0) {
            paragraphs.forEach(para => para.classList.add('animate-ready'));
        }
        
        /**
         * Handle About Section Entry Animations
         * Checks if section is in viewport and adds animation classes with sequential timing
         */
        function handleAboutAnimations() {
            // Check if about section is in viewport
            const rect = aboutSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isInViewport) {
                // Add animation classes with staggered delays
                
                // Step 1: Animate section title first
                if (sectionTitle) {
                    sectionTitle.classList.add('animate');
                }
                
                // Step 2: Animate about text after 200ms
                if (aboutText) {
                    setTimeout(() => {
                        aboutText.classList.add('animate');
                    }, 200);
                }
                
                // Step 3: Animate main description after 400ms
                if (aboutMainDesc) {
                    setTimeout(() => {
                        aboutMainDesc.classList.add('animate');
                    }, 400);
                }
                
                // Step 4: Animate paragraphs sequentially, starting after 600ms
                if (paragraphs.length > 0) {
                    paragraphs.forEach((para, index) => {
                        setTimeout(() => {
                            para.classList.add('animate');
                        }, 600 + (index * 150));
                    });
                }
                
                // Step 5: Animate main image after 700ms
                if (mainImage) {
                    setTimeout(() => {
                        mainImage.classList.add('animate');
                    }, 700);
                }
            } else {
                // Remove animation classes when out of viewport
                // (except for main description and main image which don't have exit animations)
                if (sectionTitle) sectionTitle.classList.remove('animate');
                if (aboutText) aboutText.classList.remove('animate');
                
                // Paragraphs also remove animations when scrolling away
                if (paragraphs.length > 0) {
                    paragraphs.forEach(para => para.classList.remove('animate'));
                }
            }
        }
        
        // Run animations on page load
        handleAboutAnimations();
        
        // Update animations on scroll
        $(window).scroll(function() {
            handleAboutAnimations();
        });
        
        // Update animations on resize (important for mobile orientation changes)
        $(window).resize(function() {
            handleAboutAnimations();
        });
    })();
    
    /**
     * =============================================================
     * ABOUT SECTION SCROLL-BASED PARALLAX EFFECT
     * =============================================================
     * This section handles dynamic scroll-based animations for images in the about section:
     * 1. Secondary image moves UP when scrolling DOWN (and vice versa)
     * 2. Main image moves DOWN when scrolling DOWN (and vice versa)
     * 3. Uses !important styles to ensure animations aren't overridden
     */
    (function() {
        // Track scroll position and movement amounts
        let lastScrollY = window.scrollY;
        let secondaryImageY = 0;
        let mainImageY = 0;
        const MAX_MOVE = 45; // Maximum pixel movement in either direction - reduced from 80px to 60px
        
        // Get image elements
        const secondaryImage = document.querySelector('.about-image-secondary');
        const mainImage = document.querySelector('.about-image-main');
        const aboutSection = document.querySelector('.about-section');
        
        // Exit if about section or images don't exist
        if (!aboutSection || (!secondaryImage && !mainImage)) return;
        
        // Flag to check if initial animation is complete
        let initialAnimationComplete = false;
        setTimeout(() => { initialAnimationComplete = true; }, 2500);
        
        // Override any existing scroll handlers that might be conflicting
        $(window).off('scroll.aboutImageAnimation');
        
        /**
         * Apply Transform with !important
         * Forces the transform property to override any other styles that might be applied
         * @param {HTMLElement} element - The element to apply the transform to
         * @param {number} yValue - The Y translation value in pixels
         * @param {number} xValue - The X translation value in pixels (optional)
         */
        function applyTransform(element, yValue, xValue = 0) {
            if (element) {
                // Force the transform by applying it directly as an attribute with !important
                if (xValue !== 0) {
                    // Apply diagonal transform with both X and Y values
                    element.style.setProperty('transform', `translate(${xValue}px, ${yValue}px)`, 'important');
                } else {
                    // Apply only Y transform (backward compatible)
                    element.style.setProperty('transform', `translateY(${yValue}px)`, 'important');
                }
                
                // Mark element as controlled by scroll animations
                if (!element.hasAttribute('data-controlled-by-scroll')) {
                    element.setAttribute('data-controlled-by-scroll', 'true');
                }
            }
        }
        
        /**
         * Move Images Based on Scroll Position
         * Creates a parallax effect by moving images in different directions when scrolling
         */
        function moveImagesOnScroll() {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            
            // Check if about section is visible in viewport
            const aboutRect = aboutSection.getBoundingClientRect();
            if (aboutRect.bottom < 0 || aboutRect.top > window.innerHeight) {
                lastScrollY = currentScrollY;
                return;
            }
            
            // Calculate section center position relative to viewport
            const sectionCenter = aboutRect.top + (aboutRect.height / 2);
            const viewportCenter = window.innerHeight / 2;
            
            // Only move secondary image when scrolling past the center of the section
            const isPastCenter = sectionCenter < viewportCenter;
            
            if (isPastCenter) {
                // Calculate how far past center (as a percentage)
                const pastCenterPercentage = Math.min(1, Math.abs(sectionCenter - viewportCenter) / (viewportCenter));
                
                // Move secondary image (UP when scrolling DOWN)
                if (secondaryImage) {
                    // Calculate new position based on scroll delta and past-center percentage
                    // Use a smaller multiplier (0.4) for smoother movement
                    secondaryImageY -= scrollDelta * 0.4 * pastCenterPercentage;
                    
                    // Apply smoothing to make movement less jumpy
                    if (Math.abs(scrollDelta) > 10) {
                        // For fast scrolling, smooth more aggressively
                        secondaryImageY = secondaryImageY * 0.9 + (secondaryImageY - scrollDelta * 0.4 * pastCenterPercentage) * 0.1;
                    }
                    
                    // Limit movement range to prevent excessive translation
                    secondaryImageY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, secondaryImageY));
                    
                    // Apply the transform with !important
                    applyTransform(secondaryImage, secondaryImageY);
                }
                
                // Animate main image in opposite direction of secondary image
                if (mainImage) {
                    // Move main image DOWN when scrolling DOWN (opposite of secondary image)
                    mainImageY += scrollDelta * 0.4 * pastCenterPercentage;
                    
                    // Apply smoothing to make movement less jumpy
                    if (Math.abs(scrollDelta) > 10) {
                        // For fast scrolling, smooth more aggressively
                        mainImageY = mainImageY * 0.9 + (mainImageY + scrollDelta * 0.4 * pastCenterPercentage) * 0.1;
                    }
                    
                    // Limit movement range to prevent excessive translation
                    mainImageY = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, mainImageY));
                    
                    // Apply the transform with !important
                    applyTransform(mainImage, mainImageY);
                }
            } else {
                // Reset secondary image to original position when above center
                if (secondaryImage && secondaryImageY !== 0) {
                    // More gradual return to original position
                    secondaryImageY *= 0.85; // Reduce by 15% each frame for smoother return
                    
                    // If very close to zero, just set to zero
                    if (Math.abs(secondaryImageY) < 0.5) secondaryImageY = 0;
                    
                    applyTransform(secondaryImage, secondaryImageY);
                }
                
                // Reset main image to original position when above center
                if (mainImage && mainImageY !== 0) {
                    // More gradual return to original position
                    mainImageY *= 0.85; // Reduce by 15% each frame for smoother return
                    
                    // If very close to zero, just set to zero
                    if (Math.abs(mainImageY) < 0.5) mainImageY = 0;
                    
                    applyTransform(mainImage, mainImageY);
                }
            }
            
            // Update last scroll position for next comparison
            lastScrollY = currentScrollY;
        }
        
        // Add scroll event with higher priority using namespaced event
        $(window).on('scroll.aboutImageAnimation', function() {
            requestAnimationFrame(moveImagesOnScroll);
        });
        
        // Make sure images are properly positioned when page loads
        $(window).on('load', function() {
            // Reset positions on page load
            secondaryImageY = 0;
            mainImageY = 0;
            applyTransform(secondaryImage, 0);
            applyTransform(mainImage, 0);
        });
        
        // Initial call to set up transforms
        moveImagesOnScroll();
        
        // Reset on window resize
        window.addEventListener('resize', function() {
            // Reset tracking variables
            secondaryImageY = 0;
            
            // Reset element transforms
            applyTransform(secondaryImage, 0);
            // Do not apply any transforms to mainImage
            
            // Reset scroll tracking
            lastScrollY = window.scrollY;
        }, { passive: true });
    })();

    /**
     * =============================================================
     * CONTACT SECTION ANIMATIONS
     * =============================================================
     * This section handles sequential animations for the contact section:
     * 1. Elements fade and slide in similar to the header animations
     * 2. Animations are triggered when scrolling to the contact section
     */
    (function() {
        // Select contact section elements
        const contactSection = document.querySelector('.contact-section');
        if (!contactSection) return;
        
        // Select elements to animate
        const footerLogo = contactSection.querySelector('.footer-logo');
        const contactInfo = contactSection.querySelector('.contact-info');
        const contactTagline = contactSection.querySelector('.contact-tagline');
        const letsTalk = contactSection.querySelector('.let-talk');
        const contactForm = contactSection.querySelector('.contact-form');
        const socialLinks = contactSection.querySelector('.social-links');
        const copyright = contactSection.querySelector('.copyright');
        
        // Prepare elements for animation by setting initial state
        function prepareElementsForAnimation() {
            // Set initial styles for animation
            if (footerLogo) {
                footerLogo.style.opacity = '0';
                footerLogo.style.transform = 'translateY(-50px)';
                footerLogo.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (contactInfo) {
                contactInfo.style.opacity = '0';
                contactInfo.style.transform = 'translateX(-80px)';
                contactInfo.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (contactTagline) {
                contactTagline.style.opacity = '0';
                contactTagline.style.transform = 'translateX(80px)';
                contactTagline.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (letsTalk) {
                letsTalk.style.opacity = '0';
                letsTalk.style.transform = 'translateX(80px)';
                letsTalk.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (contactForm) {
                contactForm.style.opacity = '0';
                contactForm.style.transform = 'translateX(80px)';
                contactForm.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (socialLinks) {
                socialLinks.style.opacity = '0';
                socialLinks.style.transform = 'translateY(30px)';
                socialLinks.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
            
            if (copyright) {
                copyright.style.opacity = '0';
                copyright.style.transform = 'translateY(30px)';
                copyright.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            }
        }
        
        // Animate elements sequentially
        function animateContactSection() {
            const rect = contactSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isInViewport) {
                // Animate in sequence with delays
                
                // Step 1: Footer logo (like navbar-brand)
                if (footerLogo) {
                    setTimeout(() => {
                        footerLogo.style.opacity = '1';
                        footerLogo.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                // Step 2: Contact info (locations)
                if (contactInfo) {
                    setTimeout(() => {
                        contactInfo.style.opacity = '1';
                        contactInfo.style.transform = 'translateX(0)';
                    }, 300);
                }
                
                // Step 3: Contact tagline (like main-heading)
                if (contactTagline) {
                    setTimeout(() => {
                        contactTagline.style.opacity = '1';
                        contactTagline.style.transform = 'translateX(0)';
                    }, 500);
                }
                
                // Step 4: Let's Talk heading
                if (letsTalk) {
                    setTimeout(() => {
                        letsTalk.style.opacity = '1';
                        letsTalk.style.transform = 'translateX(0)';
                    }, 700);
                }
                
                // Step 5: Contact form
                if (contactForm) {
                    setTimeout(() => {
                        contactForm.style.opacity = '1';
                        contactForm.style.transform = 'translateX(0)';
                    }, 900);
                }
                
                // Step 6: Footer elements
                if (socialLinks) {
                    setTimeout(() => {
                        socialLinks.style.opacity = '1';
                        socialLinks.style.transform = 'translateY(0)';
                    }, 1100);
                }
                
                if (copyright) {
                    setTimeout(() => {
                        copyright.style.opacity = '1';
                        copyright.style.transform = 'translateY(0)';
                    }, 1200);
                }
            }
        }
        
        // Initialize animations
        prepareElementsForAnimation();
        
        // Check if elements are in viewport on load
        animateContactSection();
        
        // Add scroll event listener to trigger animations
        window.addEventListener('scroll', animateContactSection, { passive: true });
        
        // Update on resize
        window.addEventListener('resize', animateContactSection, { passive: true });
    })();

    /**
     * =============================================================
     * STATISTICS SECTION ANIMATIONS
     * =============================================================
     * This section handles animations for the statistics section:
     * 1. Elements fade and slide in from below when section comes into view
     * 2. Animation uses same pattern as other sections for consistency
     */
    (function() {
        // Select statistics section elements
        const statsSection = document.querySelector('.statistics-section');
        if (!statsSection) return;
        
        // Select elements to animate
        const statItems = statsSection.querySelectorAll('.stat-item');
        
        // Prepare elements for animation by setting initial state
        function prepareElementsForAnimation() {
            // Set initial styles for animation
            if (statItems && statItems.length > 0) {
                statItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px)';
                    item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                });
            }
        }
        
        // Animate elements sequentially
        function animateStatisticsSection() {
            const rect = statsSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            if (isInViewport) {
                // Animate stat items sequentially
                if (statItems && statItems.length > 0) {
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 200 + (index * 200)); // 200ms delay for first item, then +200ms for each subsequent item
                    });
                }
            }
        }
        
        // Initialize animations
        prepareElementsForAnimation();
        
        // Check if elements are in viewport on load
        animateStatisticsSection();
        
        // Add scroll event listener to trigger animations
        window.addEventListener('scroll', animateStatisticsSection, { passive: true });
        
        // Update on resize
        window.addEventListener('resize', animateStatisticsSection, { passive: true });
    })();
});
