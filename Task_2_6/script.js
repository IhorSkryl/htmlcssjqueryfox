$(document).ready(function () {
   getXML("home.xml");
   let count = 0;

   $(".home").click(function () {
      if (count == 0) {
         return;
      } else {
         callContent("Home.xml");
      }
      count = 0;
   });

   $(".about").click(function () {
      if (count == 1) {
         return;
      } else {
         callContent("About.xml");
      }
      count = 1;
   });

   $(".contact").click(function () {
      if (count == 2) {
         return;
      } else {
         callContent("Contact.xml");
      }
      count = 2;
   });
});

function callContent(url) {
   $(".content").empty();
   $(".loader").show();
   setTimeout(() => {
      $(".loader").hide();
      getXML(url);
   }, 1000);
}

function getXML(url) {
   $.ajax({
      url: url,
      cache: false,
      dataType: "xml",
      success: function (data) {
         $(data)
            .find("content")
            .each(function () {
               let title = "<h4>" + $(this).find("title").text() + "</h4>";
               let text = "<p>" + $(this).find("text").text() + "</p>";
               $(".content").append(title);
               $(".content").append(text);
            });
      },
   });
}