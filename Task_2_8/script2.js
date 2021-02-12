$(document).ready(function () {
   $(".form").validate({
      rules: {
         name: {
            required: true,
            minlength: 3,
         },
         e_mail: {
            required: true,
            email: true,
         },
         description: "required",
      },
      messages: {
         name: {
            required: "Name!",
            minlength: "At least 3 charachters!",
         },
         e_mail: {
            required: "Email!",
            email: "Enter valid e-mail: name@domain.com",
         },
         description: "Message!",
      },

      submitHandler: function (form) {
         sendForm(form, $(".form").attr("action"));
         $(form).trigger("reset");
         return false;
      },
   });

   $(".close").click(setModal);
});

function sendForm(form, url) {
   $.ajax({
      url: url,
      cache: false,
      type: "POST",
      data: $(form).serialize(),
      dataType: "html",
      success: function (response) {
         data = $.parseJSON(response);
         $("#result h2").html(data.naMe);
         $("#result h3").html(data.e_Mail);
         $("#result p").html(data.message);
         setModal();
      },
      error: function () {
         $("#result h2").html("ERROR!");
      },
   });
}

function setModal() {
   let modal = document.getElementById("result");

   !modal.open ? modal.showModal() : modal.close();
}