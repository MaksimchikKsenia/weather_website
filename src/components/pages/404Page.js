import errorGifka from "../../images/404gifka.gif";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="container">
      <div className="links__flex">
        <Link className="link" to="/">
          На главную
        </Link>
      </div>
      <img src={errorGifka} className="gifka" />
      <p className="text text404">
        Введен неверный адрес страницы! Вернитесь на главную и попробуйте снова!
      </p>
    </div>
  );
};

export default Page404;
