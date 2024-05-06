import Input from "../../shared/components/FormElements/Input";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { Fragment, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import { useNavigate } from "react-router-dom";

const initialFormInputs = {
    title: {
        value: "",
        isValid: false,
    },
    description: {
        value: "",
        isValid: false,
    },
    address: {
        value: "",
        isValid: false,
    },
};

const NewPlace = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentFormState, inputHandler] = useForm(initialFormInputs, false);
    const { isLoading, error, sendRequest, clearError } = useHttp();

    const placeDataSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await sendRequest(
                "http://localhost:5000/api/places",
                "POST",
                JSON.stringify({
                    title: currentFormState.inputs.title.value,
                    description: currentFormState.inputs.description.value,
                    address: currentFormState.inputs.address.value,
                    creator: authCtx.userId,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />
            {isLoading && <LoadingPulse />}
            {!isLoading && (
                <form
                    className="place-form"
                    onSubmit={placeDataSubmitHandler}>
                    <Input
                        id="title"
                        type="text"
                        label="Title"
                        element="input"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title!"
                        onInput={inputHandler}
                    />
                    <Input
                        id="description"
                        label="Description"
                        element="textarea"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description (min. 5 chars)!"
                        onInput={inputHandler}
                    />
                    <Input
                        id="address"
                        label="Address"
                        element="input"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid Address!"
                        onInput={inputHandler}
                    />

                    <Button
                        type="submit"
                        disabled={!currentFormState.isValid}>
                        ADD PLACE
                    </Button>
                </form>
            )}
        </Fragment>
    );
};

export default NewPlace;
