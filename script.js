var lastScrollTop = 0;

window.addEventListener("scroll", function() {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    // Scrolling down
    document.getElementById("navbar").style.top = "-50px"; // Hide the navigation bar
  } else {
    // Scrolling up
    document.getElementById("navbar").style.top = "0"; // Show the navigation bar
  }
  lastScrollTop = currentScroll;
});

