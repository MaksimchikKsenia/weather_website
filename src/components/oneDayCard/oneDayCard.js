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
    let tomorrow = new Date(today);

    tomorrow.setDate(today.getDate() + 1);
    // Преобразуем завтрашнюю дату в строку в формате "ГГГГ-ММ-ДД"
    const tomorrowStr = tomorrow.toString().slice(0, 10);
    const tomorrowArr = info.filter((day) => {
      // Сравниваем даты в формате "ГГГГ-ММ-ДД"
      return day.date.slice(0, -3) === tomorrowStr.substring(8, 10);
    });

    setWeekInfo(tomorrowArr);
  };

  return <>{setContent(process, View, tomorrowInfo)}</>;
};

const View = ({ data }) => {
  console.log(data);
  return (
    <div className="container ">
      <p className="text oneDay__title">Weather during the day</p>
      <div className="weather__hours-cards">
        {data.map((dayTime) => {
          const temp = dayTime["temp"];
          const imagePath = `https://openweathermap.org/img/wn/${dayTime["iconID"]}.png`;
          const time = dayTime.time.slice(0, -3);
          return (
            <div className="weather__hours-card " key={time.slice(0, -3)}>
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
