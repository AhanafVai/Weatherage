let weather = {
  fetchWeather: function (city) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b975b1bab6a9eb0310a4dedc61ec5c5`
    )
      .then((res) => {
        if (!res) {
          alert("No weather info found!!");
        }
        return res.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(".sky").innerText = ` ${description}`;
    document.querySelector(".humidity").innerText = `humidity: ${humidity} %`;
    document.querySelector(".temp").innerText = `${temp} °C`;
    document.querySelector(".speed").innerText = `Wind speed ${speed} km/h`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + description + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchBar").value);
  },
};

document.querySelector(".searchIcon").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".searchBar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

const fetchLocation = () => {
  fetch("https://geolocation-db.com/json/e4f42070-ad2d-11eb-adf1-cf51da9b3410")
    .then((response) => response.json())
    .then((data) => weather.fetchWeather(data.city));
};
fetchLocation();
