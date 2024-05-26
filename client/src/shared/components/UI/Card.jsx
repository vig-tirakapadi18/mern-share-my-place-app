/* eslint-disable react/prop-types */
import styledComponent from "styled-components";

const Card = (props) => {
  return (
    <CardWrapper
      className={props.className}
      style={props.style}>
      {props.children}
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styledComponent.div`
	margin: 0;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 6px;
	padding: 1rem;
	overflow: hidden;
  color: white;
	background: rgba(0, 0, 0, 0.85);
`;
