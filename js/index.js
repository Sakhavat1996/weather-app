const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const form = document.querySelector("form.weather__search");
const input = form.querySelector("input");
const cityName = document.querySelector(".weather__city");
const dateTime = document.querySelector(".weather__datetime");
const locWeatherStatus = document.querySelector(".weather__forecast");
const temprature = document.querySelector(".weather__temperature");
const img = document.querySelector(".weather__icon img");
const temprature_min = document.querySelector(".min_temp span");
const temprature_max = document.querySelector(".max_temp span");
const feel_temp = document.querySelector(".weather__realfeel");
const humidity = document.querySelector(".weather__humidity");
const wind = document.querySelector(".weather__wind");
const pressure = document.querySelector(".weather__pressure");
const errorMessage = document.querySelector('.error-message')
const codes = {
    success : 200,
    error: 404
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchLocation = input.value;
  fetch(`${BASE_URL}?q=${searchLocation}&appid=${API_KEY}&units=metric`)
    .then((res) => res.json())
    .then((data) => {
        input.value = "";
       if(data.cod === codes.success){
        const {
            name,
            sys: { country: countryCode },
            weather: [{ main: locClearWeather, icon }],
            main: {
              feels_like,
              humidity: hum,
              pressure: press,
              temp,
              temp_max: max,
              temp_min: min,
            },
            wind: { speed },
          } = data;
          const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
            countryCode
          );
          const date = new Date();
          cityName.innerText = `${name}, ${countryName}`;
          dateTime.innerHTML = date.toUTCString();
          temprature.innerHTML = Math.round(temp) + "&deg";
          locWeatherStatus.innerText = locClearWeather;
          img.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${icon}@2x.png`
          );
          temprature_min.innerHTML = Math.floor(min) + "&deg";
          temprature_max.innerHTML = Math.ceil(max) + "&deg";
          feel_temp.innerHTML = feels_like.toFixed(1) + "&deg";
          humidity.innerText = hum + "%";
          wind.innerText = speed + " m/s";
          pressure.innerText = press + " hPa";
        }
        else{
            throw new Error("Bele bir seher yoxdur  , xahis edirik dogru daxil edin");
        }
    })
    .catch(err=>{
        errorMessage.style.display = 'block'
        errorMessage.innerText = err.message;

        setTimeout(() => {
            errorMessage.style.display = 'none';  
        }, 2000);
    })  
      
});
