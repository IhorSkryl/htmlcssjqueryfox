<?php

   if (isset($_POST)) { 

      // Формируем массив для JSON ответа
      $result = array(
         'task' => $_POST["task-text"]
      ); 

      // Переводим массив в JSON
      echo json_encode($result); 
   }

?>