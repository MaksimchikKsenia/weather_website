import "./infoForDay.css";
import { useEffect, useState } from "react";
import min_temp from "../../images/min_temp.png";
import max_temp from "../../images/max_temp.png";
import cloud from "../../images/cloud.png";
import pressureCard from "../../images/pressure.png";
import useWeatherService from "../services/weatherService";
import setContent from "../utils/setContent";
import sunriseCard from "../../images/sunrise.png";
import sunsetCard from "../../images/sunset.png";

const InfoForDay = () => {
  const [dayInfo, setDayInfo] = useState(null);
  const { getTodayWeather, clearError, process, setProcess } =
    useWeatherService();

  useEffect(() => {
    updateDayInfo();
  }, []);

  const updateDayInfo = () => {
    clearError();
    getTodayWeather(
      localStorage.getItem("city") ? localStorage.getItem("city") : "Гродно"
    )
      .then(onInfoLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onInfoLoaded = (info) => {
    setDayInfo(info);
  };

  return (
    <div className="container "> {setContent(process, View, dayInfo)}</div>
  );
};

const View = ({ data }) => {
  const { temp_max, temp_min, pressure, clouds, sunrise, sunset } = data;

  return (
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
        <p className="card__name info">max temp</p>
        <img src={max_temp} />
        <p className="card__info info">{temp_max} °С</p>
      </div>

      <div className="card">
        <p className="card__name info">min temp</p>
        <img src={min_temp} />
        <p className="card__info info">{temp_min} °C</p>
      </div>
    </div>
    // <div className="weather__sun">
    //   <div className="weather__sunrise">
    //     <p className="text weather__card-time">SUNRISE</p>
    //     <img src={sunriseCard} className="weather__hours-img-l" />
    //     <p className="text weather__card-temp"> at {sunrise}</p>
    //   </div>
    //   <div className="weather__sunset">
    //     <p className="text weather__card-time">SUNSET</p>
    //     <img src={sunsetCard} className="weather__hours-img-l" />
    //     <p className="text weather__card-temp"> at 18:00</p>
    //   </div>
    // </div>
  );
};

export default InfoForDay;
