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
            console.log(json);
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

            {/*2. 부가 설명 Text */}
            <AskHowYouFeel style={{cursor : 'default'}}>이런날엔 기분이 어떠세요?</AskHowYouFeel>

            {/*3. 날씨 평가 버튼 */}
            <WeatherLikeContainer>
                <WeatherLikeBtn />  {/*매우 별로*/}
                <WeatherLikeBtn />  {/*별로*/}
                <WeatherLikeBtn />  {/*보통*/}
                <WeatherLikeBtn />  {/*만족*/}
                <WeatherLikeBtn />  {/*매우만족*/}
            </WeatherLikeContainer>

            {/*4. 좋음 나쁨 */}
            <WeatherLikeTextContainer style={{cursor : 'default'}}>
                <BadText>나쁨</BadText>
                <GoodText>좋음</GoodText>
            </WeatherLikeTextContainer>
        </WeatherFrame>
    );
};

const WeatherFrame = styled.div`
    display : flex;
    width : calc(100% -40px);
    height : 160px;

    border-radius : 16px;
    padding : 10px 20px 10px 20px;
    background-color: white;
    flex-direction : column;
    justify-content : space-between;
    align-items: center;

    box-shadow: 0px 0px 32px 0px #FFA199;
    transition : 0.5s;
    opacity : 0.85;
    &:hover {
        opacity: 1;
    }
`
// 날씨 정보를 담을 Container
const DisplayContainer = styled.div`
    display : flex;
    width : 100%;
    height : 70px;
    align-items : center;
`
const DisplayIconContainer = styled.div`
    margin-left : 10px;
    display : flex;
    width : 50%;
    height : 100%;
    justify-content: center;
    align-items: center;
`
const DisplayTextContainer = styled.div`
    margin-right : 10px;
    display : flex;
    width : 50%;
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
const AskHowYouFeel = styled.div`
    display : flex;
    width : 100%;
    height : 20px;
    justify-content: center;
    align-items : center;   
    color : rgba(54,54,54,52%); // 연한 회색 - 보조Text
    font-size : 12px;
`
const WeatherLikeContainer = styled.div`
    display : flex;
    width : 100%;
    height : 20px;
    justify-content: space-evenly;
    align-items : center;
`
const WeatherLikeBtn = styled.div`
    cursor : pointer;
    width : 15px;
    height : 15px;
    border-radius : 50%;
    border : 1px solid grey;

    &:hover{
        background-color : grey;
    }
`
const WeatherLikeTextContainer = styled.div`
    display : flex;
    width : 86%;
    height : 30px;
    
    justify-content : space-between;
`
const BadText = styled.div`
    width : auto;
    min-width : 10px;
    height : 100%;
    color : rgba(235,71,71,100);
    font-size : 12px;
`
const GoodText = styled.div`
    width : auto;
    min-width : 10px;
    height : 100%;
    color : rgba(35,251,0,100);
    font-size : 12px;
`

export default Weather;