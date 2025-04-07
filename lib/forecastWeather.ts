"use server";

import ForecastWeatherData from "@/type/ForecastWeatherData";

const URL = "https://api.openweathermap.org/data/2.5/forecast";

function searchTemp(arr: Array<any>, start: number) {
    let max = -Infinity;
    let min = Infinity;
    for (let i = start; i < arr.length && i < start + 8; i++) {
        max = Math.max(max, arr[i].main.temp);
        min = Math.min(min, arr[i].main.temp);
    }
    return {max, min};
}

export default async function forecastWeather(lat: number, lon: number): Promise<Array<ForecastWeatherData> | void> {
    return await fetch(`${URL}?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`)
        .then((res) => res.json())
        .then(data => {
            const arr = [];
            let i = 0;
            for (; i < data.list.length; i++) {
                const date = new Date(data.list[i].dt * 1000);
                if (date.getDate() !== new Date().getDate()) break;
            }
            for (; i < data.list.length - 4; i += 8) {
                const temp = searchTemp(data.list, i);
                arr.push({
                    dt: data.list[i].dt * 1000,
                    icon: data.list[i + 4].weather[0].icon,
                    tempMin: temp.min,
                    tempMax: temp.max
                });
            }
            return arr;
        }).catch(reason => console.log(reason));
}
