window.onload = function (event) {
   const widgetContainer = document.querySelector(".widget__container");
   const widgetTodayTable = document.querySelector(".widget__today-table");
   const mainHeading = document.querySelector(".widget__main-heading");
   const tempInfo = document.querySelector(".widget__temp-info");
   const topic = document.querySelector(".widget__topic");
   const fiveDaysContainer = document.querySelector(".widget__five-days-container");

   const API_KEY = "5550504633092e889645da1b6f148794";
   const KELVIN = 273;

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

   navigator.geolocation.getCurrentPosition(
      function (pos) {
         getOneDayWeather(pos.coords.latitude, pos.coords.longitude);
         getFiveDaysWeather(pos.coords.latitude, pos.coords.longitude);
      },
      function (err) {
         console.log(`ERROR(${err.code}): ${err.message}`);
      }
   );

   function getFiveDaysWeather (lat, lon) {
      fetch(
         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
         .then(response => {
            let fiveDaysData = response.json();
            return fiveDaysData;
         })
         .then(fiveDaysData => {
            showFiveDaysHeading(fiveDaysData);
            showFiveDaysWeather(fiveDaysData);
         })
   }

   function getOneDayWeather(lat, lon) {
      fetch(
         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
         .then((response) => {
            let oneDayData = response.json();
            return oneDayData;
         })
         .then((oneDayData) => {
            showHeading(oneDayData);
            showHeadingInfo(oneDayData);
            showOneDayWeather(oneDayData);
         });
   }

   function showFiveDaysHeading(fiveDaysData) {
      topic.innerHTML = `
         <h2>
            Hourly weather and forecast in ${fiveDaysData.city.name}, ${fiveDaysData.city.country}
         </h2>
      `;
   }

   function showFiveDaysWeather(fiveDaysData) {
      let { hours } = getDate(new Date(fiveDaysData.list[0].dt * 1000));
      if (hours != '00') {
         showEachDayHeading(fiveDaysData.list[0]);
      }
      fiveDaysData.list.map((item, index) => {
         let { hours, minutes, dayDate } = getDate(new Date(item.dt * 1000));
         
         if (hours == "00" && dayDate != new Date().getDate()) {
            showEachDayHeading(item);
         }
         
         let div = document.createElement('div');
         div.classList.add('widget__five-days');

         if (hours == '21') {
            div.classList.add("widget__five-days_no-line");
         }
         
         div.innerHTML = `
            <div class="widget__five-day-time">
               <span>${hours}:${minutes}</span><span><img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather-icon"></span>
            </div>
            <div class="widget__five-day-weather">
               <div>
                  <span class="widget__temp-span">${Math.floor(item.main.temp - KELVIN)}°C</span> <i>${item.weather[0].description}</i>
               </div>
               <div>
                  ${item.wind.speed}m/s clouds: ${item.clouds.all}%, ${item.main.pressure}hpa
               </div>
            </div>
         `;
         
         fiveDaysContainer.append(div);
         
      })
   }

   function showEachDayHeading(item) {
      let { day, month, year, dayDate } = getDate(new Date(item.dt * 1000));
      let div = document.createElement("div");
      div.classList.add("widget__five-days-heading");
      div.innerHTML = `
         ${daysArr[day]} ${monthsArr[month]} ${dayDate} ${year}
      `;
      fiveDaysContainer.append(div);
   }

   function showHeading(oneDayData) {
      mainHeading.innerHTML = `
         Weather in ${oneDayData.name}, ${oneDayData.sys.country}
      `;
   }

   function showHeadingInfo(oneDayData) {
      tempInfo.innerHTML = `
         <p>
            <span class="widget__icon-span">
               <img src="http://openweathermap.org/img/wn/${oneDayData.weather[0].icon}@2x.png" alt="weather-icon">
            </span>
            <span class="widget__temperature">${Math.floor(oneDayData.main.temp - KELVIN)} °C</span>
         </p>
         <p>
            <span class="widget__cloudiness-main">${oneDayData.weather[0].main}</span>
         </p>
         <p>
            <span class="widget__date">${getDateStr(oneDayData)}</span>
         </p>
      `;
   }

   function showOneDayWeather(oneDayData) {
      widgetTodayTable.innerHTML = `
         <table class="widget__table">
            <tbody>
               <tr>
                  <td>Wind</td>
                  <td class="widget__wind">
                     <p class="widget__wind-speed">${getWindSpeed(oneDayData)}</p>
                     <p class="widget__wind-deg">${getWindDirection(oneDayData)}</p>
                  </td>
               </tr>
               <tr>
                  <td>Cloudiness</td>
                  <td class="widget__cloudiness">${getCloudinessStr(oneDayData)}</td>
               </tr>
               <tr>
                  <td>Pressure</td>
                  <td class="widget__pressure">${oneDayData.main.pressure} hpa</td>
               </tr>
               <tr>
                  <td>Humidity</td>
                  <td class="widget__humidity">${oneDayData.main.humidity} %</td>
               </tr>
               <tr>
                  <td>Sunrise</td>
                  <td class="widget__sunrise">${getSunsetAndSunriseStr(oneDayData.sys.sunrise)}</td>
               </tr>
               <tr>
                  <td>Sunset</td>
                  <td class="widget__sunset">${getSunsetAndSunriseStr(oneDayData.sys.sunset)}</td>
               </tr>
               <tr>
                  <td>Geo coords</td>
                  <td class="widget__coords">[${oneDayData.coord.lat}, ${oneDayData.coord.lon}]</td>
               </tr>
            </tbody>  
         </table>
      `;
   }

   function getUpperCase (word) {
      return word.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
   }  

   function getCloudinessStr (data) {
      let cloudiness;
      if (data.list) {
         cloudiness = data.list[0].wind.description;
      } else {
         cloudiness = data.weather[0].description;
      }
      let cloudinessStr = getUpperCase(cloudiness);
      return cloudinessStr;
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
      let speed;
      if (data.list) {
         speed = data.list[0].wind.speed;
      }
      else {
         speed = data.wind.speed;
      }
      let speedStr = `${getUpperCase(windSpeedClassification(speed))}, ${speed} m/s,`;

      return speedStr;
   }

   function getWindDirection(data) {
      let deg;
      if (data.list) {
         deg = data.list[0].wind.deg;
      } else {
         deg = data.wind.deg;
      }
      let degStr = `${windDirectionClassification(deg)} (${deg} deg)`;

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

      if ((deg >= 348.76 && deg <= 359.99) || (deg >= 0 && deg <= 11.25)) {
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
