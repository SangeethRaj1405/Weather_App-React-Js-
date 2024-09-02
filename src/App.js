import clear from "./Images/clear.png";
import cloud from "./Images/cloud.png";
import drizzle from "./Images/drizzle.png";
import humidity from "./Images/humidity.png";
import rain from "./Images/rain.png";
import search from "./Images/search.png";
import snow from "./Images/snow.png";
import wind from "./Images/wind.png";
import "./App.css";
import { useState } from "react";


const Weather_details = ({icon, temp, city, country, latitude, longtitude}) => {
  return(
    <>
      <div className="image"> 
        <img src={icon} alt="image" />
      </div>

      <div className="temperature">
         {temp}&deg;C
      </div>

      <div className="city">
          {city}
      </div>

      <div className="country">
        {country}
      </div>

      <div className="cordinates">
        <div className="latitude">
        <span>latitude : {latitude}</span>
        </div>
        <div className="longtitude">
        <span>longtitude : {longtitude}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" 
          className="icon"/>
          <div className="humidity-percent">85%</div>
          <div className="text">Humidity</div>
        </div>
        <div className="element">
          <img src={wind} alt="" 
          className="icon"/>
          <div className="wind-percent">85%</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </>
  );
}
function App() {
  const [icon, setIcon]=useState(snow);
  const [temp, setTemp]=useState(0);
  const [city, setCity]=useState("karur");
  const [country, setCountry]=useState("India");
  const [latitude, setLatitude]=useState(0);
  const [longtitude, setLongtitude]=useState(0);
  return (
    <>
    <div className="container">
      <div className="input">
        <input type="text" 
        className="input_box"
        placeholder="Search City "/>
      <div className="search_icon" >
        <img src={search} alt="search" />
      </div>
      </div>
      <Weather_details
       icon={icon} 
       temp={temp} 
       city={city} 
       country={country}
       latitude={latitude}
       longtitude={longtitude}/>
    </div> 
    </>
    
  );
}

export default App;
