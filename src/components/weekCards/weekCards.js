import wind from "../../images/wind.png";
import "./weekCards.css";
import { useState, useEffect } from "react";
import useWeatherService from "../services/weatherService";
import setContent from "../utils/setContent";
const WeekCards = () => {
  const [weekInfo, setWeekInfo] = useState("");
  const { getWeekWeather, clearError, process, setProcess } =
    useWeatherService();

  useEffect(() => {
    updateInfo();
  }, []);

  const updateInfo = () => {
    clearError();
    getWeekWeather()
      .then(onInfoLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onInfoLoaded = (info) => {
    const weekArr = info.filter((day) => {
      return day["date"].getHours() == 12;
    });
    setWeekInfo(weekArr);
    console.log(weekArr);
  };

  return <>{setContent(process, View, weekInfo)}</>;
};

const View = ({ data }) => {
  return (
    <div className="info__cards-flex">
      {data.map((day) => {
        const temp = day["temp"];
        const imagePath = `https://openweathermap.org/img/wn/${day["iconID"]}.png`;
        const date =
          day["date"].getDate() < 10
            ? "0" + day["date"].getDate()
            : day["date"].getDate();
        const month =
          day["date"].getMonth() + 1 < 10
            ? `0${day["date"].getMonth() + 1}`
            : day["date"].getMonth() + 1;
        const fullDate = `${date}.${month}`;
        return (
          <div className="card">
            <p className="card__name info">{fullDate}</p>
            <img src={imagePath} className="card__img" />
            <p className="card__info info">{temp} °C</p>
          </div>
        );
      })}
    </div>
  );
};

export default WeekCards;
