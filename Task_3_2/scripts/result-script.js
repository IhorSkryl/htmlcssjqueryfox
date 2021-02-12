window.onload = function (event) {
   const listItems = document.getElementsByTagName("li");
   const userNameSpan = document.getElementById("user-name");

   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   showGreeting();
   getLocalUser();
   showUserDataOnPage();

   function getLocalUser() {
      let localUser = localStorage.getItem("userLocal");
      localUser = JSON.parse(localUser);
      return localUser;
   }

   function showUserDataOnPage() {
      let {
         bike,
         comment,
         firstName,
         lastName,
         billingStreetAddress,
         billingStateRegion,
         billingZipCode,
         billingPhone,
         deliveryStreetAddress,
         deliveryStateRegion,
         deliveryZipCode,
         deliveryPhone,
         deliveryDay,
         deliveryMonth,
         deliveryYear,
         cardType,
         cardNumber,
         expirationMonth,
         expirationYear,
      } = getLocalUser();

      Array.from(listItems).map((listItem, index) => {
         let dataFromLocalUserSpan = listItem.children[0];

         if (listItem.id == "bike") {
            dataFromLocalUserSpan.innerHTML = bike;
         }
         if (listItem.id == "comment") {
            dataFromLocalUserSpan.innerHTML = comment;
         }
         if (listItem.id == "first-name") {
            dataFromLocalUserSpan.innerHTML = firstName;
         }
         if (listItem.id == "last-name") {
            dataFromLocalUserSpan.innerHTML = lastName;
         }
         if (listItem.id == "billing-street-address") {
            dataFromLocalUserSpan.innerHTML = billingStreetAddress;
         }
         if (listItem.id == "billing-state-region") {
            dataFromLocalUserSpan.innerHTML = billingStateRegion;
         }
         if (listItem.id == "billing-zip-code") {
            dataFromLocalUserSpan.innerHTML = billingZipCode;
         }
         if (listItem.id == "billing-phone") {
            dataFromLocalUserSpan.innerHTML = billingPhone;
         }
         if (listItem.id == "delivery-street-address") {
            dataFromLocalUserSpan.innerHTML = deliveryStreetAddress;
         }
         if (listItem.id == "delivery-state-region") {
            dataFromLocalUserSpan.innerHTML = deliveryStateRegion;
         }
         if (listItem.id == "delivery-zip-code") {
            dataFromLocalUserSpan.innerHTML = deliveryZipCode;
         }
         if (listItem.id == "delivery-phone") {
            dataFromLocalUserSpan.innerHTML = deliveryPhone;
         }
         if (listItem.id == "delivery-day") {
            dataFromLocalUserSpan.innerHTML = deliveryDay;
         }
         if (listItem.id == "delivery-month") {
            dataFromLocalUserSpan.innerHTML = monthNames[deliveryMonth];
         }
         if (listItem.id == "delivery-year") {
            dataFromLocalUserSpan.innerHTML = deliveryYear;
         }
         if (listItem.id == "card-type") {
            dataFromLocalUserSpan.innerHTML = cardType;
         }
         if (listItem.id == "card-number") {
            dataFromLocalUserSpan.innerHTML = cardNumber;
         }
         if (listItem.id == "expiration-month") {
            console.log(expirationMonth);
            dataFromLocalUserSpan.innerHTML = monthNames[expirationMonth];
         }
         if (listItem.id == "expiration-year") {
            dataFromLocalUserSpan.innerHTML = expirationYear;
         }
      });
   }

   function showGreeting() {
      let userFromLocal = localStorage.getItem("user");
      userFromLocal = JSON.parse(userFromLocal);
      if (userFromLocal) {
         let { userName } = userFromLocal;
         userName = userName[0].toUpperCase() + userName.slice(1);
         userNameSpan.innerHTML = userName + ", ";
      }
   }
};
