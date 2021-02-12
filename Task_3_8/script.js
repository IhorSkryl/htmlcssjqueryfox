window.onload = function(event) {
  const headers = document.querySelectorAll('.sticky__header');
  const sticky = document.querySelector(".sticky");

  sticky.addEventListener('scroll', function(event) {
    Array.from(headers).map((header) => {

      if (header.getBoundingClientRect().y <= 0) {
        header.style.position = 'sticky';
        header.style.top = 0;
        header.style.zIndex = 10;
      } else {
        header.style.zIndex = 0;
      }
    })
  })
}