/**
 * Claimr Shared Header & Footer Loader
 * Include this script in any code.html page to load universal navigation
 * 
 * Usage: Add this script tag before </body> in your HTML:
 * <script src="../../shared-nav-loader.js"></script>
 * 
 * Or for pages in root subdirectories:
 * <script src="../shared-nav-loader.js"></script>
 */

(function() {
    // Determine the correct path to shared files based on current page depth
    function getBasePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s.length > 0);
        
        // Count how many directory levels deep we are
        // For local file paths, check the referrer or use a heuristic
        const depth = segments.length - 1; // -1 for the filename
        
        if (depth <= 1) {
            // Pages in root or first level subdirectory
            return '.';
        } else if (depth === 2) {
            // Pages like /folder/code.html
            return '..';
        } else {
            // Deeper nesting
            return '../'.repeat(depth - 1);
        }
    }

    // Alternative: detect path from document structure
    function detectBasePath() {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptSrc = currentScript.src;
        
        if (scriptSrc.includes('shared-nav-loader.js')) {
            // Calculate relative path from script location
            const pathParts = scriptSrc.split('/');
            pathParts.pop(); // Remove filename
            const depth = pathParts.length;
            
            if (depth <= 1) return '.';
            return '../'.repeat(depth - 1);
        }
        
        return getBasePath();
    }

    // Load header
    function loadHeader(basePath) {
        const headerContainer = document.getElementById('shared-header') || document.querySelector('header[data-shared]');
        if (headerContainer) {
            fetch(`${basePath}/SHARED_HEADER.html`)
                .then(response => {
                    if (!response.ok) throw new Error('Header not found');
                    return response.text();
                })
                .then(html => {
                    headerContainer.outerHTML = html;
                    // Reinitialize any scripts that need to run after header loads
                    window.dispatchEvent(new Event('header-loaded'));
                })
                .catch(error => {
                    console.warn('Could not load shared header:', error);
                    console.log('Base path used:', basePath);
                });
        }
    }

    // Load footer
    function loadFooter(basePath) {
        const footerContainer = document.getElementById('shared-footer') || document.querySelector('footer[data-shared]');
        if (footerContainer) {
            fetch(`${basePath}/SHARED_FOOTER.html`)
                .then(response => {
                    if (!response.ok) throw new Error('Footer not found');
                    return response.text();
                })
                .then(html => {
                    footerContainer.outerHTML = html;
                    window.dispatchEvent(new Event('footer-loaded'));
                })
                .catch(error => {
                    console.warn('Could not load shared footer:', error);
                });
        }
    }

    // Initialize when DOM is ready
    function init() {
        const basePath = detectBasePath();
        
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            loadHeader(basePath);
            loadFooter(basePath);
        }, 100);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
