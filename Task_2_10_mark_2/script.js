$(document).ready(function () {
   $(".todo__task-wrapper li").draggable();

   $(".todo__completed-wrapper").droppable({
      // accept: ".todo__task-wrapper > li",
      drop: function (event, ui) {
         console.log(ui.draggable);
         $(".todo__completed-wrapper").append(ui.draggable);
         // ui.draggable
         //    .removeClass("todo__task")
         //    .addClass("todo__completed-task");
      },
   });

   // $(".todo__completed-wrapper li").draggable();

   // $(".todo__task-wrapper").droppable({});
});
