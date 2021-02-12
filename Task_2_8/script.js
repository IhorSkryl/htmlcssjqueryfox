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
   });

   $(".btn").submit(function () {
      $.ajax({
         url: "valid.php",
         cache: false,
         type: "POST",
         data: $(".form").serialize(),
      });
      return false;
   });
});