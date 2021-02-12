window.onload = function (event) {
   const cityName = document.querySelector(".widget__city");
   const countryName = document.querySelector(".widget__country");
   const iconSpan = document.querySelector(".widget__icon-span");
   const temperature = document.querySelector(".widget__temperature");
   const cloudinessMain = document.querySelector(".widget__cloudiness-main");
   const dateSpan = document.querySelector(".widget__date");
   const windSpeed = document.querySelector(".widget__wind-speed");
   const windDeg = document.querySelector(".widget__wind-deg");
   const cloudiness = document.querySelector(".widget__cloudiness");
   const pressure = document.querySelector(".widget__pressure");
   const humidity = document.querySelector(".widget__humidity");
   const sunrise = document.querySelector(".widget__sunrise");
   const sunset = document.querySelector(".widget__sunset");
   const coords = document.querySelector(".widget__coords");

   const days = document.querySelector(".widget__days");
   const topic = document.querySelector(".widget__topic");

   const API_KEY = "5550504633092e889645da1b6f148794";
   const KELVIN = 273;

   const weather = {
      wind: {},
      coords: {},
   };

   const arrZeroDayTimes = [];
   const arrFirstDayTimes = [];
   const arrSecondDayTimes = [];
   const arrThirdDayTimes = [];
   const arrFourthDayTimes = [];
   const arrFifthDayTimes = [];

   const daysArr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
   ];

   const monthsArr = [
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

   navigator.geolocation.getCurrentPosition(success, error);

   function success(pos) {
      getWeather(pos.coords.latitude, pos.coords.longitude);
   }

   function error(err) {
      console.log(`ERROR(${err.code}): ${err.message}`);
   }

   function getWeather(lat, lon) {
      fetch(
         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
         .then((response) => {
            let data = response.json();
            return data;
         })
         .then((data) => {
            weather.city = data.city.name;
            weather.country = data.city.country;
            weather.icon = data.list[0].weather[0].icon;
            weather.date = data.list[0].dt_txt;
            weather.currentDate = getDateStr(data);
            weather.temperature = Math.floor(data.list[0].main.temp - KELVIN);
            weather.cloudinessMain = data.list[0].weather[0].main;
            weather.wind.speed = data.list[0].wind.speed;
            weather.wind.deg = data.list[0].wind.deg;
            weather.cloudiness = data.list[0].weather[0].description;
            weather.pressure = data.list[0].main.pressure;
            weather.humidity = data.list[0].main.humidity;
            weather.sunrise = getSunsetAndSunriseStr(data.city.sunrise);
            weather.sunset = getSunsetAndSunriseStr(data.city.sunset);
            weather.coords.lat = data.city.coord.lat;
            weather.coords.lon = data.city.coord.lon;

            displayWeather(data);
            topicAppend();
            getItemsWithExactDate(data);

            showOtherDays(arrZeroDayTimes);
            showOtherDays(arrFirstDayTimes);
            showOtherDays(arrSecondDayTimes);
            showOtherDays(arrThirdDayTimes);
            showOtherDays(arrFourthDayTimes);
            showOtherDays(arrFifthDayTimes);
         });
   }

   function getItemsWithExactDate(data) {
      let currD = getDate(new Date());
      data.list.map((item, index) => {
         let d = getDate(new Date(item.dt * 1000));
         if (item) {
            if (d.dayDate == currD.dayDate) {
               arrZeroDayTimes.push(item);
            } else if (d.dayDate == currD.dayDate + 1) {
               arrFirstDayTimes.push(item);
            } else if (d.dayDate == currD.dayDate + 2) {
               arrSecondDayTimes.push(item);
            } else if (d.dayDate == currD.dayDate + 3) {
               arrThirdDayTimes.push(item);
            } else if (d.dayDate == currD.dayDate + 4) {
               arrFourthDayTimes.push(item);
            } else if (d.dayDate == currD.dayDate + 5) {
               arrFifthDayTimes.push(item);
            }
         }
      });
   }

   function showOtherDays(arr) {
      showDayHeader(arr);
      arr.map((item, index) => {
         let { hours, minutes } = getDate(
            new Date(item.dt * 1000)
         );

         let tbody = document.createElement('tbody');
         tbody.innerHTML = `
            <tr>
               <td class="widget__first-td">
                  <span>${hours}:${minutes}</span> <span><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather-icon"></span>
               </td>
               <td class="widget__second-td">
                  <div>
                     <span class="widget__temp-span">${Math.floor(item.main.temp - KELVIN)} °C</span> <i>${item.weather[0].description}</i>
                  </div>
                  <div>
                     ${item.wind.speed}, m/s clouds: ${item.clouds.all}%, ${item.main.pressure} hpa
                  </div>
               </td>
            </tr>
         `;
         days.append(tbody);
      });
   }

   function showDayHeader (arr) {
      let { day, month, year, dayDate } = getDate(
         new Date(arr[0].dt * 1000)
      );

      let thead = document.createElement('thead');
      thead.innerHTML = `
         <tr>
            <td>${daysArr[day]} ${monthsArr[month]} ${dayDate} ${year}</td>
         </tr>
      `;
      days.append(thead);
   }

   function topicAppend() {
      let h2 = document.createElement("h2");
      h2.innerHTML = `Hourly weather and forecast in ${weather.city}, ${weather.country}`;
      topic.append(h2);
   }

   function displayWeather(data) {
      cityName.innerHTML = "in " + weather.city;
      countryName.innerHTML = ", " + weather.country;
      iconSpan.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="weather-icon">`;
      temperature.innerHTML = weather.temperature + " °C";
      cloudinessMain.innerHTML = weather.cloudinessMain;
      dateSpan.innerHTML = weather.currentDate;
      windSpeed.innerHTML = getWindSpeed(data);
      windDeg.innerHTML = getWindDirection(data);
      cloudiness.innerHTML =
         weather.cloudiness[0].toUpperCase() + weather.cloudiness.slice(1);
      pressure.innerHTML = `${weather.pressure} hpa`;
      humidity.innerHTML = `${weather.humidity}%`;
      sunrise.innerHTML = weather.sunrise;
      sunset.innerHTML = weather.sunset;
      coords.innerHTML = `[${weather.coords.lat}, ${weather.coords.lon}]`;
   }

   function getSunsetAndSunriseStr(time) {
      let { hours, minutes } = getDate(new Date(time * 1000));

      return `${hours}:${minutes}`;
   }

   function getDate(newDate) {
      const dateObj = {};
      let date = newDate;
      dateObj.minutes = date.getMinutes();
      if (dateObj.minutes < 10) {
         dateObj.minutes = "0" + dateObj.minutes;
      }
      dateObj.hours = date.getHours();
      if (dateObj.hours < 10) {
         dateObj.hours = "0" + dateObj.hours;
      }
      dateObj.dayDate = date.getDate();
      dateObj.day = date.getDay();
      dateObj.month = date.getMonth();
      dateObj.year = date.getFullYear();
      return dateObj;
   }

   function getDateStr() {
      let { hours, minutes, month, dayDate } = getDate(new Date());
      let dateStr = `${hours}:${minutes} ${monthsArr[month]} ${dayDate}`;
      return dateStr;
   }

   function getWindSpeed(data) {
      let speed = data.list[0].wind.speed;
      let speedStr = `${windSpeedClassification(speed)}, ${speed} m/s,`;

      return speedStr;
   }

   function getWindDirection(data) {
      let deg = data.list[0].wind.deg;
      let degStr = `${windDirectionClassification(deg)} (${deg})`;

      return degStr;
   }

   function windSpeedClassification(speed) {
      let speedDescription = "";

      if (speed <= 0.5) {
         speedDescription = "Calm";
      } else if (speed >= 0.6 && speed <= 1.5) {
         speedDescription = "Light air";
      } else if (speed >= 1.6 && speed <= 3.3) {
         speedDescription = "Light breeze";
      } else if (speed >= 3.4 && speed <= 5.5) {
         speedDescription = "Gentle breeze";
      } else if (speed >= 5.6 && speed <= 7.9) {
         speedDescription = "Moderate breeze";
      } else if (speed >= 8.0 && speed <= 10.7) {
         speedDescription = "Fresh breeze";
      } else if (speed >= 10.8 && speed <= 13.8) {
         speedDescription = "Strong breeze";
      } else if (speed >= 13.9 && speed <= 17.1) {
         speedDescription = "Moderate gale";
      } else if (speed >= 17.2 && speed <= 20.7) {
         speedDescription = "Fresh gale";
      } else if (speed >= 20.8 && speed <= 24.4) {
         speedDescription = "Strong gale";
      } else if (speed >= 24.5 && speed <= 28.4) {
         speedDescription = "Storm";
      } else if (speed >= 28.5 && speed <= 32.6) {
         speedDescription = "Violent storm";
      } else if (speed >= 32.7) {
         speedDescription = "Hurricane force";
      }
      return speedDescription;
   }

   function windDirectionClassification(deg) {
      let degDescription = "";

      if (deg >= 348.76 && deg <= 359.99 || deg >= 0 && deg <= 11.25) {
         degDescription = "North";
      } else if (deg >= 11.26 && deg <= 33.75) {
         degDescription = "North-northeast";
      } else if (deg >= 33.76 && deg <= 56.25) {
         degDescription = "North-east";
      } else if (deg >= 56.26 && deg <= 78.75) {
         degDescription = "East-northeast";
      } else if (deg >= 78.76 && deg <= 101.25) {
         degDescription = "East";
      } else if (deg >= 101.26 && deg <= 123.75) {
         degDescription = "East-southeast";
      } else if (deg >= 123.76 && deg <= 146.25) {
         degDescription = "South-east";
      } else if (deg >= 146.26 && deg <= 168.75) {
         degDescription = "South-southeast";
      } else if (deg >= 168.76 && deg <= 191.25) {
         degDescription = "South";
      } else if (deg >= 191.26 && deg <= 213.75) {
         degDescription = "South-southwest";
      } else if (deg >= 213.76 && deg <= 236.25) {
         degDescription = "South-west";
      } else if (deg >= 236.26 && deg <= 258.75) {
         degDescription = "South-southwest";
      } else if (deg >= 258.76 && deg <= 281.25) {
         degDescription = "West";
      } else if (deg >= 281.26 && deg <= 303.75) {
         degDescription = "West-northwest";
      } else if (deg >= 303.76 && deg <= 326.25) {
         degDescription = "North-west";
      } else if (deg >= 326.26 && deg <= 348.75) {
         degDescription = "North-northwest";
      }
      return degDescription;
   }
};
