<?php

   // echo "<pre>";
   //    print_r($_POST);
   // echo "</pre>";


   if (isset($_POST)) { 

      // Формируем массив для JSON ответа
      $result = array(
         'naMe' => $_POST["name"],
         'e_Mail' => $_POST["e_mail"],
         'message' => $_POST["description"]
      ); 

      // Переводим массив в JSON
      echo json_encode($result); 
   }

?>