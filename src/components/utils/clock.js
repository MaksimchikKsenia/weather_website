import React, { useState, useEffect } from "react";

function Clock() {
  const [currentTime, setCurrentTime] = useState(getFormattedTime);

  function getFormattedTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000); // Обновлять каждую минуту

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
  return <span className="text">{currentTime}</span>;
}

export default Clock;
