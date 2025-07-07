const navbarContainer = document.getElementById("navbar-container");

function loadNavbar(view) {
  const file =
    view === "desktop"
      ? "components/navbar/navbar-desktop.html"
      : "components/navbar/navbar-mobile.html";

  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      navbarContainer.innerHTML = html;
    })
    .catch((err) => console.error("Navbar load error:", err));
}

// Detect initial screen size
let currentView = window.innerWidth >= 992 ? "desktop" : "mobile";
loadNavbar(currentView);

// Watch for resize and switch navbar dynamically
window.addEventListener("resize", () => {
  const newView = window.innerWidth >= 992 ? "desktop" : "mobile";
  if (newView !== currentView) {
    currentView = newView;
    loadNavbar(currentView);
  }
});

if (navbarContainer) {
  console.log("Navbar loaded successfully!");
} else {
  console.log("Navbar not loaded. Please reload this webpage");
}