import { Link } from "react-router-dom";
import "./appHeader.css";

const AppHeader = () => {
  return (
    <div className="container">
      <div className="links__flex">
        <Link className="link" to="/weeklyForecast">
          Weather for the week
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
