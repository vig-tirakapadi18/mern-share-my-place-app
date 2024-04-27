/* eslint-disable react/prop-types */
const Card = (props) => {
    return (
        <div
            className={`card ${props.className}`}
            style={props.style}>
            {props.children}
        </div>
    );
};

export default Card;
