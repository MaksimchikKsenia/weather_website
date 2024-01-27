import error from "../../images/error.webp";
const ErrorMessage = () => {
  return (
    <img
      style={{
        display: "block",
        width: "750px",
        height: "550px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={error}
    /> // обращение к статичному файлу
  );
};

export default ErrorMessage;
