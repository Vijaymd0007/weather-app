import React, { useEffect, useState } from 'react'
import apikeys from "./API_keys"
import axios from "axios"
import "./WeatherBoard.css"
import { styled } from 'styled-components'
import home from './images/home.jpg'
import leftimg from './images/left.jpg'
import Clock from 'react-live-clock'
import Forcast from './Forcast'
import ReactAnimatedWeather from "react-animated-weather";


const dateBuilder = (d)=>{
    let months = [
        "January",
        "February", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ]
    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} , ${date} ${month} ${year}`;
}



   
const WeatherBoard = () => {

    const [weather,setWeather]= useState({
        temperatureC: undefined,
        temperatureF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        main: undefined,
        icon: "CLEAR_DAY",
      })
    const [loading,setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null);

 


 useEffect(()=>{
        if(navigator.geolocation){
            getPosition()
            .then((position)=>{
                getWeather(position.coords.latitude,position.coords.longitude);
            })
            .catch((err)=>{
                getWeather(28.67,77.22);
                alert("you have disabled location service. Allow 'This APP to access your location. Your current location will be used for calculating Real time weather.")
            })
            
        }
        else{
            alert("Geolocation is not available")
        }

        const timerDelay = setInterval(() => {
            getWeather(setWeather.lat, setWeather.lon);
          }, 600000);

          return()=> clearInterval(timerDelay)

    },[])

   
      

    const getPosition =(options)=>{
        return new Promise((res,rej)=>{
            navigator.geolocation.getCurrentPosition(res,rej,options);
        })
    }

    const getWeather = async (lat,lon)=>{
        try{
            const api = await fetch(`${apikeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apikeys.key}`)
    
        const data = await api.json()
        setWeather({
            lat:lat,
            lon:lon,
            city:data.name,
            temperatureC: Math.round(data.main.temp),
            temperatureF: Math.round(data.main.temp * 1.8 + 32),
            humidity: data.main.humidity,
            main: data.weather[0].main,
            country: data.sys.country,
        })
        setLoading(false);

        } catch (error) {
            setErrorMessage("Error fetching weather data");
            setLoading(false);
          }
    }
   


 
//    const getIconFromMain = (main) => {
//     switch (main) {
//       case "Haze":
//         return "CLEAR_DAY";
//       case "Clouds":
//         return "CLOUDY";
//       case "Rain":
//         return "RAIN";
//       case "Snow":
//         return "SNOW";
//       case "Dust":
//         return "WIND";
//       case "Drizzle":
//         return "SLEET";
//       case "Fog":
//         return "FOG";
//       case "Smoke":
//         return "FOG";
//       case "Tornado":
//         return "WIND";
//       default:
//         return "CLEAR_DAY";
//     }

// }

// console.log("weather",weather)
  return (
    <Container>
    <div className='row'>
        <div className='col-6 left'>
            <img src={leftimg} />
           {weather && <h2 className='city'> {weather.city}</h2>}
            {weather && <h3 className='country'> {weather.country}</h3>}
            <div className='current-time'>
                <Clock format="HH:mm:ss"  interval={1000} ticking={true}/>

            </div>
            <p className='date'>{dateBuilder(new Date())}</p>
           {weather && <h1 className='temp'>{weather.temperatureC} &deg;C</h1>}
        </div>


        <div className='col-6 right'>
           
           <Forcast   />  </div>
        


    </div>
    </Container>
  )
}

export default WeatherBoard

const Container = styled.div`
/* background-image: url(${home}); */



  position: absolute;
  top:70px;
  left:25%;

.row{
    --bs-gutter-x: 0px !important;
    /* filter:drop-shadow(10px 10px 100px white); */
}
 
.left{
    width:30vw;
    height:70vh;
    
}
.left p{
    position: absolute;
    bottom: 10px;
    left:10px;
    color:white;
}
.left h1{
    position: absolute;
    bottom: 10px;
    left:45%;
    color:white;
}
.left h2{
    position: absolute;
    top: 10px;
    left:35%;
    color:white;
}
.left h3{
    position: absolute;
    top: 50px;
    left:50%;
    color:white;
}
.left .current-time{
    position: absolute;
    top: 45%;
    left:100px;
    color:white;
    font-size: 4rem;
    transition:0.8s ease;
}
.left .current-time:hover{
    position: absolute;
    
    filter:drop-shadow(10px 10px 30px white);
}


.left img{
    width:30vw;
    height:70vh;
}
.right{
    background-color: rgba(0, 0, 0, 0.7);
    width:20vw;
    height:70vh;
    color:white;
   
   
}
@media (max-width: 1130px) {
    .left .current-time{
    position: absolute;
    top: 45%;
    left:100px;
    color:white;
    font-size: 3rem;
    transition:0.8s ease;
}
}

@media (max-width: 700px) {
    position: absolute;
  top:70px;
  left:10%;
    
    .left{
    width:50vw;
    height:80vh; 
}

.left .current-time{
    
    font-size: 3rem;
    transition:0.8s ease;
}
.left img{
    width:50vw;
    height:80vh;
}

.right{
    background-color: rgba(0, 0, 0, 0.7);
    width:35vw;
    height:80vh;
    color:white;
   
   
}






}




@media (max-width: 360px) {
    position: absolute;
  top:0px;
  left:0px;


  .left{
    width:100vw;
    height:100vh;
    
}
.left img{
    width:100vw;
    height:100vh;
}
.row{
    display: flex;
    flex-direction:column;
}

.left p{
    position: absolute;
    top: 600px;
    left:25%;
    color:white;
    
}
.left h1{
    position: absolute;
    top: 400px;
    left:30%;
    color:white;
    font-size: 70px;
}

.left .current-time{
    position: absolute;
    top: 150px;
    left:10px;
    color:white;
    font-size: 90px;
}

.right{
    background-color: rgba(0, 0, 0, 0.7);
    width:100vw;
    height:100vh;
    color:white;
   
   
}



  }



`


