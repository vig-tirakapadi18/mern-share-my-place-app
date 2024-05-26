import { Fragment, useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UI/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import styledComponent from "styled-components";

import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { useHttp } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const initialAuthFormState = {
  email: { value: "", isValid: false },
  password: { value: "", isValid: false },
};

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [currentFormState, inputHandler, setFormData] = useForm(
    initialAuthFormState,
    false
  );

  const authCtx = useContext(AuthContext);

  const authFormSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: currentFormState.inputs.email.value,
            password: currentFormState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authCtx.login(responseData.userId, responseData.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("name", currentFormState.inputs.name.value);
        formData.append("email", currentFormState.inputs.email.value);
        formData.append("password", currentFormState.inputs.password.value);
        formData.append("image", currentFormState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/sign-up",
          "POST",
          formData
        );
        authCtx.login(responseData.userId, responseData.token);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const switchAuthModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...currentFormState.inputs,
          name: undefined,
          image: undefined,
        },
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <Fragment>
      {isLoading && <LoadingPulse />}
      {!isLoading && (
        <Fragment>
          <ErrorModal
            error={error}
            onClear={clearError}
          />
          <Card className="auth">
            <Fragment>
              <AuthHeader className="auth-header">Sign In</AuthHeader>
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
                {!isLoginMode && (
                  <ImageUpload
                    id="image"
                    center
                    onInput={inputHandler}
                    errorText="Please provide an image."
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

const AuthHeader = styledComponent.h2`
	color: white;
  text-align: center;
`;
