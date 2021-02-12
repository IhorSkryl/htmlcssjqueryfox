window.onload = (event) => {
   const product = document.getElementById("product");
   const firstName = document.getElementById("first-name");
   const lastName = document.getElementById("last-name");
   const firstBuy = document.getElementById("first-buy");
   const nextBuy = document.getElementById("next-buy");
   const cardNumber = document.getElementById("card-number");
   const cvc = document.getElementById("cvc");
   const month = document.getElementById("month");
   const year = document.getElementById("year");
   const form = document.getElementById("form");

   const data = document.getElementsByClassName("customer-page__data");

   const costDiv = document.getElementById("cost");
   const productName = document.getElementById("product-name");
   const discountValue = document.getElementById("discount-value");
   const discountCost = document.getElementById("discount-cost");

   const discountButton = document.getElementById("discount-button");

   let buyer;
   let dates;
   let names;
   let discount;

   form.addEventListener("submit", (event) => {
      event.preventDefault();
      buyer = new User(
         product.value,
         discount.productCost,
         discount.discountAmount,
         firstName.value,
         lastName.value,
         dates.formatDate(firstBuy.value),
         dates.formatDate(nextBuy.value),
         cardNumber.value,
         cvc.value,
         month.value,
         year.value
      );

      dates.firstBuy = dates.formatDate(firstBuy.value);
      dates.nextBuy = dates.formatDate(nextBuy.value);

      console.log(buyer);
      console.log(dates);
      console.log(names);
      console.log(discount);
   });

   Array.from(data).map((input, index) => {
      input.addEventListener("change", (event) => {
         dates = new Dates(firstBuy.value, nextBuy.value);
         names = new Names(firstName.value, lastName.value);

         if (input.id == "product") {
            discount = new Discount(product.value);
            discount.showDiscount();
         }
      });
   });

   discountButton.addEventListener("click", (event) => {
      event.preventDefault();
      discount.setDiscount();
      discount.getCostWithDiscount();
   });

   function User(product, productCost, discountAmount, firstName, lastName, firstBuy, nextBuy, cardNumber, cvc, month, year) {
      this.product = product;
      this.productCost = productCost;
      this.discountAmount = discountAmount;
      this.firstName = firstName;
      this.lastName = lastName;
      this.firstBuy = firstBuy,
      this.nextBuy = nextBuy,
      this.cardNumber = cardNumber;
      this.cvc = cvc;
      this.month = month;
      this.year = year;
   }

   function Dates(firstBuy, nextBuy) {
      this.firstBuy = firstBuy;
      this.nextBuy = nextBuy;

      this.formatDate = function (dateStr) {
         if (dateStr == "") {
            return;
         }
         let date = new Date(dateStr);
         let day = date.getDate();
         let month = date.getMonth() + 1;
         if (month < 10) {
            month = `0${month}`;
         }
         let year = date.getFullYear();
         let output = `${day}.${month}.${year}`;
         return output;
      };
   }

   function Names(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
   }

   function Discount(product) {
      this.product = product;
      this.discountAmount = 0;
      this.productCost = 5000;

      this.showDiscount = function () {
         if (this.product) {
            costDiv.classList.add("customer-page__cost_visible");
         }
         productName.innerHTML = this.product;
      };

      this.setDiscount = function () {
         let min = 5;
         let max = 10;
         let randomDiscount = Math.floor(Math.random() * (max - min + 1) + min);

         discountValue.innerHTML += randomDiscount + "%!";
         discountButton.setAttribute("disabled", "disabled");
         this.discountAmount = randomDiscount;
      };

      this.getCostWithDiscount = function () {
         this.productCost -= (this.productCost * this.discountAmount) / 100;
         discountCost.innerHTML += this.productCost + ".";
      };
   }

   const tabBtn = document.getElementsByClassName("customer-page__btn");
   const tabContent = document.getElementsByClassName(
      "customer-page__tab-content"
   );

   Array.from(tabBtn).map((btn, index) => {
      btn.addEventListener("click", (event) => {
         handleTabBtn(btn);
         showTabContent(btn);
      });
   });

   function handleTabBtn(btn) {
      for (let i = 0; i < tabBtn.length; i++) {
         tabBtn[i].classList.remove("customer-page__btn_active");
      }
      btn.classList.add("customer-page__btn_active");
   }

   function showTabContent(btn) {
      for (let i = 0; i < tabContent.length; i++) {
         tabContent[i].classList.remove("customer-page__tab-content_active");
         if (btn.dataset.index == tabContent[i].dataset.tab) {
            tabContent[i].classList.add("customer-page__tab-content_active");
         }
      }
   }
};
