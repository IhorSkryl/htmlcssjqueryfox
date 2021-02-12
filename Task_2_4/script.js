$(document).ready(function () {
   $("#date").autocomplete({
      source: ["31.05.2020", "1.06.2020", "2.06.2020", "3.06.2020"],
   });
   $("#airport").autocomplete({
      source: [
         "Hartsfield-Jackson Atlanta International Airport",
         "Beijing Capital International Airport",
         "Dubai International Airport",
         "Los Angeles International Airport",
         "Tokyo Haneda Airport",
         "O'Hare International Airport",
         "London Heathrow Airport",
      ],
   });

   $("#meal").selectmenu({
      width: 180
   });

   $("#radio").controlgroup();

   $("input[type='radio']").checkboxradio({
      icon: false,
   });

   $("#check").controlgroup();

   $("input[type='checkbox']").checkboxradio({
      icon: false,
   });

   $("#continue").button({
      icon: "ui-icon-circle-arrow-e",
      iconPosition: "end",
   });
   $("button").button({
      icon: "ui-icon-circle-arrow-e",
      iconPosition: "end",
   });
});
