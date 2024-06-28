const { json } = require("express");

document.addEventListener("DOMContentLoaded", function() {
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const searchButton = document.getElementById("search-button");
    const authorInput = document.getElementById("author-input");
    const searchResults = document.getElementById("search-results");

    // Fetch and display a random quote
    function fetchQuote() {
        fetch("http://localhost:5000/api/quote")
            .then(response => response.json())
            .then(data => {
                quoteText.textContent = data.text;
                quoteAuthor.textContent = `- ${data.author}`;
            });
    }

    // Fetch and display quotes by author
    function searchQuotes(author) {
        fetch(`http://localhost:5000/api/quotes?author=${author}`)
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = "";
                if (data.length > 0) {
                    data.forEach(quote => {
                        const quoteElement = document.createElement("div");
                        quoteElement.innerHTML = `<p>"${quote.text}"</p><p>- ${quote.author}</p>`;
                        searchResults.appendChild(quoteElement);
                    });
                } else {
                    searchResults.innerHTML = "<p>No quotes found.</p>";
                }
            });
    }

    searchButton.addEventListener("click", function() {
        const author = authorInput.value.trim();
        if (author) {
            searchQuotes(author);
        }
    });

    // Initial fetch for random quote
    fetchQuote();
});
