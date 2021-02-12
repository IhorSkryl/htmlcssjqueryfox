let taskForm = `<form action="task.php" method="post" class="todo__form">
                  <input
                     type="text"
                     class="todo__task-input"
                     name="task-text"
                     placeholder="Type your task"
                     autocomplete="off"
                     required
                  ></input>
               </form>`;

const keyCodeEnter = 13;
const keyCodeEscape = 27;

$(document).ready(function () {

   let $addTaskButton = $(".todo__add-task");

   // Drag-n-Drop
   $(document).on("mouseenter", ".todo__task", function (event) {
      $(".todo__task").draggable({
         revert: "invalid",
         revertDuration: 200,
         zIndex: "30",
      });

      $(".todo__completed").droppable({
         tolerance: "pointer",
         drop: function (event, ui) {
            ui.draggable.removeAttr("style");

            removeCompleteIcon(ui.draggable);
            moveToTaskComplete(ui.draggable);
         },
      });
   });

   // Add Task Button opens an input
   $(document).on("click", ".todo__add-task", function (event) {
      openInput();
   });

   // Submit Form and handle Enter and Escape keys like in Jira
   $(document).on("keydown", ".todo__form", function (event) {
      if (event.keyCode === keyCodeEnter) {
         sendForm(this, $(".todo__form").attr("action"));
         hideInputAndShowAddTaskButton($addTaskButton);
         return false;
      }
      if (event.keyCode === keyCodeEscape) {
         hideInputAndShowAddTaskButton($addTaskButton);
      }
   });

   // hide Input if click elsewhere but Input
   $(document).click(function (event) {
      if (
         !$(event.target).hasClass("todo__task-input") &&
         !$(".todo__task-input").is(":focus")
      ) {
         hideInputAndShowAddTaskButton($addTaskButton);
      }
   });

   // Complete Icon moves task to completed and
   // remove Complete Icon if task already in completed
   $(document).on("click", ".todo__icon-complete", function (event) {
      let self = this;

      moveToTaskComplete(self);
      removeCompleteIcon(self);
   });

   // Remove Icon removes task
   $(document).on("click", ".todo__icon-remove", function (event) {
      let self = this;

      removeTask(self);
   });
}); // end ready

function sendForm(form, url) {
   $.ajax({
      url: url,
      cache: false,
      type: "POST",
      data: $(form).serialize(),
      dataType: "html",
      success: function (response) {
         data = $.parseJSON(response);
         if (data.task.trim().length === 0) {
            return;
         }
         $(".todo__task-wrapper").html(function (index, value) {
            return getTaskElement(data.task, value);
         });
      },
      error: function () {
         let errorMessage = "Error! Please try again later.";
         $(".todo__task-wrapper").html(function (index, value) {
            return getTaskElement(errorMessage, value);
         });
         addRedShadow($(".todo__task:last-of-type"));
         removeCompleteIcon($(".todo__error-task"));
         disableDrag($(".todo__error-task"));
      },
   });
}

function openInput() {
   $(".todo__to-be-done").append(taskForm);
   $(".todo__task-input").focus();
   $(".todo__add-task").remove();
}

function hideInputAndShowAddTaskButton($addTaskButton) {
   $(".todo__form").remove();
   $(".todo__to-be-done").append($addTaskButton);
}

function moveToTaskComplete(taskElement) {
   $(taskElement)
      .closest(".todo__task")
      .appendTo(".todo__completed-wrapper")
      .removeClass("todo__task")
      .addClass("todo__completed-task");
}

function removeCompleteIcon(taskElement) {
   if ($(taskElement).closest(".todo__completed-task")) {
      $(taskElement).remove(".todo__icon-complete");
   }

   if ($(taskElement).closest(".todo__completed-wrapper")) {
      $(taskElement).children().children().remove(".todo__icon-complete");
   }
}

function removeTask(taskElement) {
   $(taskElement).closest(".todo__task").remove();
   $(taskElement).closest(".todo__completed-task").remove();
   $(taskElement).closest(".todo__error-task").remove();
}

function breakLongWordAndGetTaskText(str) {
   let words = str.split(" ");

   let firstLine = "";
   let secondLine = "";

   for (let i = 0; i < words.length; i++) {
      if (words[i].length > 25) {
         firstLine = words[i].slice(0, 25) + "-";
         secondLine = words[i].slice(25);
         words.splice(i, 1, firstLine, secondLine);
      }
   }
   return (words = words.join(" ").trim());
   // превысокомногорассмотрительствующий
}

function getTaskElement(str, value) {
   return (
      value +
      `<li class="todo__task">
         <div class="todo__task-inner">
            <p>${breakLongWordAndGetTaskText(str)}</p>
         </div>
         <div class="todo__icons">
            <i data-prompt="Complete" class="fa fa-check-circle todo__icon-complete"></i>
            <i data-prompt="Remove" class="fa fa-trash todo__icon-remove"></i>
         </div>
      </li>`
   );
}

function addRedShadow(taskElement) {
   taskElement.removeClass("todo__task");
   taskElement.addClass("todo__error-task");
}

function disableDrag(taskElement) {
   $(document).on("mouseenter", ".todo__task", function (event) {
      taskElement.draggable("disable");
   });
}
