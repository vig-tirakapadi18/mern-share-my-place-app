import { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UI/Card";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import { useForm } from "../../shared/hooks/form-hook";

import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const initialAuthFormState = {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
};

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [currentFormState, inputHandler, setFormData] = useForm(
        initialAuthFormState,
        false
    );

    const authCtx = useContext(AuthContext);

    const authFormSubmitHandler = (event) => {
        event.preventDefault();
        console.log(currentFormState.inputs);
        authCtx.login();
    };

    const switchAuthModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                { ...currentFormState.inputs, name: undefined },
                currentFormState.inputs.email.isValid &&
                    currentFormState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...currentFormState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevState) => !prevState);
    };

    return (
        <Card className="auth">
            <h2 className="auth-header">Sign In</h2>
            <hr />
            <form onSubmit={authFormSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        id="name"
                        element="input"
                        label="Your Name"
                        type="text"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name!"
                        onInput={inputHandler}
                    />
                )}
                <Input
                    id="email"
                    element="input"
                    label="Email"
                    type="email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email!"
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    element="input"
                    label="Password"
                    type="password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid password (min. 8 chars)!"
                    onInput={inputHandler}
                />
                <Button
                    type="submit"
                    disabled={!currentFormState.isValid}>
                    {isLoginMode ? "LOGIN" : "SIGN UP"}
                </Button>
            </form>
            <Button
                inverse
                onClick={switchAuthModeHandler}>
                SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
            </Button>
        </Card>
    );
};

export default Auth;
