window.onload = function (event) {
   let userName = document.getElementById("user-name");
   let password = document.getElementById("password");
   let confirmPassword = document.getElementById("confirm-password");

   let form = document.getElementById("form");

   let logInBtn = document.getElementById("login-btn");

   const keyCodeEnter = 13;
   const keyCodeSpace = 32;

   form.addEventListener("submit", (event) => {
      if (event.submitter == logInBtn) {
         validateName(event);
         validatePassword(event);
         validateConfirmPassword(event);
         pushToLocal(event);
      } else {
         localStorage.removeItem("user");
      }
   });

   form.addEventListener("keydown", (event) => {
      if (event.keyCode === keyCodeEnter) {
         event.preventDefault();
      }
   });

   userName.addEventListener("change", (event) => {
      validateName(event);
   });

   password.addEventListener("change", (event) => {
      validatePassword(event);
   });

   userName.addEventListener("keypress", function (event) {
      forbidSpaces(event, event.target);
   });
   password.addEventListener("keypress", function (event) {
      forbidSpaces(event, event.target);
   });

   function validateName(event) {
      addError(userName);

      if (!userName.value.trim().length) {
         event.preventDefault();
         userName.nextElementSibling.innerHTML = "Type Your Name";
         userName.value = "";
         return false;
      } else {
         removeError(userName);
         userName.value = userName.value.trim();
      }

      return userName.value;
   }

   function validatePassword(event) {
      addError(password);
      if (
         password.value.trim().length > 0 &&
         password.value.trim().length <= 3
      ) {
         event.preventDefault();
         password.nextElementSibling.innerHTML = "Longer Than 3 Symbols";
      } else if (!password.value.length) {
         event.preventDefault();
         password.nextElementSibling.innerHTML = "Type Password";
      } else {
         removeError(password);
      }
   }

   function validateConfirmPassword(event) {
      addError(confirmPassword);
      if (!confirmPassword.value.length) {
         event.preventDefault();
         confirmPassword.nextElementSibling.innerHTML = "Confirm Password";
      } else if (password.value !== confirmPassword.value) {
         event.preventDefault();
         confirmPassword.nextElementSibling.innerHTML =
            "Passwords Have To Match";
         confirmPassword.focus();
         confirmPassword.select();
      } else {
         removeError(confirmPassword);
      }
   }

   function forbidSpaces(event, input) {
      if (event.keyCode === keyCodeSpace) {
         event.preventDefault();
         addError(input);
         input.nextElementSibling.innerHTML = "No Spaces";
      }
   }

   function addError(element) {
      element.classList.add("bike-registration__error");
   }

   function removeError(element) {
      element.nextElementSibling.innerHTML = "";
      element.classList.remove("bike-registration__error");
   }

   function pushToLocal(event) {
      if (validateName(event)) {
         let user = {
            userName: validateName(event),
         };

         localStorage.setItem("user", JSON.stringify(user));
         let userFromLocal = localStorage.getItem("user");
         userFromLocal = JSON.parse(userFromLocal);
         console.log(userFromLocal);
      }
   }
};
