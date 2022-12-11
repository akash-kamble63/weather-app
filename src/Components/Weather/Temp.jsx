import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import "./styles.css"


export const Temp = () => {
    const [searchValue, setSearchValue] = useState("pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async() =>{
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=672a554b15b731e20fd620e09c407c92`;
            const res =await fetch(url);
            const data = await res.json();
            console.log(data);
            const {temp,humidity,pressure} = data.main;
            const {main:weather} = data.weather[0];
            const {name} = data;
            const {speed}  = data.wind;
            const {country,sunset} = data.sys;
            const newWeather = {temp,humidity,pressure,weather,speed, name, country,sunset};
            setTempInfo(newWeather);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeatherInfo();
    }, [])
    
    
  return (
    <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='Search' id="search" autoFocus className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        <WeatherCard tempInfo={tempInfo} />
        
    </>
  )
}
