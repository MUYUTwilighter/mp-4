"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import ForecastWeatherData from "@/type/ForecastWeatherData";
import CurrentWeatherData from "@/type/CurrentWeatherData";
import CurrentWeather from "@/component/CurrentWeather";
import ForecastWeather from "@/component/ForecastWeather";
import {Container, Typography} from "@mui/material";
import queryGeo from "@/lib/queryGeo";
import forecastWeather from "@/lib/forecastWeather";
import currentWeather from "@/lib/currentWeather";
import styled from "@emotion/styled";

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10%;
`;

const StyledForecast = styled(ForecastWeather)`
    border-radius: 3mm;
    background-color: #b3b3b3;
`;

export default function WeatherPage() {
    const zip = useParams().zip;
    if (!zip) return <>
        <Typography variant="h1">Missing zip code</Typography>
    </>;
    const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData | null>(null);
    const [forecastData, setForecastData] = useState<Array<ForecastWeatherData> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        queryGeo(zip.toString()).then(data => {
            currentWeather(data.lat, data.lon).then(data => setCurrentWeatherData(data ? data : null)).catch(reason => setError(reason));
            forecastWeather(data.lat, data.lon).then(data => setForecastData(data ? data : null)).catch(reason => setError(reason));
        })
    }, [zip]);

    return error ? <>
        <Typography variant="h1">Oops, service unavailable</Typography>
        <Typography variant="h2">{error}</Typography>
    </> : <StyledContainer>
        <CurrentWeather data={currentWeatherData}></CurrentWeather>
        <StyledForecast data={forecastData}></StyledForecast>
    </StyledContainer>;
}