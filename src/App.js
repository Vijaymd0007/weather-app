import React from 'react'
import WeatherBoard from './WeatherBoard'
import CurrentLocation from './CurrentLocation'
import { styled } from 'styled-components'
import home from "./images/home.jpg"



const App = () => {
 

  return (
    <Container>
      <div className='main'>
        <img src={home}></img>
        <WeatherBoard />
        </div>

      

    
      {/* <CurrentLocation/> */}

      


    </Container>
  )
}

export default App

const Container = styled.div`
img{
  height: 100vh;
  width:100vw;
}

.main{
  position: relative;

}


 `