$(document).ready(function () {
   $(".open").click(function () {
      $("#dialog").dialog("open");
   });

   $(function () {
      $("#dialog").dialog({
         autoOpen: false,
         width: 400,
         modal: true,
         show: { effect: "fade", duration: 500 },
         hide: { effect: "puff", duration: 500 },
         buttons: [
            {
               text: "Yes",
               click: function () {
                  $(this).dialog("close");
               },
            },
            {
               text: "No",
               click: function () {
                  $(this).dialog("close");
               },
            },
         ],
      });
   });
});
