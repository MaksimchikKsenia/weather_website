import "./singleWeather.css";
import cloud from "../../images/cloud.png";
import pressureCard from "../../images/pressure.png";
import rainCard from "../../images/rain.png";
import windCard from "../../images/wind.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useWeatherService from "../services/weatherService";
import setContent from "../utils/setContent";

const SingleWeather = () => {
  const { date } = useParams();
  const [infoForDay, setInfoForDay] = useState("");
  const { getWeekWeather, clearError, process, setProcess } =
    useWeatherService();

  useEffect(() => {
    updateInfo();
  }, [date]);

  const updateInfo = () => {
    clearError();
    getWeekWeather(
      localStorage.getItem("city") ? localStorage.getItem("city") : "Гродно"
    )
      .then(onInfoLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onInfoLoaded = (info) => {
    const todayDetails = info.filter((day) => {
      if (day.date.slice(0, -3) == date) return day;
    });
    console.log(todayDetails);
    setInfoForDay(todayDetails);
  };

  return setContent(process, View, infoForDay);
};

const View = ({ data }) => {
  const { clouds, windSpeed, pressure, rain, date } = data[0];

  return (
    <div className="container">
      <p className="singleWeather__title">
        Weather forecast for {date} by hours
      </p>

      <div className="weather__hours-cards">
        {data.map((day) => {
          const temp = day["temp"];
          const imagePath = `https://openweathermap.org/img/wn/${day["iconID"]}.png`;
          const time = day.time.slice(0, -3);
          return (
            <div className="weather__hours-card " key={time}>
              <p className="text weather__card-time">{time}</p>
              <img src={imagePath} className="weather__hours-img" />
              <p className="text weather__card-temp">{temp}°C</p>
            </div>
          );
        })}
      </div>
      <p className="singleWeather__title">Details about the weather</p>
      <div className="info__cards-grid">
        <div className="card">
          <p className="card__name info">clouds</p>
          <img src={cloud} />
          <p className="card__info info">{clouds}</p>
        </div>

        <div className="card">
          <p className="card__name info">pressure</p>
          <img src={pressureCard} />
          <p className="card__info info">{pressure}</p>
        </div>

        <div className="card">
          <p className="card__name info">rain</p>
          <img src={rainCard} />
          <p className="card__info info">{rain}</p>
        </div>

        <div className="card">
          <p className="card__name info">wind</p>
          <img src={windCard} />
          <p className="card__info info">{windSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleWeather;
