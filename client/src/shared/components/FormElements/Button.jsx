/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
    if (props.href) {
        return (
            <a
                className={`btn btn-${props.size || "default"} ${
                    props.inverse && "btn-inverse"
                } ${props.danger && "btn-danger"}`}
                href={props.href}>
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`btn btn-${props.size || "default"} ${
                    props.inverse && "btn-inverse"
                } ${props.danger && "btn-danger"}`}>
                {props.children}
            </Link>
        );
    }
    return (
        <button
            className={`btn btn-${props.size || "default"} ${
                props.inverse && "btn-inverse"
            } ${props.danger && "btn-danger"}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;
