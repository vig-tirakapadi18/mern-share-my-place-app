/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";

import "./Input.css";
import { validate } from "../util/validator";

const initialInputState = { value: "", isValid: false, isTouched: false };

const inputReducer = (state, action) => {
    if (action.type === "CHANGE") {
        return {
            ...state,
            value: action.value,
            isValid: validate(action.value, action.validators),
        };
    }

    if (action.type === "TOUCH") {
        return {
            ...state,
            isTouched: true,
        };
    }

    return state;
};

const Input = (props) => {
    const [currentInputState, dispatchAction] = useReducer(
        inputReducer,
        initialInputState
    );

    const { id, onInput } = props;
    const { value, isValid } = currentInputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, onInput, value, isValid]);

    const inputChangeHandler = (event) => {
        dispatchAction({
            type: "CHANGE",
            value: event.target.value,
            validators: props.validators,
        });
    };

    const inputTouchHandler = () => {
        dispatchAction({ type: "TOUCH" });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={currentInputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={inputChangeHandler}
                onBlur={inputTouchHandler}
                value={currentInputState.value}
            />
        );

    return (
        <div
            className={`form-control ${
                !currentInputState.isValid &&
                currentInputState.isTouched &&
                "form-control-invalid"
            }`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}

            {!currentInputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
