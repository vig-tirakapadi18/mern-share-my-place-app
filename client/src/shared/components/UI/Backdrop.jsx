import ReactDOM from "react-dom";
import styledComponent from "styled-components";

// import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <BackdropWrapper
      // className="backdrop"
      onClick={props.onClick}></BackdropWrapper>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;

const BackdropWrapper = styledComponent.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(0.2rem);
	z-index: 10;
`;
