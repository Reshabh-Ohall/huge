function adjustScale() {
    const baseWidth = 375; // Base viewport width for scale 1
    const scaleFactor = window.innerWidth <= baseWidth ? window.innerWidth / baseWidth : 1;
    document.documentElement.style.setProperty('--scale-factor', scaleFactor);
}

// Initial adjustment on load
adjustScale();

// Adjust scale factor on window resize or orientation change
window.addEventListener('resize', adjustScale);
window.addEventListener('orientationchange', adjustScale);