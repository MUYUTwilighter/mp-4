"use server";

import GeoData from "@/type/GeoData";

const URL = "https://api.openweathermap.org/geo/1.0/zip";

export default async function queryGeo(zip: string): Promise<GeoData> {
    return await fetch(`${URL}?zip=${zip}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
        .then((res) => res.json())
        .then(data => {
            return {
                name: data.name,
                lat: data.lat,
                lon: data.lon,
                country: data.country
            }
        })
}