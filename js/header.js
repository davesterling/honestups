window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 0);
});

// JavaScript to toggle the site header
function toggleSiteHeader() {
  const siteHeader = document.getElementById("site-header");
  siteHeader.classList.toggle("open");

  const header = document.querySelector("header");
  header.classList.toggle("open");

  const mainNav = document.querySelector("#main-nav");

  if (siteHeader.classList.contains("open")) {
    mainNav.style.display = "none";
    // Hide the text within <a> elements in #main-nav
    const navLinks = document.querySelectorAll("#main-nav a");
    navLinks.forEach(function (link) {
      link.style.opacity = 0;
    });
  } else {
    // Check the screen size before showing main-nav
    if (window.innerWidth > 760) {
      mainNav.style.display = "flex";
      // Show the text within <a> elements in #main-nav
      const navLinks = document.querySelectorAll("#main-nav a");
      navLinks.forEach(function (link) {
        link.style.opacity = 1;
      });
    }
    // Hide the text within <a> elements in #site-header
    const siteHeaderLinks = document.querySelectorAll("#site-header a");
    siteHeaderLinks.forEach(function (link) {
      link.style.opacity = 0;
    });
  }
}

// JavaScript to close the site header when clicking a tab or outside of it
document.addEventListener("click", function (event) {
  const siteHeader = document.getElementById("site-header");
  const header = document.querySelector("header");
  const mainNav = document.querySelector("#main-nav");

  if (siteHeader.classList.contains("open")) {
    if (
      !event.target.closest("#site-header") &&
      !event.target.closest("#logo") &&
      !event.target.closest(".cart-icon-button")
    ) {
      siteHeader.classList.remove("open");
      header.classList.remove("open");
      // Check the screen size before showing main-nav
      if (window.innerWidth > 760) {
        mainNav.style.display = "flex";
        // Show the text within <a> elements in #main-nav
        const navLinks = document.querySelectorAll("#main-nav a");
        navLinks.forEach(function (link) {
          link.style.opacity = 1;
        });
      }
    }
  }
});

function redirect() {
  // Check if the current page's path is not the root path or index page
  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/index.html"
  ) {
    // If not, navigate to ".com"
    window.location.href = "https://honestups.com";
  }
}

function closeSiteHeader() {
  const siteHeader = document.getElementById("site-header");
  siteHeader.classList.remove("open");
}

// Get all elements with the class "close-button"
const closeButtonElements = document.querySelectorAll(".close-button");

// Toggle the visibility of close buttons when the site header opens
document
  .getElementById("site-header")
  .addEventListener("transitionend", function () {
    if (this.classList.contains("open")) {
      closeButtonElements.forEach((button) => {
        button.style.opacity = 1;
      });
    } else {
      closeButtonElements.forEach((button) => {
        button.style.opacity = 0;
      });
    }
  });

document.querySelector(".cart-icon-button").addEventListener("click", () => {
  toggleSiteHeader();
});
