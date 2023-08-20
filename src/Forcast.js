import React, { useEffect, useState } from 'react'
import axios from "axios"
import apikeys from "./API_keys"
import ReactAnimatedWeather from "react-animated-weather"
import { styled } from 'styled-components'


const Forcast = () => {
    
    const [query,setQuery] = useState("")
    const [error,setError] = useState("")
    const [weather,setWeather] = useState({});

    console.log("forcast",weather)

    const search=(city)=>{
        axios.get(`${apikeys.base}weather?q=${
            city != "[object Object]" ? city : query
          }&units=metric&APPID=${apikeys.key}`)
        .then((response)=>{
            setWeather(response.data)
        })
        .catch((error)=>{
            console.log(error);
            setWeather("");
            setError("Error fetching weather data");
            setQuery("");
        })
    }
    

    const checkTime=(i)=>{
        if(i<10){
            i="0"+i;
        }
        return i;
    }


    useEffect(() => {
        search("Delhi");
      }, []);

      const defaults = {
        color: "white",
        size: 112,
        animate: true,
      };

    //   console.log(props)

    let iconInfo = "";
    if (weather.weather && weather.weather[0]) {
        iconInfo = weather.weather[0].main;
    }
console.log("icon",iconInfo)
      const getIconFromMain = (iconInfo) => {
        switch (iconInfo) {
          case "Haze":
            return "CLEAR_DAY";
          case "Clouds":
            return "CLOUDY";
          case "Rain":
            return "RAIN";
          case "Snow":
            return "SNOW";
          case "Dust":
            return "WIND";
          case "Drizzle":
            return "SLEET";
          case "Fog":
            return "FOG";
          case "Smoke":
            return "FOG";
          case "Tornado":
            return "WIND";
          default:
            return "CLEAR_DAY";
        }
    }

    console.log(getIconFromMain())

    
    

  return (
    <Container>
        <div className='icon'>
        <ReactAnimatedWeather
          icon={getIconFromMain(iconInfo)}
         color="white"
        
        />
        <h2>{iconInfo}</h2>
        </div>
       <div className='serach-box'>
        <input
        type='text'
        className='search-bar'
        placeholder='Search any city'
        onChange={(e)=>setQuery(e.target.value)}
        value={query}
        
        
        />
         <div className="img-box">
            
            
            <button className="btn btn-light" type='submit' onClick={search}>Search</button>
          </div>

          <div>
          {weather.name && <h6>{weather.name}</h6>}
          <h6>|</h6>
          {weather.sys && weather.sys.country && <h6>{weather.sys.country}</h6>}

          {weather.main && weather.main.temp && (
  <p>
    Temperature: {weather.main.temp}°C ({weather.weather[0].main})
  </p>
)}
          {weather.main && weather.main.humidity && (
            <p>Humidity: {weather.main.humidity}%</p>
          )}
          {weather.visibility && (
            <p>Visibility: {weather.visibility} miles</p>
          )}
          {weather.wind && weather.wind.speed && (
            <p>Wind Speed: {weather.wind.speed} km/h</p>
          )}
          </div>

       </div>


    </Container>
  )
}

export default Forcast


const Container=styled.div`

padding:30px;



.search-bar{
    background:transparent;
    border:none;
    outline:none;
    border-bottom:2px solid white ;
    color:white;
    margin-left:13%;
    margin-left:13%;
    width:80%;
}

.icon{
    margin-left:32%;
}

.img-box button{
    margin-left:35%;
    margin-top:7px;
   
}

h6{
    display: inline-block;
    margin-top: 10px;
  
}

h6:first-child{
    display: inline-block;
    padding-right:25px;
    padding-left:50px;
}
h6:nth-child(3){
   padding-left: 25px;
}
p{
    transition: 0.8s ease;
}


 @media (max-width: 400px) {

     .search-bar{
    margin-top:20px;
    margin-left:3%;
    font-size:30px;
} 
p{
    font-size: 20px;
}

h6:first-child{
    display: inline-block;
    padding-right:25px;
    padding-left:0;
}

} 
 @media (max-width: 700px) {

     

h6:first-child{
    display: inline-block;
    padding-right:25px;
    padding-left:25px;
}

} 
    

`