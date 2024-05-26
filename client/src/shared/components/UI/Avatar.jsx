/* eslint-disable react/prop-types */
import styledComponent from "styled-components";

const Avatar = (props) => {
  return (
    <AvatarWrapper
      className={props.className}
      style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </AvatarWrapper>
  );
};

export default Avatar;

const AvatarWrapper = styledComponent.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
    display: block;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
	}
`;
