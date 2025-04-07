"use client";

import {Card, CardActionArea, CardContent, CardHeader, CardMedia} from "@mui/material";
import CurrentWeatherData from "@/type/CurrentWeatherData";
import {useEffect, useState} from "react";
import currentWeather from "@/lib/currentWeather";
import queryGeo from "@/lib/queryGeo";

export default function WeatherPreview({zip}: { zip: string }) {
    const [weatherData, setWeatherData] = useState<CurrentWeatherData | null>(null);

    useEffect(() => {
        if (!zip) return;
        queryGeo(zip).then(data => {
            currentWeather(data.lat, data.lon).then(data => setWeatherData(data ? data : null));
        });
    }, [zip]);

    return weatherData ? <Card>
        <CardActionArea href={`/zip/${zip}`}>
            <CardHeader title={weatherData.name}></CardHeader>
            <CardMedia
                height="194"
                component="img"
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            ></CardMedia>
            <CardContent>{weatherData.temp}°C {weatherData.description}</CardContent>
        </CardActionArea>
    </Card> : <Card>
        <CardActionArea href={`/zip/${zip}`}>
            <CardHeader title={"--"}></CardHeader>
            <CardMedia
                height="194"
                component="img"
                src={"/loading.svg"}
            ></CardMedia>
            <CardContent>--</CardContent>
        </CardActionArea>
    </Card>
}