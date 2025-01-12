const APIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const APIKEY = "7ef970034fb1c125ee6cb336b564864e";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search_btn");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${APIURL}&q=${city}&appid=${APIKEY}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".Humidity p").innerHTML = Math.round(data.main.humidity) + "%";
        document.querySelector(".Wind p").innerHTML = Math.round(data.wind.speed) + " km/hr";

        // Set weather icon based on the weather condition
        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "../imag/sun.png"; // Clear sky
                break;
            case "Clouds":
                weatherIcon.src = "../imag/cloudy.png"; // Cloudy
                break;
            case "Rain":
                weatherIcon.src = "../imag/rainy-day.png"; // Rainy
                break;
            case "Drizzle":
                weatherIcon.src = "../imag/cloudy(3).png"; // Light rain
                break;
            case "Thunderstorm":
                weatherIcon.src = "../imag/thunderstorm.png"; // Thunderstorm (Fixed the file name here)
                break;
            case "Snow":
                weatherIcon.src = "../imag/snowflake.png"; // Snow
                break;
            case "Mist":
                weatherIcon.src = "../imag/fog.png"; // Misty
                break;
            case "Haze":
                weatherIcon.src = "../imag/haze.png"; // Hazy
                break;
            case "Fog":
                weatherIcon.src = "../imag/fog.png"; // Foggy
                break;
            case "Tornado":
                weatherIcon.src = "../imag/tornado.png"; // Tornado
                break;
            default:
                weatherIcon.src = "../imag/default.png"; // Default image for unknown conditions
                break;
        }

    } catch (error) {
        console.error("Error:", error.message);
        alert("Unable to retrieve weather data. Please check the city name and try again.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
