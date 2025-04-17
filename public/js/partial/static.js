$(document).ready(function () {
    // Static JavaScript functions and utilities
    // This file is for static, reusable JavaScript code

    // Create scroll indicator if it doesn't exist
    let scrollIndicator = document.querySelector('.scroll-indicator');
    let scrollContainer = document.querySelector('.scroll-indicator-container');
    
    if (!scrollContainer) {
        scrollContainer = document.createElement('div');
        scrollContainer.className = 'scroll-indicator-container';
        scrollContainer.innerHTML = `
            <div class="scroll-indicator"></div>
        `;
        document.body.appendChild(scrollContainer);
        scrollIndicator = scrollContainer.querySelector('.scroll-indicator');
    } else if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollContainer.appendChild(scrollIndicator);
    }

    let lockScrollTimeout = null;
    
    // Function to update the scroll indicator
    function updateScrollIndicator() {
        // Recapture the indicator in case it was just created
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const scrollContainer = document.querySelector('.scroll-indicator-container');
        if (!scrollIndicator || !scrollContainer) return;

        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;

        scrollIndicator.style.height = `${scrolled}%`;

        // Check if user is in header section - if yes, add at-top class to body
        // and hide the scroll indicator
        if (window.scrollY < 100) {
            document.body.classList.add('at-top');
            scrollContainer.style.opacity = '0';
        } else {
            document.body.classList.remove('at-top');
            scrollContainer.style.opacity = '1';
        }
    }

    // Initialize scroll indicator on page load
    updateScrollIndicator();
    
    // Add scroll event listener to update indicator on scroll
    window.addEventListener('scroll', updateScrollIndicator, { passive: true });
    
    // Update on resize as well (important for mobile orientation changes)
    window.addEventListener('resize', updateScrollIndicator, { passive: true });

    // Add click event to scroll indicator to scroll to top
    $(document).on('click', '.scroll-indicator-container', function () {
        // Reset the active section tracking
        if (typeof currentActiveSection !== 'undefined') {
            currentActiveSection = 'home';
        }
        if (typeof isSectionScrollLocked !== 'undefined') {
            isSectionScrollLocked = false;
        }
        if (typeof lockScrollTimeout !== 'undefined') {
            clearTimeout(lockScrollTimeout);
        }

        // Scroll to top smoothly
        $('html, body').animate({
            scrollTop: 0
        }, 800, function () {
            // After scrolling completes, update active section in navbar
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#home"]').addClass('active');
        });
    });


    // Form validation
    $('#contactForm').submit(function (event) {
        event.preventDefault();

        // Basic validation
        var isValid = true;
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var message = $('#message').val();

        if (firstName === '') {
            isValid = false;
            $('#firstName').addClass('is-invalid');
        } else {
            $('#firstName').removeClass('is-invalid');
        }

        if (lastName === '') {
            isValid = false;
            $('#lastName').addClass('is-invalid');
        } else {
            $('#lastName').removeClass('is-invalid');
        }

        if (email === '' || !isValidEmail(email)) {
            isValid = false;
            $('#email').addClass('is-invalid');
        } else {
            $('#email').removeClass('is-invalid');
        }

        if (message === '') {
            isValid = false;
            $('#message').addClass('is-invalid');
        } else {
            $('#message').removeClass('is-invalid');
        }

        if (isValid) {
            // Here you would normally send the form to the server
            // For now, just show a success message
            $('#contactForm').hide();
            $('.form-success').fadeIn();
        }
    });

    // Email validation helper
    function isValidEmail(email) {
        var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return pattern.test(email);
    }



    // Initialize the carousel for the educational services section
    // Make first educational service active by default 
    $('.educational-services .service-item:first').addClass('active');

    // Make service-name clickable like service-toggle
    $('.service-name').on('click', function() {
        // Find the parent service item and its toggle button
        const serviceItem = $(this).closest('.service-item');
        const toggleButton = serviceItem.find('.service-toggle');
        
        // Trigger the click on the toggle button to reuse existing functionality
        toggleButton.trigger('click');
    });

    // Educational Services Toggle
    $('.service-toggle').on('click', function() {
        const serviceItem = $(this).closest('.service-item');
        const toggleIcon = $(this).find('i');
        
        // Close other open items
        $('.service-item.active').not(serviceItem).removeClass('active');
        
        // Toggle current item
        serviceItem.toggleClass('active');
        
        // No need to change icon class - CSS will handle rotation based on active state
    });

    // Ensure the service-menu links in the header work properly
    $('.services-menu .service-list li a').on('click', function() {
        // Allow default behavior to navigate to the service page
        return true;
    });

    /**
     * Flash Effect for "Let's Talk" Button
     * 
     * This creates a smooth transition with branded overlay when clicking any "Let's Talk" button.
     * The effect has the following steps:
     * 1. Creates a white overlay with the JADCO logo and "SCROLLING..." text with animated dots
     * 2. Fades in the overlay to hide the current view
     * 3. Navigates to the contact section while the overlay is visible (hiding the scrolling)
     * 4. Fades out the overlay to reveal the contact section
     */
    // Define the function globally so it can be called from Vue components
    window.createFlashEffect = function() {
        // Get the target section (contact)
        const targetId = 'contact';
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Step 1: Create the overlay with proper styling
            const flashOverlay = $('<div id="flash-overlay"></div>').css({
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'width': '100%',
                'height': '100%',
                'background-color': 'white',
                'z-index': 9999,
                'opacity': 0, // Start invisible
                'pointer-events': 'none',
                'display': 'flex',
                'flex-direction': 'column', // Stack elements vertically
                'align-items': 'center',
                'justify-content': 'center' // Center content
            });
            
            // Step 2: Add logo to overlay
            const logo = $('<img>').attr({
                'src': '/images/logo.png', // Using direct path for static.js
                'alt': 'JADCO Logo'
            }).css({
                'width': '15rem',
                'height': 'auto',
                'opacity': '0.5', // Semi-transparent logo
                'margin-bottom': '.5rem' // Space between logo and text
            });
            
            // Step 3: Create text with animated dots
            const loadingTextContainer = $('<div>').css({
                'font-size': '1rem',
                'font-weight': 'bold',
                'color': '#e0285a', // Primary brand color
                'opacity': '0.3',
                'letter-spacing': '0.2rem',
            });
            
            // Step 4: Add elements to DOM
            flashOverlay.append(logo);
            flashOverlay.append(loadingTextContainer);
            $('body').append(flashOverlay);
            
            // Step 5: Set up dots animation
            let dotCount = 0;
            const maxDots = 3;
            const updateDots = setInterval(function() {
                // Cycle through 0-3 dots
                dotCount = (dotCount + 1) % (maxDots + 1);
                let dots = '';
                for (let i = 0; i < dotCount; i++) {
                    dots += '.';
                }
                
                // Pad with non-breaking spaces to prevent text shifting
                while (dots.length < maxDots) {
                    dots += '&nbsp;';
                }
                
                // Update the text
                loadingTextContainer.html('SCROLLING' + dots);
            }, 300); // Update every 300ms
            
            // Step 6: Fade in the overlay
            flashOverlay.animate({
                opacity: 1  // Fade to fully opaque (100%)
            }, 450, function() {
                // Step 7: Navigate to contact section (hidden behind overlay)
                // Scroll to the contact section on the current page
                window.scrollTo(0, targetSection.offsetTop);
                
                // Step 8: Wait a brief moment before revealing
                setTimeout(function() {
                    // Step 9: Fade out to reveal contact section
                    flashOverlay.animate({
                        opacity: 0
                    }, 300, function() {
                        // Step 10: Clean up
                        clearInterval(updateDots); // Stop the animation
                        $(this).remove(); // Remove overlay from DOM
                    });
                }, 1000); // Hold overlay visible for 450ms
            });
        }
    };
    
    // Event handler for .btn-talk elements not controlled by Vue
    $('.btn-talk').on('click', function(e) {
        e.preventDefault();
        window.createFlashEffect();
    });

});