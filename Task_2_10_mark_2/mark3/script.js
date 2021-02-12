$(document).ready(function() {
   
   $('.draggy li').draggable();

   $('.divDroppy').droppable({
      drop: function(event, ui) {
         console.log(ui.draggable);
         $(".droppy").append(ui.draggable);
      }
   });

});