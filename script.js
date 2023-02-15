// Define a function to generate a random string of 5 alphanumeric characters
function generateUrlCode() {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let urlCode = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    urlCode += alphabet[randomIndex];
  }

  return urlCode;
}

// Define a function to shorten a URL
function shortenUrl(event) {
  event.preventDefault();
  const urlInput = document.getElementById("url");
  const shortenedUrlLink = document.getElementById("shortenedUrl");

  // Check if the URL is already shortened
  if (localStorage.getItem(urlInput.value)) {
    shortenedUrlLink.href = localStorage.getItem(urlInput.value);
    shortenedUrlLink.textContent = localStorage.getItem(urlInput.value);
    return;
  }

  // Generate a unique URL code
  let urlCode = generateUrlCode();
  while (localStorage.getItem(urlCode)) {
    urlCode = generateUrlCode();
  }

  // Create the shortened URL and store the mapping in localStorage
  const shortenedUrl = window.location.origin + "/" + urlCode;
  localStorage.setItem(urlInput.value, shortenedUrl);
  localStorage.setItem(shortenedUrl, urlInput.value);

  shortenedUrlLink.href = shortenedUrl;
  shortenedUrlLink.textContent = shortenedUrl;
}

// Define a function to redirect from a shortened URL to the original URL
function redirectToOriginalUrl() {
  const urlCode = window.location.pathname.substring(1);
  const originalUrl = localStorage.getItem(window.location.origin + "/" + urlCode);

  if (originalUrl) {
    window.location.href = originalUrl;
  } else {
    alert("Invalid URL");
  }
}

// Check if the current page is a shortened URL and redirect if necessary
if (window.location.pathname !== "/" && window.location.pathname.length === 6) {
  redirectToOriginalUrl();
}
