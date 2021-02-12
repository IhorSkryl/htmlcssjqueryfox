$(document).ready(function () {
   $("#datepicker").datepicker({
      autoOpen: false,
      inline: true,
      showButtonPanel: true,
      numberOfMonths: 2,
      changeYear: true,
      changeMonth: true,
      showWeek: true,
      showOtherMonths: true,
      showOn: "both",
      showAnim: "fold",
   });
});
//datepicker