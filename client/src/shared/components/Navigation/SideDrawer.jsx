/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styledComponent from "styled-components";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.showDrawer}
      duration={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit>
      <SideDrawerWrapper onClick={props.onClick}>
        {props.children}
      </SideDrawerWrapper>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;

const SideDrawerWrapper = styledComponent.aside`
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	height: 100vh;
	width: 70%;
	background: #8b322c;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
`;
