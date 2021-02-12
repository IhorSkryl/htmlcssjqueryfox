import { addError } from "../export_scripts/export";
import { setErrorText } from "../export_scripts/export";
import { removeError } from "../export_scripts/export";
import { form } from "../export_scripts/export";

const phoneNumbers = document.getElementsByClassName("bike-choise__phone");

const billingPhone = document.getElementById("billing-phone");
const deliveryPhone = document.getElementById("delivery-phone");

form.addEventListener("submit", (event) => {
   validatePhoneNumber(billingPhone, event);
   validatePhoneNumber(deliveryPhone, event);
});

Array.from(phoneNumbers).map((phoneNumber) => {
   phoneNumber.addEventListener("change", (event) => {
      validatePhoneNumber(phoneNumber, event);
   });
});

function validatePhoneNumber(element, event) {
   let phonePattern = /[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}/;

   if (element.value == "") {
      event.preventDefault();
      addError(element);
      setErrorText(element, "Required");
   } else if (
      !element.value.match(phonePattern) ||
      element.value.length !== 10
   ) {
      event.preventDefault();
      addError(element);
      setErrorText(element, "Invalid Phone Number");
   } else {
      removeError(element);
   }
}
