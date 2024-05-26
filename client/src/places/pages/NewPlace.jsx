import { Fragment, useContext } from "react";
import styledComponent from "styled-components";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

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
  image: {
    value: null,
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
      const formData = new FormData();
      formData.append("title", currentFormState.inputs.title.value);
      formData.append("description", currentFormState.inputs.description.value);
      formData.append("address", currentFormState.inputs.address.value);
      formData.append("creator", authCtx.userId);
      formData.append("image", currentFormState.inputs.image.value);

      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: `Bearer ${authCtx.token}`,
      });
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
        <PlaceForm onSubmit={placeDataSubmitHandler}>
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

          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="Please provide an image."
          />

          <Button
            type="submit"
            disabled={!currentFormState.isValid}>
            ADD PLACE
          </Button>
        </PlaceForm>
      )}
    </Fragment>
  );
};

export default NewPlace;

const PlaceForm = styledComponent.form`
	position: relative;
	list-style: none;
	margin: 0 auto;
	padding: 0.25rem 1rem 1rem 1rem;
	width: 90%;
	max-width: 30rem;
	box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.25);
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.85);
`;
