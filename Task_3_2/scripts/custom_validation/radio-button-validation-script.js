import { form } from "../export_scripts/export";
import { validateRadioButton } from "../export_scripts/export";
import { radioVisa } from "../export_scripts/export";
import { radioMaster } from "../export_scripts/export";

form.addEventListener("submit", (event) => {
   validateRadioButton();
});

radioVisa.addEventListener("change", (event) => {
   validateRadioButton();
});

radioMaster.addEventListener("change", (event) => {
   validateRadioButton();
});