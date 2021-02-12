window.onload = function (event) {
  const form = document.querySelector(".account__form");

  let promptElem;

  const nameInput = document.getElementById("name");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("password-confirm");
  const emailInput = document.getElementById("email");

  const checkboxes = document.querySelectorAll(".account__checkbox");

  const profile = document.querySelector(".account__profile-container");

  let data = {
    users: [
      {
        username: '',
        email: '',
        lodgings: [],
      },
    ],
  };

  const nameRegExp = /^[a-z0-9_-]{3,16}$/;
  const passwordRegExp = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  document.body.addEventListener("mouseover", function (event) {

    if (!event.target.dataset.prompt) {
      return;
    }

    promptElem = document.createElement("div");
    promptElem.className = "account__prompt-text";
    promptElem.innerHTML = event.target.dataset.prompt;
    event.target.nextElementSibling.append(promptElem);
  });

  document.body.addEventListener("mouseout", function (event) {
    if (promptElem) {
      promptElem.remove();
      promptElem = null;
    }
  })

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    validate(nameInput, nameRegExp, event);
    validate(passwordInput, passwordRegExp, event);
    validateConfirmPassword(event);
    validate(emailInput, emailRegExp, event);
    addUser();
    
  });

  function addUser () {
    data.users.map((user) => {
      user.username = nameInput.value;
      user.email = emailInput.value;
      addLodgings(user);
    })
    setProfile();
  }

  function addLodgings (user) {
    Array.from(checkboxes).map((checkbox) => {
      if (checkbox.checked) {
        user.lodgings.push(checkbox.value);
      } 
    })
  }

  function setProfile () {
    let output = `<h2>Profile</h2>`;
    data.users.map((user) => {
      if (!user.username || !user.email || user.lodgings.length == 0) {
        return;
      }
      output += `
        <ul>
         <li>
            <h3>Username</h3>
            <p>${user.username}</p>
          </li>
          <li>
            <h3>Email</h3>
            <p>${user.email}</p>
          </li>
          <li>
            <h3>Preffered Lodgings</h3>
            <ul class="account__lodgings-ul">
      `;
      user.lodgings.map((lodging) => {
        output += `
          <li>
            ${lodging}
          </li>
        `;
      })
    });
    output += `
          </ul>
        </li>
      </ul>
    `;
    profile.innerHTML = output;
  }

  nameInput.addEventListener("change", function (event) {
    validate(nameInput, nameRegExp, event);
  });

  passwordInput.addEventListener('change', function(event) {
    validate(passwordInput, passwordRegExp, event);
  });

  passwordConfirmInput.addEventListener("change", function (event) {
    validateConfirmPassword(event);
  });

  emailInput.addEventListener("change", function (event) {
    validate(emailInput, emailRegExp, event);
  });

  function validate(input, regExp, event) {
    if (!input.value) {
      event.preventDefault();
      addError(input);
      setErrorText(input, "Required");
    } else if (!input.value.match(regExp)) {
      event.preventDefault();
      addError(input);
      setErrorText(input, "Wrong format");
    } else {
      removeError(input);
    }
  }

  function validateConfirmPassword (event) {
    if (!passwordConfirmInput.value) {
      event.preventDefault();
      addError(passwordConfirmInput);
      setErrorText(passwordConfirmInput, "Required");
    } else if (passwordInput.value != passwordConfirmInput.value) {
      event.preventDefault();
      addError(passwordConfirmInput);
      setErrorText(passwordConfirmInput, "Passwords Have To Match");
      passwordConfirmInput.focus();
      passwordConfirmInput.select();
    } else {
      removeError(passwordConfirmInput);
    }
  }

  function addError(input) {
    input.classList.add("account__input_error");
  }

  function removeError(input) {
    input.classList.remove("account__input_error");
    input.nextElementSibling.innerHTML = "";
  }

  function setErrorText(input, text) {
    input.nextElementSibling.innerHTML = text;
  }
};
