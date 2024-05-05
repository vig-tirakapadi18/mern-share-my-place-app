import { Fragment, useContext, useState } from "react";
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
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import ErrorModal from "../../shared/components/UI/ErrorModal";

const initialAuthFormState = {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
};

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [currentFormState, inputHandler, setFormData] = useForm(
        initialAuthFormState,
        false
    );

    const authCtx = useContext(AuthContext);

    const authFormSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (isLoginMode) {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: currentFormState.inputs.email.value,
                            password: currentFormState.inputs.password.value,
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                const responseData = await response.json();
                console.log(responseData);
                setIsLoading(false);
                authCtx.login();
            } catch (error) {
                setError(
                    error.message ||
                        "Something went wrong, please try again later!"
                );
                setIsLoading(false);
            }
        } else {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/sign-up",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: currentFormState.inputs.name.value,
                            email: currentFormState.inputs.email.value,
                            password: currentFormState.inputs.password.value,
                            image: "",
                            places: [],
                        }),
                    }
                );

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                console.log(responseData);
                setIsLoading(false);
                authCtx.login();
            } catch (error) {
                setError(
                    error.message ||
                        "Something went wrong, please try again later!"
                );
                setIsLoading(false);
            }
        }
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

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Fragment>
            {isLoading && <LoadingPulse />}
            {!isLoading && (
                <Fragment>
                    <ErrorModal
                        error={error}
                        onClear={errorHandler}
                    />
                    <Card className="auth">
                        <Fragment>
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
                        </Fragment>
                    </Card>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Auth;
