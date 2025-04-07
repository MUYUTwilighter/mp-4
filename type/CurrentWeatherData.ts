export default interface CurrentWeatherData {
    name: string,
    description: string,
    icon: string,
    temp: number,
    feelsLike: number,
    tempMin: number,
    tempMax: number,
    pressure: number,
    humidity: number,
    visibility: number,
    wind: {
        speed: number,
        deg: number
    }
};