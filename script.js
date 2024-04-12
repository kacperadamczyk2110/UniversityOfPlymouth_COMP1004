var lastScrollTopNavbar = 0; // Variable for navbar scroll position
var lastScrollTopCart = 0; // Variable for cart scroll position

// Event listener for navbar scrolling
window.addEventListener("scroll", function() {
  var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTopNavbar) {
    // Scrolling down
    document.getElementById("navbar").style.top = "-50px"; // Hide the navigation bar
  } else {
    // Scrolling up
    document.getElementById("navbar").style.top = "0"; // Show the navigation bar
  }
  lastScrollTopNavbar = currentScroll;
});

// Get the cart popup
var cartPopup = document.getElementById("cart-popup");

// Get the cart button and count
var cartButton = document.getElementById("cart-button");
var cartCount = document.getElementById("cart-count");

// Get the close button for the cart popup
var cartCloseButton = document.querySelector("#cart-popup .close");

// When the user clicks the cart button, open the cart popup
cartButton.onclick = function() {
  cartPopup.style.display = "block";
}

// When the user clicks on the close button, close the cart popup
cartCloseButton.onclick = function() {
  cartPopup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == cartPopup) {
    cartPopup.style.display = "none";
  }
}

// Function to update the cart count
function updateCartCount(count) {
  cartCount.innerText = count;
}

// Get the login popup
var loginPopup = document.getElementById("login-popup");

// Get the login button
var loginButton = document.getElementById("login-button");

// Get the close button for the login popup
var loginCloseButton = document.querySelector("#login-popup .close");

// When the user clicks the login button, open the login popup
loginButton.onclick = function() {
  loginPopup.style.display = "block";
}

// When the user clicks on the close button, close the login popup
loginCloseButton.onclick = function() {
  loginPopup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
  if (event.target == loginPopup) {
    loginPopup.style.display = "none";
  }
}
var showRegisterLink = document.getElementById("show-register");
var showLoginLink = document.getElementById("show-login");

// Get the login and registration forms
var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");

// When the user clicks the "Register" link, show the registration form and hide the login form
showRegisterLink.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// When the user clicks the "Login" link, show the login form and hide the registration form
showLoginLink.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});