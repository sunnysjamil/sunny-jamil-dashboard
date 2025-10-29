// Wait for the HTML document to finish loading
document.addEventListener("DOMContentLoaded", function() {

    // --- Load the Header ---
    fetch("_header.html")
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text(); // Convert the response to text (HTML)
        })
        .then(data => {
            // Inject the fetched HTML into the placeholder div
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching header:', error);
        });

    // --- Load the Footer ---
    fetch("_footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            // Inject the fetched HTML into the placeholder div
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching footer:', error);
        });
        
});