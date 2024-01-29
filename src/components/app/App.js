import MainPage from "../pages/MainPage";
import WeekWeather from "../weekWeather/weekWeather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Page404 from "../pages/404Page";
import SingleWeatherPage from "../pages/SingleWeatherPage";
import { useState } from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/weeklyForecast" element={<WeekWeather />} />
          <Route path="/weeklyForecast/:date" element={<SingleWeatherPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
