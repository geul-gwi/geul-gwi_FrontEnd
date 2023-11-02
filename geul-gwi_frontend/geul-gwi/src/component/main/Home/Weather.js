import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Weather = () => {
    const API_KEY = "abd636f506303a51f6d9be031e986406";    // https://home.openweathermap.org/api_keys 여기서 받아온 KEY 값

    const [weatherState,setWeatherState] = useState({
        'place' : '',
        'weather' : '',
        'temp' : '',
    })
    const [iconImg, setIconImg] = useState('');
    
    const OnloadWeather = () => {
        navigator.geolocation.getCurrentPosition(GetPosition);
    }
    // Geolocation으로 받아온 좌표값 저장
    const GetPosition = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
    }
    const getWeather = (latitude, longitude) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
        )
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            const updateDict = {
                'place' : json.name,
                'weather' : json.weather[0].description,
                'temp' : json.main.temp
            }
            const icon = json.weather[0].icon; 
            const iconRefact = icon.substring(0,2) + "d"; // 앞의 숫자만 추출하고 뒤에 n이 붙는 것을 d를 붙여 고정함
            const iconURL = `http://openweathermap.org/img/wn/${iconRefact}@2x.png`
            setWeatherState(updateDict);
            setIconImg(iconURL);
        })
    }
    // 불러올 때, Rendering
    useEffect(() => {
        OnloadWeather();
    },[]);




    return (
        <WeatherFrame> 
            <Title>실시간 날씨</Title>
            {/*1. 날씨 정보를 담을 Container */}
            <DisplayContainer style={{cursor : 'default'}}>
                {/* 아이콘을 담을 Container */}
                <DisplayIconContainer>
                    {/* <TiWeatherShower size="60" color="#5A2ABF" /> */}
                    <img src={iconImg} alt='Weather_ICON' />
                    </DisplayIconContainer> 
                {/* 날씨 정보 Text Container */}
                <DisplayTextContainer>
                    <TextWeatherName>{weatherState.weather}</TextWeatherName>
                    <TextWeatherState>{weatherState.temp}</TextWeatherState>
                </DisplayTextContainer> 
            </DisplayContainer>
        </WeatherFrame>
    );
};

const WeatherFrame = styled.div`
    user-select: none;
    display : flex;
    height : 140px;
    border-radius : 8px;
    background-color: white;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 16px 0px #ccebb5;
`

// 날씨 정보를 담을 Container
const Title = styled.div`
    padding: 20px 5px 20px 5px;
    border-bottom: 1px solid #ccc;

`

// 날씨 정보를 담을 Container
const DisplayContainer = styled.div`
    display : flex;
    width : 70%;
    height : 80px;
    align-items : center;
`
const DisplayIconContainer = styled.div`
    margin-left : 10px;
    display : flex;
    width : 70%;
    height : 100%;
    justify-content: center;
    align-items: center;
`
const DisplayTextContainer = styled.div`
    margin-right : 10px;
    display : flex;
    width : 70%;
    height : 70%;
    flex-direction: column;
    justify-content : center;
    align-items: center;
`
const TextWeatherName = styled.div`
    width : 100%;
    height : 50%;
    display : flex;
    justify-content: center;
    align-items : center;
    font-family : "Nanum Square";
    font-style : "bold";
    font-size : 16px;
    color : #474646;
`
const TextWeatherState = styled.div`
    width : 100%;
    height : 50%;
    display : flex;
    justify-content: center;
    align-items: center;
    color : #6C6B6B;
    font-size : 14px;
`


export default Weather;