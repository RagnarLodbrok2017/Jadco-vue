/**
 * Scroll Indicator Fix
 * This script addresses the issue with the scroll indicator stopping at 50%
 * when scrolling through the layered services section.
 */
$(document).ready(function() {
    // Fix for the scroll indicator on pages with services section
    function fixScrollIndicator() {
        console.log("Scroll indicator fix initialized");
        
        // Don't apply if we're on a page without services section
        if (!document.querySelector('.services-section')) {
            console.log("No services section found, not applying fix");
            return;
        }
        
        // Remove previous scroll handler for the indicator
        try {
            if (typeof window.updateScrollIndicator === 'function') {
                window.removeEventListener('scroll', window.updateScrollIndicator);
                console.log("Removed default scroll handler");
            }
        } catch (e) {
            console.log("Could not remove default handler: ", e);
        }
        
        // Custom scroll handler for pages with services section
        function customScrollHandler() {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (!scrollIndicator) return;
            
            // Get vertical scroll position and document dimensions
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const documentHeight = Math.max(
                document.body.scrollHeight, 
                document.documentElement.scrollHeight
            );
            const windowHeight = window.innerHeight;
            
            // Get sections to calculate relative position
            const sections = Array.from(document.querySelectorAll('section'));
            const footerContact = document.querySelector('#contact');
            const servicesSection = document.querySelector('.services-section');
            
            if (!servicesSection) return;
            
            // Find position of sections
            const aboutTop = sections[0] ? sections[0].offsetTop : 0;
            const servicesTop = servicesSection.offsetTop;
            const servicesHeight = servicesSection.offsetHeight;
            const contactTop = footerContact ? footerContact.offsetTop : documentHeight - windowHeight;
            
            // Calculate total scrollable height (adjusted for viewport)
            const totalScrollableHeight = documentHeight - windowHeight;
            
            // Calculate percentage based on page regions
            let scrollPercentage;
            
            if (scrollTop < servicesTop) {
                // Before services section: 0% to 30%
                scrollPercentage = (scrollTop / servicesTop) * 30;
            }
            else if (scrollTop >= servicesTop && scrollTop < contactTop) {
                // In services section: 30% to 80%
                const serviceProgress = (scrollTop - servicesTop) / (contactTop - servicesTop);
                scrollPercentage = 30 + (serviceProgress * 50);
            }
            else {
                // After services (in contact/footer): 80% to 100%
                const footerProgress = Math.min(1, (scrollTop - contactTop) / (totalScrollableHeight - contactTop));
                scrollPercentage = 80 + (footerProgress * 20);
            }
            
            // Ensure value is in valid range and apply
            scrollPercentage = Math.min(100, Math.max(0, scrollPercentage));
            scrollIndicator.style.height = scrollPercentage + '%';
            
            // Handle scroll indicator visibility
            const scrollContainer = document.querySelector('.scroll-indicator-container');
            if (scrollContainer) {
                if (scrollTop < 100) {
                    document.body.classList.add('at-top');
                    scrollContainer.style.opacity = '0';
                } else {
                    document.body.classList.remove('at-top');
                    scrollContainer.style.opacity = '1';
                }
            }
        }
        
        // Add our custom handler with passive flag for better performance
        window.addEventListener('scroll', customScrollHandler, { passive: true });
        
        // Initial call to set the indicator correctly on page load
        customScrollHandler();
        
        console.log("Custom scroll handler applied");
    }

    // Initialize the fix with a slight delay to ensure other scripts load first
    setTimeout(fixScrollIndicator, 500);
}); 