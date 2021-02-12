$(document).ready(function () {
   $puffContainer = $(".puff-container");
   $puffImg = $(".puff-img");

   $("#photo-grid img").draggable({
      revert: "invalid",
      revertDuration: 200,
      containment: "document",
      cursor: "move",
   });

   $(".trash").droppable({
      accept: "#photo-grid > img",
      classes: {
         "ui-droppable-active": "highlight",
         "ui-droppable-hover": "highlight-accept",
      },
      tolerance: "pointer",
      drop: function (event, ui) {
         ui.draggable.hide();
         $puffContainer.css("left", event.offsetX);
         $puffContainer.css("top", event.offsetY);
         puff();
      },
   });

   function puff() {
      $puffContainer.show();
      for (let i = 0; i < 6; i++) {
         setTimeout(() => {
            $puffImg.css("top", "-=100%");
            i === 5 ? $puffContainer.hide() : false;
         }, i * 120);
      }
      $puffImg.css("top", "100%");
   }
});