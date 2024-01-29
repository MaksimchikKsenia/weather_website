import wind from "../../images/wind.png";
import "./weekCards.css";
import { useState, useEffect } from "react";
import useWeatherService from "../services/weatherService";
import setContent from "../utils/setContent";
import { Link } from "react-router-dom";
const WeekCards = () => {
  const [weekInfo, setWeekInfo] = useState("");
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
    const weekArr = info.filter((day) => {
      return day["date"].getHours() == 12;
    });
    setWeekInfo(weekArr);
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
        const proveDate = `${day["date"].getDate()}`;
        return (
          <div className="card" key={fullDate}>
            <Link to={`/weeklyForecast/${proveDate}`} className="linkForDay">
              <div className="card__info">
                <p className="card__name info">{fullDate}</p>
                <img src={imagePath} className="card__img" />
                <p className="card__info info">{temp} °C</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default WeekCards;
