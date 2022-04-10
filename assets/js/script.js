var searchInput = document.querySelector("#cityName");
var todayWeather = document.querySelector("#weatherMainInfo");

var searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", function() {
    var cityName = searchInput.value;
    var recentSearches = [];
    recentSearches.push(cityName);
    console.log(recentSearches);
    getWeather(cityName);

});

var getWeather = function(cityName) {
    var cityNameApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

    fetch(cityNameApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        var lon = data.coord.lon;
        var lat = data.coord.lat;
        var nameOfCity = data.name;

        return[lat,lon,nameOfCity];

    }).then(function([lat,lon,nameOfCity]) {
        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude={part}&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(weatherApi)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);

            todayWeather.className = "weatherMainBorder";
            
            var h3El = document.createElement("h3");
            h3El.textContent = nameOfCity;
            todayWeather.appendChild(h3El);

            var temp = document.createElement("p");
            temp.textContent = "Temp: " + data.current.temp + "°F";
            todayWeather.appendChild(temp);

            var windSpeed = document.createElement("p");
            windSpeed.textContent = "Wind: " + data.current.wind_speed + " MPH";
            todayWeather.appendChild(windSpeed);

            var humidity = document.createElement("p");
            humidity.textContent = "Humidity: " + data.current.humidity + "%";
            todayWeather.appendChild(humidity);

            var uvIndex = document.createElement("p");
            uvIndex.textContent = "UV Index: ";
            var uvIndexNumber = document.createElement("span");
            uvIndexNumber.textContent = data.current.uvi;
            uvIndexNumber.className = "uvIndex";
            uvIndex.appendChild(uvIndexNumber);
            todayWeather.appendChild(uvIndex);


        })
    })
}
