import { addErrorIfAnyInputEmpty } from "../export_scripts/export";
import { form } from "../export_scripts/export";
import { allInputs } from "../export_scripts/export";

form.addEventListener("submit", (event) => {
   Array.from(allInputs).map((input, index) => {
      addErrorIfAnyInputEmpty(input);
   });
});

Array.from(allInputs).map((input) => {
   input.addEventListener("change", (event) => {
      addErrorIfAnyInputEmpty(input);
   });
});
