// Wait for the HTML document to finish loading
document.addEventListener("DOMContentLoaded", function() {

    /**
     * Fetches HTML content from a file and injects it into a placeholder element.
     * @param {string} componentPath - The path to the HTML component file.
     * @param {string} placeholderId - The ID of the element to inject the HTML into.
     * @param {function} [callback] - An optional callback function to run after the component is loaded.
     */
    const loadComponent = (componentPath, placeholderId, callback) => {
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok for ${componentPath}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                    if (callback) {
                        callback();
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching ${componentPath}:`, error);
            });
    };
    
    // Determine the base path. For GitHub Pages, it's "/<repository-name>". For local, it's "".
    const isGitHubPages = window.location.hostname.includes('github.io');
    const repoName = 'sunny.salmanjamil.me'; // Your repository name
    const basePath = isGitHubPages ? `/${repoName}` : '';

    /**
     * Highlights the active navigation link based on the current page URL.
     */
    const highlightActiveNav = () => {
        // Adjust for the base path on GitHub Pages
        const currentPage = window.location.pathname.replace(basePath, '').split('/').pop() || 'index.html';
        // Handle the case where the path is the root (e.g., "index.html" or just "/")
        const activePage = currentPage === '' ? 'index.html' : currentPage;
        
        const navLinks = document.querySelectorAll('#nav-placeholder nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === activePage || (linkPage === '' && activePage === 'index.html')) {
                link.classList.remove('text-gray-600', 'hover:text-indigo-600');
                link.classList.add('text-indigo-600', 'font-semibold');
            }
        });
    };
    
    // Load navigation and then call the function to highlight the active link.
    loadComponent(`${basePath}/_nav.html`, "nav-placeholder", highlightActiveNav);
    
    // Load the footer.
    loadComponent(`${basePath}/_footer.html`, "footer-placeholder");
});