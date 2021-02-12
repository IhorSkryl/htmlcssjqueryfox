$(document).ready(function () {
   $("#datepicker").datepicker({
      numberOfMonths: 1,
      changeYear: true,
      changeMonth: true,
      showWeek: true,
      showOtherMonths: true,
   });

   let bikeMaker = [
      'Trek', 'Giant', 'Specialized', 'Look', 'Cannondale',
      'Scott', 'Author', 'Canyon', 'Constantine', 'Colnago',
      'Pinarello', 'Santa Cruz', 'Cinelli', 'Bianchi', 'Cervelo' 
   ];

   $("#autocomplete").autocomplete({
      source: bikeMaker,
      autoFocus: true,
      delay: 200,
      minLength: 1,
   });
});