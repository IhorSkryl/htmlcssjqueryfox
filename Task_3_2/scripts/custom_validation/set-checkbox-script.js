import { addErrorIfAnyInputEmpty } from "../export_scripts/export";

const checkbox = document.getElementById("same-address-checkbox");

const billingStreetAddress = document.getElementById("billing-street-address");
const billingStateRegion = document.getElementById("billing-state-region");
const billingZipCode = document.getElementById("billing-zip-code");
const billingPhone = document.getElementById("billing-phone");

const deliveryStreetAddress = document.getElementById(
   "delivery-street-address"
);
const deliveryStateRegion = document.getElementById("delivery-state-region");
const deliveryZipCode = document.getElementById("delivery-zip-code");
const deliveryPhone = document.getElementById("delivery-phone");

const billingAddresses = document.getElementsByClassName(
   "bike-choise__billing-address"
);
const deliveryAddresses = document.getElementsByClassName(
   "bike-choise__delivery-address"
);

checkbox.addEventListener("click", (event) => {
   setDeliveryAddressIfChecked();
});

Array.from(billingAddresses).map((billingAddress) => {
   billingAddress.addEventListener("change", (event) => {
      setDeliveryIfCheckedAndItsNotAsBilling();
      addErrorIfAnyInputEmpty(billingAddress);
   });
});

Array.from(deliveryAddresses).map((deliveryAddress) => {
   deliveryAddress.addEventListener("change", (event) => {
      clearDeliveryAndSetUncheckedIfWasChecked();
   });
});

function setDeliveryAddressIfChecked() {
   if (checkbox.checked) {
      deliveryStreetAddress.value = billingStreetAddress.value;
      deliveryStateRegion.value = billingStateRegion.value;
      deliveryZipCode.value = billingZipCode.value;
      deliveryPhone.value = billingPhone.value;
      
      addErrorIfDeliveryEmpty();
      addErrorIfBillingEmpty();
   } else {
      deliveryStreetAddress.value = "";
      deliveryStateRegion.value = "";
      deliveryZipCode.value = "";
      deliveryPhone.value = "";
   }
}

function addErrorIfDeliveryEmpty() {
   Array.from(deliveryAddresses).map((deliveryAddress, index) => {
      addErrorIfAnyInputEmpty(deliveryAddress);
   });
}

function addErrorIfBillingEmpty() {
   Array.from(billingAddresses).map((billingAddress, index) => {
      addErrorIfAnyInputEmpty(billingAddress);
   });
}

function setDeliveryIfCheckedAndItsNotAsBilling() {
   if (
      deliveryStreetAddress.value !== billingStreetAddress.value ||
      deliveryStateRegion.value !== billingStateRegion.value ||
      deliveryZipCode.value !== billingZipCode.value ||
      deliveryPhone.value !== billingPhone.value
   ) {
      if (checkbox.checked) {
         deliveryStreetAddress.value = billingStreetAddress.value;
         deliveryStateRegion.value = billingStateRegion.value;
         deliveryZipCode.value = billingZipCode.value;
         deliveryPhone.value = billingPhone.value;

         addErrorIfDeliveryEmpty();
      }
   }
}

function clearDeliveryAndSetUncheckedIfWasChecked() {
   if (
      deliveryStreetAddress.value !== billingStreetAddress.value ||
      deliveryStateRegion.value !== billingStateRegion.value ||
      deliveryZipCode.value !== billingZipCode.value ||
      deliveryPhone.value !== billingPhone.value
   ) {
      if (checkbox.checked) {
         checkbox.checked = false;

         if (deliveryStreetAddress.value == billingStreetAddress.value) {
            deliveryStreetAddress.value = "";
         }

         if (deliveryStateRegion.value == billingStateRegion.value) {
            deliveryStateRegion.value = "";
         }

         if (deliveryZipCode.value == billingZipCode.value) {
            deliveryZipCode.value = "";
         }
      }
   }
}
