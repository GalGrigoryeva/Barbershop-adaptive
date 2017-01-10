//Order
var orderForm = document.querySelector(".order-form");
var orderSuccess = document.querySelector(".modal-success");
var orderFailure = document.querySelector(".modal-failure");

var userName = orderForm.querySelector("[name=name]");
var userSurname = orderForm.querySelector("[name=surname]");
var userPatronymic = orderForm.querySelector("[name=patronymic]");
var userTel = orderForm.querySelector("[name=tel]");
var userEmail = orderForm.querySelector("[name=email]");

var userData = [userName, userSurname, userPatronymic, userTel, userEmail];

var storageUserName = localStorage.getItem("userName");
var storageUserSurname = localStorage.getItem("userSurname");
var storageUserPatronymic = localStorage.getItem("userPatronymic");

//Popup
var failureBtn = document.querySelector(".modal-failure__btn");
var successBtn = document.querySelector(".modal-success__btn");

//Order logic
if (storageUserName) {
  userName.value = storageUserName;
}

if (storageUserSurname) {
  userSurname.value = storageUserSurname;
}

if (storageUserPatronymic) {
  userPatronymic.value = storageUserPatronymic;
}

userName.addEventListener("change", function(event) {
  localStorage.setItem("userName", userName.value);
});

userSurname.addEventListener("change", function(event) {
  localStorage.setItem("userSurname", userSurname.value);
});

userPatronymic.addEventListener("change", function(event) {
  localStorage.setItem("userPatronymic", userPatronymic.value);
});

orderForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!userName.value || !userSurname.value || !userTel.value || !userEmail.value) {
    orderFailure.classList.add("modal-failure-show");
    overlay.classList.add("modal-overlay-show");
  } else {
    overlay.classList.add("modal-overlay-show");
    orderSuccess.classList.add("modal-success-show");
  }
});

//Popup logic
failureBtn.addEventListener("click", function(event) {
  event.preventDefault();
  overlay.classList.remove("modal-overlay-show");
  orderFailure.classList.remove("modal-failure-show");

  for (i = 0; i < userData.length; i++) {
    var arrItem = userData[i];
    if (!arrItem.value) {
      arrItem.focus();
      break;
    }
  }
});

successBtn.addEventListener("click", function(event) {
  event.preventDefault();
  overlay.classList.remove("modal-overlay-show");
  orderSuccess.classList.remove("modal-success-show");
});

//Closing logic
window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (orderSuccess.classList.contains("modal-success-show")) {
      overlay.classList.remove("modal-overlay-show");
      orderSuccess.classList.remove("modal-success-show");
    } else if (orderFailure.classList.contains("modal-failure-show")) {
      overlay.classList.remove("modal-overlay-show");
      orderFailure.classList.remove("modal-failure-show");
    }
  }
});

overlay.addEventListener("click", function(event) {
  if (orderSuccess.classList.contains("modal-success-show")) {
    overlay.classList.remove("modal-overlay-show");
    orderSuccess.classList.remove("modal-success-show");
  } else if (orderFailure.classList.contains("modal-failure-show")) {
    overlay.classList.remove("modal-overlay-show");
    orderFailure.classList.remove("modal-failure-show");
  }
});
