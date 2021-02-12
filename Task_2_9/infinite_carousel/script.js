let isAnimation = false;
let activeDot = 1;
let activeSlide = 1;
let slideDirection = 0;

$(document).ready(function () {
   let slideAmount = $(".carousel__slides").children().length;
   $(".carousel__slides").css("left", -100 + "%");
   let left = 0;

   $(".carousel__next").click(function (event) {
      slideDirection = 1;
      checkDirectionAndAnimate(slideDirection, slideAmount);
   });

   $(".carousel__prev").click(function () {
      slideDirection = -1;
      checkDirectionAndAnimate(slideDirection, slideAmount);
   });

   $(".carousel__dot").click(function () {
      activeDot = this.dataset.dot;
      activeSlide = activeDot;
      left = activeSlide * -100 + "%";

      clearAndSetActiveDots(activeDot);
      getAnimation(left);
   });

   clearAndSetActiveDots(activeDot);
}); // end ready

function clearAndSetActiveDots(activeDot) {
   $(".carousel__dot").each(function (index, element) {
      if (activeDot === index + 1 || activeDot === element.dataset.dot) {
         $(".carousel__dot").removeClass("carousel__dot_active");
         $(element).addClass("carousel__dot_active");
      }
   });
}

function getAnimation(left, slideAmount) {
   $(".carousel__slides").animate(
      {
         left: left,
      },
      {
         duration: 1000,
         start: function () {
            isAnimation = true;
            if (activeSlide > slideAmount - 2) {
               activeDot = 1;
               clearAndSetActiveDots(activeDot);
            }

            if (activeSlide < 1) {
               activeDot = 5;
               clearAndSetActiveDots(activeDot);
            }
         },
         done: function () {
            isAnimation = false;
            if (activeSlide > slideAmount - 2) {
               activeSlide = 1;
               $(this).css("left", -100 + "%");
            }

            if (activeSlide < 1) {
               activeSlide = 5;
               $(this).css("left", -500 + "%");
            }
         },
      }
   );
}

function checkDirectionAndAnimate(slideDirection, slideAmount) {
   if (isAnimation) {
      return;
   }

   if (slideDirection === 1) {
      activeSlide++;
   } else if (slideDirection === -1) {
      activeSlide--;
   }

   left = activeSlide * -100 + "%";
   activeDot = activeSlide;
   clearAndSetActiveDots(activeDot);
   getAnimation(left, slideAmount);
}