import { form } from "../export_scripts/export";
import { validateCardNumber } from "../export_scripts/export";
import { cardNumber } from "../export_scripts/export";

form.addEventListener("submit", (event) => {
   validateCardNumber();
});

cardNumber.addEventListener("input", (event) => {
   validateCardNumber();
});
cardNumber.addEventListener("change", (event) => {
   validateCardNumber();
});