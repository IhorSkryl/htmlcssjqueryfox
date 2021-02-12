import { form } from "../export_scripts/export";
import { validateCardNumber } from "../export_scripts/export";
import { validateRadioButton } from "../export_scripts/export";
import { allInputs } from "../export_scripts/export";

const errors = document.getElementsByTagName("small");

form.addEventListener("submit", (event) => {
   pushToLocalStorage(event);
});

function pushToLocalStorage(event) {
   let userData = prepareDataToLocal();

   Array.from(errors).map((error, index) => {
      if (!error.innerHTML) {
         localStorage.setItem("userLocal", JSON.stringify(userData));
      } else {
         event.preventDefault();
         localStorage.removeItem("userLocal");
      }
   });
}

function prepareDataToLocal() {
   const validData = {};

   Array.from(allInputs).map((input, index) => {
      if (validateCardNumber()) {
         if (input.id == "select-bike") {
            validData.bike = input.value;
         }
         if (input.id == "textarea-comment") {
            validData.comment = input.value;
         }
         if (input.id == "first-name") {
            validData.firstName = input.value;
         }
         if (input.id == "last-name") {
            validData.lastName = input.value;
         }
         if (input.id == "billing-street-address") {
            validData.billingStreetAddress = input.value;
         }
         if (input.id == "billing-state-region") {
            validData.billingStateRegion = input.value;
         }
         if (input.id == "billing-zip-code") {
            validData.billingZipCode = input.value;
         }
         if (input.id == "billing-phone") {
            validData.billingPhone = input.value;
         }
         if (input.id == "delivery-street-address") {
            validData.deliveryStreetAddress = input.value;
         }
         if (input.id == "delivery-state-region") {
            validData.deliveryStateRegion = input.value;
         }
         if (input.id == "delivery-zip-code") {
            validData.deliveryZipCode = input.value;
         }
         if (input.id == "delivery-phone") {
            validData.deliveryPhone = input.value;
         }
         if (input.id == "delivery-day") {
            validData.deliveryDay = input.value;
         }
         if (input.id == "delivery-month") {
            validData.deliveryMonth = input.value;
         }
         if (input.id == "delivery-year") {
            validData.deliveryYear = input.value;
         }
         if (input.id == "card-number") {
            validData.cardNumber = input.value;
         }
         if (input.id == "expiration-month") {
            validData.expirationMonth = input.value;
         }
         if (input.id == "expiration-year") {
            validData.expirationYear = input.value;
         }
      }
      validData.cardType = validateRadioButton();
   });

   for (var key in validData) {
      if (validData[key] == undefined || validData[key] == "") {
         delete validData[key];
      }
   }

   return validData;
}
