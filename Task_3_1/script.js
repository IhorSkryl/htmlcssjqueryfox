window.onload = function (event) {
   let name = document.getElementById("name");
   let email = document.getElementById("email");

   let pass = document.getElementById("password");
   let confPass = document.getElementById("confirm-password");

   let form = document.getElementById("form");
   let error = document.getElementById("error");

   let formInputs = document.getElementsByClassName("registration__input");

   let logOutBtn = document.getElementById("logout-btn");
   let logInBtn = document.getElementById("login-btn");

   let user;

   form.addEventListener("submit", function (event) {
      event.preventDefault();
      validatePasswordAndSetLocal();
   });

   logOutBtn.addEventListener("click", function (event) {
      event.preventDefault();
      clearForm(formInputs);
      setButtonsVisible(false);
      removeFromLocal();
   });

   function User(name, email, password, confirmedPass) {
      this.name = name;
      (this.email = email),
      (this.password = password),
      (this.confirmedPass = confirmedPass);
   }

   function pushToLocal() {
      let user = new User(name.value, email.value, pass.value, confPass.value);
      localStorage.setItem("user", JSON.stringify(user));
      let userFromLocal = localStorage.getItem("user");
      userFromLocal = JSON.parse(userFromLocal);
      console.log(userFromLocal);
   }

   function validatePasswordAndSetLocal() {
      if (pass.value !== confPass.value) {
         error.classList.add("registration__error_visible");
         confPass.value = "";
         confPass.focus();
         setButtonsVisible(false);
      } else {
         error.classList.remove("registration__error_visible");
         pushToLocal();
         setButtonsVisible(true);
      }
   }

   function setButtonsVisible(isLogged) {
      if (isLogged) {
         document.getElementById("login-btn").style.display = "none";
         document.getElementById("fb-login-btn").style.display = "none";
         document.getElementById("logout-btn").style.display = "block";
      } else {
         document.getElementById("login-btn").style.display = "block";
         document.getElementById("fb-login-btn").style.display = "block";
         document.getElementById("logout-btn").style.display = "none";
      }
   }

   function clearForm(inputs) {
      for (let i = 0; i < inputs.length; i++) {
         inputs[i].value = "";
      }
   }

   function removeFromLocal() {
      localStorage.removeItem("user");
   }
};
