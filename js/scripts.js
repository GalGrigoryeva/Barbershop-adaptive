// Main navigation
var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

//Popup
var link = document.querySelector(".main-nav__user-login");
var popup = document.querySelector(".modal-content");
var close = popup.querySelector(".modal-content__btn--close");
var overlay = document.querySelector(".modal-overlay");

//Form
var form = popup.querySelector(".modal-content__login-form");
var login = popup.querySelector("[name=login]");
var password = popup.querySelector("[name=password]");
var storageName = localStorage.getItem("login");

//Popup logic
link.addEventListener("click", function(event) {
  event.preventDefault();
  overlay.classList.add("modal-overlay-show");
  popup.classList.add("modal-content-show");
  var storageName = localStorage.getItem("login");
  console.log(storageName);
  if (storageName) {
    login.value = storageName;
    password.focus();
  } else {
    login.focus();
  }
});

close.addEventListener("click", function(event) {
  event.preventDefault();

  overlay.classList.remove("modal-overlay-show");
  popup.classList.remove("modal-content-show");
  popup.classList.remove("modal-content-error");
});

//Form logic
login.addEventListener("change", function(event) {
  localStorage.setItem("login", login.value);
});

form.addEventListener("submit", function(event) {
  if (!login.value || !password.value) {
    event.preventDefault();
    popup.classList.add("modal-content-error");
    if (!login.value) {
      login.focus();
    } else {
      password.focus();
    }
  }
});

//Closing logic
window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (popup.classList.contains("modal-content-show")) {
      overlay.classList.remove("modal-overlay-show");
      popup.classList.remove("modal-content-show");
      popup.classList.remove("modal-content-error");
    } else if (popup.classList.contains("modal-content-show") && navMain.classList.contains("main-nav--opened")) {
      overlay.classList.remove("modal-overlay-show");
      popup.classList.remove("modal-content-show");
      popup.classList.remove("modal-content-error");
    } else if (navMain.classList.contains("main-nav--opened")) {
      navMain.classList.remove("main-nav--opened");
      navMain.classList.add("main-nav--closed");
    }
  }
});

overlay.addEventListener("click", function(event) {
  if (popup.classList.contains("modal-content-show")) {
    popup.classList.remove("modal-content-show");
    overlay.classList.remove("modal-overlay-show");
    popup.classList.remove("modal-content-error");
  }
});
