const greetSpan = document.getElementById("bike-choise__greeting");

showGreeting();

function showGreeting() {
   let userFromLocal = localStorage.getItem("user");
   userFromLocal = JSON.parse(userFromLocal);
   if (userFromLocal) {
      let { userName } = userFromLocal;
      userName = userName[0].toUpperCase() + userName.slice(1);
      greetSpan.innerHTML = "Hello, " + userName + "! ";
   }
}
