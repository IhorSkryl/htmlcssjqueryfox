import { addError } from "../export_scripts/export";
import { setErrorText } from "../export_scripts/export";
import { form } from "../export_scripts/export";

const deliveryYear = document.getElementById("delivery-year");
const deliveryMonth = document.getElementById("delivery-month");
const deliveryDay = document.getElementById("delivery-day");

const expirationYear = document.getElementById("expiration-year");
const expirationMonth = document.getElementById("expiration-month");

let today = new Date();
let currentDayDate = today.getDate();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

form.addEventListener("submit", (event) => {
   checkIfDeliveryAndExpirationDatesValidSeparately();
});

deliveryYear.addEventListener("change", (event) => {
   setCorrectNumberOfMonths(deliveryMonth, deliveryYear);
   clearOptions(deliveryDay);
   createOptionWithPrompt(deliveryDay);
});

deliveryMonth.addEventListener("change", (event) => {
   setCorrectNumberOfDays(deliveryDay, deliveryMonth, deliveryYear);
});

expirationYear.addEventListener("change", (event) => {
   setCorrectNumberOfMonths(expirationMonth, expirationYear);
});

function setCorrectNumberOfMonths(month, year) {
   clearOptions(month);
   createOptionWithPrompt(month);

   if (year.value == currentYear) {
      for (let i = currentMonth; i <= 11; i++) {
         createMonthWithName(i, month);
      }
   } else {
      for (let i = 0; i <= 11; i++) {
         createMonthWithName(i, month);
      }
   }
}

function clearOptions(element) {
   while (element.firstChild) {
      element.removeChild(element.firstChild);
   }
}

function createOptionWithPrompt(element) {
   let option = document.createElement("option");
   option.setAttribute("disabled", "disabled");
   option.setAttribute("selected", "selected");

   if (element == deliveryDay) {
      option.innerHTML = "Choose Month First";
      if (!isNaN(parseInt(deliveryMonth.value))) {
         option.innerHTML = "Day";
      }
   } else {
      option.innerHTML = "Month";
   }

   element.append(option);
}

function daysInMonth(month, year) {
   return new Date(year, parseInt(month) + 1, 0).getDate();
} 

function setCorrectNumberOfDays(day, month, year) {
   clearOptions(day);
   createOptionWithPrompt(day);
   let amountOfDays = daysInMonth(month.value, year.value);

   for (let i = 1; i <= amountOfDays; i++) {
      addDays(i);
   }

   if (month.value == currentMonth && year.value == currentYear) {
      clearOptions(day);
      createOptionWithPrompt(day);
      for (let i = currentDayDate; i <= amountOfDays; i++) {
         addDays(i);
      }
   }
}

function addDays(i) {
   let option = document.createElement("option");
   option.setAttribute("value", i);
   option.innerHTML = i;
   deliveryDay.append(option);
}

function createMonthWithName(i, element) {
   let option = document.createElement("option");
   option.setAttribute("value", i);
   option.innerHTML = monthNames[i];
   element.append(option);
}

function checkIfDeliveryAndExpirationDatesValidSeparately() {
   if (deliveryMonth.value == "Month") {
      addError(deliveryMonth);
      setErrorText(deliveryMonth, "Required");
   }

   if (
      deliveryDay.value == "Day" ||
      deliveryDay.value == "Choose Month First"
   ) {
      addError(deliveryDay);
      setErrorText(deliveryDay, "Required");
   }

   if (expirationMonth.value == "Month") {
      addError(expirationMonth);
      setErrorText(expirationMonth, "Required");
   }
}
