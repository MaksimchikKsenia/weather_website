import "./mainInfo.css";
import { useState, useEffect } from "react";
import clouds from "../../images/clouds.png";
import celsium from "../../images/celsium.png";
import { Link } from "react-router-dom";
import useWeatherService from "../services/weatherService";
import setContent from "../utils/setContent";
import Clock from "../utils/clock";

const MainInfo = () => {
  const [info, setInfo] = useState(null);

  const { getTodayWeather, clearError, process, setProcess } =
    useWeatherService();

  useEffect(() => {
    updateInfo();
  }, []);

  const updateInfo = () => {
    clearError();
    getTodayWeather(
      localStorage.getItem("city") ? localStorage.getItem("city") : "Гродно"
    )
      .then(onInfoLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onInfoLoaded = (info) => {
    setInfo(info);
  };
  return <div className="container"> {setContent(process, View, info)}</div>;
};

const View = ({ data }) => {
  const { date, iconID, temp, humidity, windSpeed, rain } = data;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayOfWeek = `${weekDays[date.getDay()]}`;

  const year = `${date.getFullYear()}`.slice(2);
  const fullDate = `${date.getDate()}th ${
    monthNames[date.getMonth()]
  }  ‘${year}`;

  return (
    <div className="info__block-flex">
      <div className="info__block-left">
        <img
          className="info_icon"
          src={`https://openweathermap.org/img/wn/${iconID}.png`}
          alt="clouds"
        />
        <div className="info__block-degrees">
          <p className="degrees text">{temp}&deg;</p>
          
        </div>
        <p className="info__block-date text">{fullDate}</p>
        <p className="info__block-day text">
          {dayOfWeek} | {<Clock />}
        </p>
        <p className="info__block-moreInfo text">
          {windSpeed} | hum {humidity} | {rain}
        </p>
      </div>
      <div className="info__block-right">
        <p className="text city__info">
          Weather today in{" "}
          {localStorage.getItem("city")
            ? localStorage.getItem("city")
            : "Гродно"}
        </p>
      </div>
    </div>
  );
};

export default MainInfo;
