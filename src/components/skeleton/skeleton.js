import "./skeleton.css";
import gifka from "../../images/cat_gifka.gif";

const Skeleton = () => {
  return (
    <div className="container">
      <img className="gifka" src={gifka} alt="" />
    </div>
  );
};

export default Skeleton;
