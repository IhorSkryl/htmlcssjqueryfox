window.onload = function (event) {

  const hiddenInputs = document.getElementsByClassName("order2__hidden-input");

  const btn = document.getElementById("btn");

  const form = document.getElementById("form2");

  let output;

  setValuesToHidden();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    showSubmittedData();
    btn.disabled = true;
  });

  function showSubmittedData() {
    let data = new FormData(form);

    let div = document.createElement("div");
    div.classList.add("order2__data");

    output = `
      <h2>Your form has been submitted</h2>
      <div class="order2__data-container">
        <h3>You entered the following data:</h3>
        <ul class="order2__data-ul">
    `;

    for (const entry of data) {
      let [key, value] = entry;
      console.log(entry);
      if (!value) {
        value = `<span class="order2__no-data">no data from user</span>`;
      }
      output += `
        <li>${key}=${value}</li>
      `;
    }

    output += `
        </ul>
      </div>
    `;

    div.innerHTML = output;
    document.body.append(div);
  }

  function setValuesToHidden() {
    let urlParams = new URLSearchParams(window.location.search);

    for (let pair of urlParams.entries()) {
      let [key, value] = pair;
      Array.from(hiddenInputs).map((input) => {
        if (input.name == key) {
          input.value = value;
        }
      });
    }
  }
};
