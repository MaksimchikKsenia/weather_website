import "./oneDayCard.css";
import useWeatherService from "../services/weatherService";
import { useState, useEffect } from "react";
import setContent from "../utils/setContent";
import wind from "../../images/wind.png";
import Spinner from "../spinner/spinner";

const OneDayCard = () => {
  const [tomorrowInfo, setWeekInfo] = useState("");
  
  const { getWeekWeather, clearError, process, setProcess } =
    useWeatherService();

  useEffect(() => {
    updateInfo();
  }, [localStorage.getItem("city")]);

  const updateInfo = () => {
    clearError();
    getWeekWeather(
      localStorage.getItem("city") ? localStorage.getItem("city") : "Гродно"
    )
      .then(onInfoLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onInfoLoaded = (info) => {
    const today = new Date();
    const tomorrowArr = info.filter((day) => {
      return day["date"].getDate() === today.getDate() + 1;
    });
    setWeekInfo(tomorrowArr);
  };

  return <>{setContent(process, View, tomorrowInfo)}</>;
};

const View = ({ data }) => {
  return (
    <div className="container ">
      <p className="text oneDay__title">Weather during the day</p>
      <div className="weather__hours-cards">
        {data.map((dayTime) => {
          const temp = dayTime["temp"];
          const imagePath = `https://openweathermap.org/img/wn/${dayTime["iconID"]}.png`;
          const hour =
            dayTime["date"].getHours() < 10
              ? "0" + dayTime["date"].getHours()
              : dayTime["date"].getHours();
          const minutes =
            dayTime["date"].getMinutes() < 10
              ? "0" + dayTime["date"].getMinutes()
              : dayTime["date"].getMinutes();
          const time = `${hour}:${minutes}`;
          return (
            <div className="weather__hours-card ">
              <p className="text weather__card-time">{time}</p>
              <img src={imagePath} className="weather__hours-img" />
              <p className="text weather__card-temp">{temp} °C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OneDayCard;
