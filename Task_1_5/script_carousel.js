let isAnimation = false;
let activeDot = 0;
let activeSlide = 0;

$(document).ready(function () {
   let left = 0;
   let slideAmount = $(".carousel__slides").children().length - 1;

   $(".carousel__next").click(function (event) {
      if (isAnimation) {
         return;
      }

      activeSlide++;
      if (activeSlide > slideAmount) {
         activeSlide = 0;
      }

      left = activeSlide * -100 + "%";
      activeDot = activeSlide;

      getDots(activeDot);
      getAnimation(left);
   });

   $(".carousel__prev").click(function () {
      if (isAnimation) {
         return;
      }

      activeSlide--;
      if (activeSlide < 0) {
         activeSlide = slideAmount;
      }

      left = activeSlide * -100 + "%";
      activeDot = activeSlide;

      getDots(activeDot)
      getAnimation(left);
   });

   $(".carousel__dot").click(function() {
      activeDot = this.dataset.dot;
      activeSlide = activeDot;
      left = activeSlide * -100 + "%";

      getDots(activeDot);
      getAnimation(left);
   });

   getDots(activeDot);
}); // end ready 

function getDots (activeDot) {
   $(".carousel__dot").each(function(index, element) {
      if (activeDot === index || activeDot === element.dataset.dot) {
         $(".carousel__dot").removeClass("carousel__dot_active");
         $(element).addClass("carousel__dot_active");
      }
   });
}

function getAnimation(left) {
   $(".carousel__slides").animate(
      {
         left: left,
      },
      {
         duration: 1000,
         start: function () {
            isAnimation = true;
         },
         done: function () {
            isAnimation = false;
         },
      }
   );
}