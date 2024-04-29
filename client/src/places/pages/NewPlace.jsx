import Input from "../../shared/components/FormElements/Input";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

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
    const [currentFormState, inputHandler] = useForm(initialFormInputs, false);

    const placeDataSubmitHandler = (event) => {
        event.preventDefault();
        console.log(currentFormState.inputs);
    };

    return (
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
    );
};

export default NewPlace;
