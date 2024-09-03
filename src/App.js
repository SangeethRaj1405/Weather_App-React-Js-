import React, { useState } from "react";
import "./App.css";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  latitude,
  longitude,
  humidity,
  wind
}) => {
  return (
    <>
      {icon && (
        <div className="image">
          <img src={icon} alt="weather icon" />
        </div>
      )}

      {temp !== null && (
        <div className="temperature">
          {temp}&deg;C
        </div>
      )}

      {city && (
        <div className="city">
          {city}
        </div>
      )}

      {country && (
        <div className="country">
          {country}
        </div>
      )}

      {latitude !== null && longitude !== null && (
        <div className="coordinates">
          <div className="latitude">
            <span>Latitude: {latitude}</span>
          </div>
          <div className="longitude">
            <span>Longitude: {longitude}</span>
          </div>
        </div>
      )}

      {(humidity !== null || wind !== null) && (
        <div className="data-container">
          {humidity !== null && (
            <div className="element">
              <img src={require("./Images/humidity.png")} alt="humidity icon" className="icon" />
              <div className="humidity-percent">{humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          )}
          {wind !== null && (
            <div className="element">
              <img src={require("./Images/wind.png")} alt="wind icon" className="icon" />
              <div className="wind-percent">{wind} m/s</div>
              <div className="text">Wind Speed</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

function App() {
  const [icon, setIcon] = useState(null);
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!text.trim()) return; // Don't search if input is empty
    setLoading(true);
    const apikey = "61805e16e30e90f08f059a00d9f83097";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`;

    const iconMap = {
      "01d": require("./Images/clear.png"),
      "01n": require("./Images/clear.png"),
      "02d": require("./Images/cloud.png"),
      "02n": require("./Images/cloud.png"),
      "09d": require("./Images/drizzle.png"),
      "09n": require("./Images/drizzle.png"),
      "10d": require("./Images/rain.png"),
      "10n": require("./Images/rain.png"),
      "13d": require("./Images/snow.png"),
      "13n": require("./Images/snow.png")
    };

    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City Not Found");
        setLoading(false);
        return;
      }

      const weatherIcon = data.weather[0].icon;
      setIcon(iconMap[weatherIcon] || require("./Images/cloud.png")); // Default to cloud if not found

      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

    } catch (error) {
      console.error("An error occurred: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <div className="container">
      <div className="input">
        <input
          type="text"
          className="input_box"
          onChange={handleCity}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder="Enter the city to search"
        />
        <div className="search_icon" onClick={search}>
          <img src={require("./Images/search.png")} alt="search" />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        latitude={latitude}
        longitude={longitude}
        humidity={humidity}
        wind={wind}
      />
      <p className="copyright">Designed by <span>P S Sangeeth Raj</span></p>
    </div>
  );
}

export default App;
