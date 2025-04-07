"use client";

import CurrentWeatherData from "@/type/CurrentWeatherData";
import styled from "@emotion/styled";
import {Container} from "@mui/material";

const ICON_URL = "https://openweathermap.org/img/wn/";

const WeatherContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export default function CurrentWeather({data}: { data: CurrentWeatherData | null }) {
    return data ? <WeatherContainer>
        <h2>{data.name}</h2>
        {data ? <img src={`${ICON_URL}${data.icon}@2x.png`} alt="icon" width={100}/> : ""}
        <h2>{data.temp}°C</h2>
        <h3>{data.description}</h3>
        <span>Temp: min {data.tempMin}°C max {data.tempMax}°C, feels like {data.feelsLike}°C</span>
        <span>Air: pressure {data.pressure} hPa, humidity {data.humidity}%, visibility {data.visibility} m</span>
        <span>Wind: {data.wind.speed} m/s, {data.wind.deg}°</span>
    </WeatherContainer> : <WeatherContainer>
        <h2>----</h2>
        <img src="/loading.svg" alt="icon" width={100}/>
        <h2>--</h2>
        <h3>----</h3>
        <span>Temp: min -- max --, feels like --</span>
        <span>Air: --, humidity --, visibility --</span>
        <span>Wind: --, --, gust --</span>
    </WeatherContainer>
}