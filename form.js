"use strict";
let formElement = document.getElementById("registration-form");

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = {};

  // U S E R N A M E
  let usernameValue = document.getElementById("username-field").value;

  if (usernameValue.length < 3) {
    errors.username = "Username must be more than 3 characters";
  }
  if (usernameValue == "") {
    errors.username = "Username field can not be empty";
  }

  // P A S S W O R D
  let password1 = document.getElementById("password-field").value;
  let password2 = document.getElementById("password-field2").value;

  if (password1.length < 6) {
    errors.password = "Password must be more than 6 characters";
  }
  if (password1 == "") {
    errors.password = "Password field can not be empty";
  }

  if (password1 != password2) {
    errors.password2 = "Password do not match";
  }
  // R A D I O
  let userAge = false;
  document.querySelectorAll('[name="age"]').forEach((item) => {
    if (item.checked) {
      userAge = true;
    }
  });
  if (!userAge) {
    errors.age = "Please Select your Age";
  }

  // C H E C K B O X
  let agree = document.getElementById("agree").checked;
  if (!agree) {
    errors.agree = "You must agree our terms and conditions";
  }
  document.querySelectorAll(".error-text").forEach((content) => {
    content.innerText = "";
  });
  for (let objectKey in errors) {
    let pErrorElement = document.getElementById("error-" + objectKey);

    if (pErrorElement) {
      pErrorElement.innerText = errors[objectKey];
    }
    console.log(pErrorElement);
  }
  if (Object.keys(errors).length == 0) {
    formElement.submit();
  }
});
// Show Hide Password
let passwordField = document.getElementById("password-field");
let toggleIcone = document.getElementById("toggleIcon");

toggleIcone.addEventListener("click", function () {
  if (passwordField.type == "password") {
    passwordField.setAttribute("type", "text");
    toggleIcone.classList.remove("fa-eye");
    toggleIcone.classList.add("fa-eye-slash");
  } else {
    passwordField.setAttribute("type", "password");
    toggleIcone.classList.remove("fa-eye-slash");
    toggleIcone.classList.add("fa-eye");
  }
});

let emailField = document.getElementById("emailField");

emailField.addEventListener("keyup", function () {
  let emailValue = document.getElementById("emailField").value;
  let pErrorEmail = document.querySelector(".error-email");
  let emailPatter =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (emailValue.match(emailPatter)) {
    pErrorEmail.innerText = "your email is valid";
    pErrorEmail.style.color = "green";
    emailField.style.outline = "none";
    emailField.style.border = "solid 2px green";
  } else {
    pErrorEmail.innerText = "your email is invalid";
    pErrorEmail.style.color = "red";
    emailField.style.outline = "none";
    emailField.style.border = "solid 2px red";
  }
  if (emailValue == "") {
    pErrorEmail.innerHTML = " ";
    emailField.style.border = "solid 2px black";
  }
});

//Filter with async await
let searchFilter = document.getElementById("search");
let ulElement = document.getElementById("results");
let listItem = [];
async function asyncMyFunction() {
  let element = await fetch("https://reqres.in/api/users?page=2", {
    method: "get",
  });
  if (element.status !== 200) {
    throw "error";
  }
  let responsInfo = await element.json();
  return responsInfo;
}

asyncMyFunction()
  .then((dataJs) => {
    dataJs.data.forEach((object) => {
      let liElement = document.createElement("li");
      let pTag = document.createElement("p");
      pTag.innerText = `${object.first_name}`;
      let imgUser = document.createElement("img");
      imgUser.classList.add("image");
      imgUser.src = `${object.avatar}`;

      listItem.push(liElement);
      liElement.appendChild(pTag);
      liElement.appendChild(imgUser);
      ulElement.appendChild(liElement);
    });
  })
  .catch((error) => console.log(error));

function searchData(searchItem) {
  listItem.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

searchFilter.addEventListener("input", function (event) {
  console.log();
  searchData(event.target.value);
});
