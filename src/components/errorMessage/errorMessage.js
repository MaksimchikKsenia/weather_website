import errorGifka from "../../images/404gifka.gif";
import "./errorMessage.css"
const ErrorMessage = () => {
  return (
    <div className="container">
      <p className="blinking-text text">
        Error!Please try to upload the page and check the Internet connection!
      </p>
      <img className="gifka" src={errorGifka} />
    </div>
  );
};

export default ErrorMessage;
