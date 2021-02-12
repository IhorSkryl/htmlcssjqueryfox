window.onload = function (event) {
   const slidesContainer = document.getElementById("slides");
   const slides = document.getElementsByClassName("carousel__slide");

   const nextArrow = document.getElementById("next");
   const prevArrow = document.getElementById("prev");

   const dots = document.getElementsByClassName("carousel__dot");

   const modal = document.getElementById("modal");

   let slideCounter = 1;

   let isAnimation = false;

   let outerTimer;
   let innerTimer;
   let clonedImg;

   Array.from(dots).map((dot, index) => {
      dot.addEventListener("click", (event) => {
         if (!isAnimation) {
            setDots(event.target.dataset.dot);

            stopAutoSlide();
            startAutoSlide();
         }
      });
   });

   nextArrow.addEventListener("click", (event) => {
      slideWithArrows(event);
   });

   prevArrow.addEventListener("click", (event) => {
      slideWithArrows(event);
   });

   slidesContainer.addEventListener("transitionend", (event) => {
      setStartEndInstantlyTransition(slideCounter);
      isAnimation = false;
   });

   Array.from(slides).map((slide, index) => {
      slide.addEventListener("click", (event) => {
         showModal(event);
      });
   });

   modal.addEventListener("click", (event) => {
      closeModal(event);
   });

   window.onblur = stopAutoSlide;
   window.onfocus = startAutoSlide;

   startAutoSlide();

   function showModal(event) {
      if (event.target.tagName == "IMG" && !isAnimation) {
         stopAutoSlide();

         modal.style.display = "block";
         document.body.style.overflow = "hidden";

         clonedImg = event.target.cloneNode(false);
         clonedImg.classList.add("cloned-img");
         modal.appendChild(clonedImg);
      }
   }

   function closeModal(event) {
      if (event.target.tagName == "DIV") {
         modal.style.display = "none";
         document.body.style.overflow = "auto";
         clonedImg.remove();
         startAutoSlide();
      }
   }

   let startTime = Date.now();
   function startAutoSlide() {
      outerTimer = setTimeout(function run() {
         console.log(Date.now() - startTime + "ms");

         slideCounter++;
         if (slideCounter > dots.length + 1) {
            slideCounter = 1;
         }

         triggerSliding(slideCounter);
         setDots(slideCounter);

         innerTimer = setTimeout(run, 4000);
      }, 3000);
   }

   function stopAutoSlide() {
      clearTimeout(outerTimer);
      clearTimeout(innerTimer);
   }

   function slideWithArrows(event) {
      if (!isAnimation) {
         if (event.target.id == "next") {
            slideCounter++;
         } else {
            slideCounter--;
         }
         triggerSliding(slideCounter);
         setDots(slideCounter);

         stopAutoSlide();
         startAutoSlide();
      }
   }

   function triggerSliding(slideNumber) {
      for (let i = 0; i < slides.length; i++) {
         if (i == slideNumber) {
            slidesContainer.style.transition = 1000 + "ms";
            slidesContainer.style.left = i * -100 + "%";
         }
      }
      isAnimation = true;
   }

   function setStartEndInstantlyTransition(slideNumber) {
      checkSlideNumber(slideNumber);

      slidesContainer.style.transition = 0 + "s";
      slidesContainer.style.left = slideCounter * -100 + "%";
   }

   function setDots(slideNumber) {
      slideCounter = slideNumber;
      triggerSliding(slideNumber);

      for (let i = 0; i < dots.length; i++) {
         if (dots[i].classList.contains("carousel__dot_active")) {
            dots[i].classList.remove("carousel__dot_active");
         }
      }

      checkSlideNumber(slideNumber);
      dots[slideCounter - 1].classList.add("carousel__dot_active");
   }
   
   function checkSlideNumber(slideNumber) {
      if (slideNumber > dots.length) {
         slideCounter = 1;
      } else if (slideNumber < 1) {
         slideCounter = dots.length;
      }
   }
};
