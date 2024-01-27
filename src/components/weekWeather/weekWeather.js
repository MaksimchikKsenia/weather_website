import "./weekWeather.css";
import { useState, useEffect } from "react";
import location_icon from "../../images/location_icon.png";
import WeekCards from "../weekCards/weekCards";
import OneDayCard from "../oneDayCard/oneDayCard";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/skeleton";

const WeekWeather = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isTomorrow, setIsTomorrow] = useState("");

  const inputChange = (e) => {
    if(e.target.value !==''){
        setSearchValue(e.target.value);
        localStorage.setItem("city", e.target.value.trimLeft());
    }else{
      alert('вы не ввели город!')
      return;
    }
    
    console.log(e.target.value);
  };

  // useEffect(() => {
  //   //server request
  // }, [searchValue]);

  const showWeather = (flag) => {
    return flag ? <OneDayCard /> : flag !== "" ? <WeekCards /> : <Skeleton />;
  };

  return (
    <div className="week__info">
      <div className="container">
        <div className="week__info-links">
          <Link className="week__info-link" to="/">
            На главную
          </Link>
          <a className="week__info-link" href="">
            О компании
          </a>
        </div>
        <div className="week__info-search">
          <div className="week__info-location">
            <img src={location_icon} alt="location" className="location_icon" />
            <p className="week__info-city">
              {searchValue ? searchValue : "City"}
            </p>
          </div>
          <div className="input__search-block">
            <input
              className="search_input"
              name="search_input"
              placeholder="Enter the city"
              onBlur={inputChange}
            ></input>
            <button className="search_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text week__info-title">
          Choose the weather forecast for ...
        </p>
        <div className="week__btn-panel">
          <button className="week__btn" onClick={() => setIsTomorrow(true)}>
            Tomorrow
          </button>
          <button className="week__btn" onClick={() => setIsTomorrow(false)}>
            5 days
          </button>
        </div>
        {showWeather(isTomorrow)}
      </div>
    </div>
  );
};

export default WeekWeather;
