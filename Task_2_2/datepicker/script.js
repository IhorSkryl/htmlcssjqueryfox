$(document).ready(function () {
   $("#datepicker").datepicker({
      showButtonPanel: true,
      numberOfMonths: 2,
      changeYear: true,
      changeMonth: true,
      showWeek: true,
      showOtherMonths: true,
      showOn: "both",
      showAnim: "slideDown",
      dateFormat: "dd-mm-yy",
      buttonText: "Date",
      minDate: "-2y",
      maxDate: "+3y",
   });
});
