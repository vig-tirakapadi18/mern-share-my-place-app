/* eslint-disable react/prop-types */
import styledComponent from "styled-components";

const MainHeader = (props) => {
  return <MainHeaderWrapper>{props.children}</MainHeaderWrapper>;
};

export default MainHeader;

const MainHeaderWrapper = styledComponent.header`
	width: 100%;
	height: 4rem;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	background: #8b322c;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
	padding: 0 1rem;
	z-index: 5;

	@media (min-width: 768px) {
		justify-content: space-between;
	}
`;
