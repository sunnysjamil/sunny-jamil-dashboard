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
        // Get the filename of the current page (e.g., "resume.html" or "index.html")
        const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';
        
        const navLinks = document.querySelectorAll('#nav-placeholder nav a');
        
        navLinks.forEach(link => {
            // Get the filename from the link's href (e.g., from "./resume.html" get "resume.html")
            const linkFile = link.getAttribute('href').split('/').pop();

            // If the link's file matches the current page's file, highlight it.
            // The check for 'index.html' handles the case where the link is just "./"
            if (linkFile === currentPageFile || (linkFile === '' && currentPageFile === 'index.html')) {
                link.classList.remove('text-gray-600', 'hover:text-indigo-600');
                link.classList.add('text-indigo-600', 'font-semibold');
            }
        });
    };
    
    // Load navigation and then call the function to highlight the active link.
    loadComponent(`${basePath}_nav.html`, "nav-placeholder", highlightActiveNav);
    
    // Load the footer.
    loadComponent(`${basePath}_footer.html`, "footer-placeholder");
});