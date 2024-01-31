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
    const weekArr = info.filter((day, i) => {
      if (i % 8 === 0) {
        return day;
      }
    });
    setWeekInfo(weekArr);
    console.log(weekArr);
  };

  return <>{setContent(process, View, weekInfo)}</>;
};

const View = ({ data }) => {
  console.log(data);
  return (
    <div className=" week__cards-grid">
      {data.map((day) => {
        const temp = day["temp"];
        const imagePath = `https://openweathermap.org/img/wn/${day["iconID"]}.png`;
        const date = day.date;
        const proveDate = date.slice(0, -3);
        return (
          <div className="week__card" key={date}>
            <Link to={`/weeklyForecast/${proveDate}`} className="linkForDay">
              <div className="card__info">
                <p className="card__date info">{date}</p>
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
