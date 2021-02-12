export const form = document.getElementById("form");
export const allInputs = document.getElementsByClassName("bike-choise__input");
export const cardNumber = document.getElementById("card-number");
export const radioVisa = document.getElementById("card-type-visa");
export const radioMaster = document.getElementById("card-type-master");
export const errorTextRadio = document.getElementById("error-text-radio");

export function addError(element) {
   element.classList.add("bike-registration__error");
}

export function setErrorText(element, text) {
   element.nextElementSibling.innerHTML = text;
}

export function removeError(element) {
   element.nextElementSibling.innerHTML = "";
   element.classList.remove("bike-registration__error");
}

export function addErrorIfAnyInputEmpty(input) {
   if (!input.value) {
      addError(input);
      setErrorText(input, "Required");
   } else {
      removeError(input);
   }
}

export function validateCardNumber() {
   if (cardNumber.value == "") {
      addError(cardNumber);
      setErrorText(cardNumber, "Required");
      return false;
   } else if (cardNumber.value.length !== 16) {
      addError(cardNumber);
      setErrorText(cardNumber, "Invalid Card Number");
      return false;
   } else {
      removeError(cardNumber);
      return cardNumber.value;
   }
}

export function validateRadioButton() {
   if (!radioVisa.checked && !radioMaster.checked) {
      errorTextRadio.innerHTML = "Required";
   } else {
      errorTextRadio.innerHTML = "";
   }

   if (radioVisa.checked) {
      return radioVisa.value;
   } else if (radioMaster.checked) {
      return radioMaster.value;
   }
}