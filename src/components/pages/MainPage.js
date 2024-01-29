import MainInfo from "../MainInfo/mainInfo";
import InfoForDay from "../infoForDay/infoForDay";
import AppHeader from "../appHeader/appHeader";
import SingleWeatherPage from "../singleWeather/singleWeather";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const MainPage = () => {
  return (
    <>
      <AppHeader />
      <MainInfo />
      <InfoForDay />
    </>
  );
};

export default MainPage;
