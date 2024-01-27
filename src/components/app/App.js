import MainPage from '../pages/MainPage';
import WeekWeather from "../weekWeather/weekWeather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from 'react';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/weeklyForecast"
            element={<WeekWeather/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
