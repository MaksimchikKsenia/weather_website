import { useHttp } from "../hooks/http.hook";
const useWeatherService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://api.openweathermap.org/data/2.5/weather?q=";
  const _apiKey = "5245a683489c18169bfb51f6b418c9c7&units=metric";

  const getTodayWeather = async (city = "Grodno") => {
    const res = await request(`${_apiBase}${city}&appid=${_apiKey}`);
    return _transformData(res);
  };

  const getWeekWeather = async (city = "Grodno") => {
    const res = await request(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${_apiKey}`
    );
    return res.list.map(_transformWeekData);
  };

  const _transformData = (day) => {
    return {
      id: day.id,
      date: new Date(day.dt * 1000),
      type: day.weather[0].main,
      iconID: day.weather[0].icon,
      temp: Math.round(day.main.temp),
      windSpeed: day.wind.gust
        ? "wind " + Math.round(day.wind.gust) + "m/s"
        : "no wind",
      temp_min: Math.round(day.main.temp_min),
      temp_max: Math.round(day.main.temp_max),
      humidity: day.main.humidity + " %",
      pressure: day.main.pressure + " hPa",
      sunrise: new Date(day.sys.sunrise),
      sunset: new Date(day.sys.sunset),
      rain: day.rain ? "rain" + day.rain["1h"] + " mm" : "no rain",
      city: day.name,
      clouds: day.clouds ? day.clouds["all"] + " %" : "no clouds",
    };
  };

  const _transformWeekData = (day) => {
    return {
      date: new Date(day.dt * 1000),
      iconID: day.weather[0].icon,
      temp: Math.round(day.main.temp),
      windSpeed: day.wind ? Math.round(day.wind.gust) +' m/s': "no wind",
      temp_min: Math.round(day.main.temp_min),
      temp_max: Math.round(day.main.temp_max),
      humidity: day.main.humidity + " %",
      pressure: day.main.pressure + " hPa",
      rain: day.rain ? "rain" + day.rain["3h"] + " mm" : "no rain",
      clouds: day.clouds ? day.clouds["all"] + " %" : "no clouds",
    };
  };

  return {
    getTodayWeather,
    getWeekWeather,
    clearError,
    process,
    setProcess,
  };
};

export default useWeatherService;
