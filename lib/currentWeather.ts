"use server";

import CurrentWeatherData from "@/type/CurrentWeatherData";

const URL = "https://api.openweathermap.org/data/2.5/weather";

export default async function currentWeather(lat: number, lon: number): Promise<CurrentWeatherData | void> {
    return await fetch(`${URL}?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`)
        .then((res) => res.json())
        .then(data => {
            return {
                name: data.name,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                temp: data.main.temp,
                feelsLike: data.main.feels_like,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                visibility: data.visibility,
                wind: {
                    speed: data.wind.speed,
                    deg: data.wind.deg
                }
            }
        }).catch(reason => console.log(reason));
}
