import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styledComponent from "styled-components";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UI/Card";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = () => {
  const [places, setPlaces] = useState();
  const { placeId } = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const initialUpdateFormState = {
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  };

  const [currentFormState, inputHandler, setFormData] = useForm(
    initialUpdateFormState,
    false
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );

        setPlaces(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, [sendRequest, placeId, setFormData]);

  const placeDataUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: currentFormState.inputs.title.value,
          description: currentFormState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      navigate(`/${authCtx.userId}/places`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <LoadingPulse />;

  if (!places && !error) {
    return (
      <Message className="center">
        <Card>
          <h2>Could&apos;nt find a place!</h2>
        </Card>
      </Message>
    );
  }

  return (
    <Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      {isLoading && <LoadingPulse />}
      {!isLoading && places && (
        <PlaceForm onSubmit={placeDataUpdateSubmitHandler}>
          <Input
            id="title"
            type="text"
            element="input"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            value={places.title}
            isValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 chars)!"
            value={places.description}
            isValid={true}
            onInput={inputHandler}
          />
          <Button
            type="submit"
            disabled={!currentFormState.isValid}>
            UPDATE PLACE
          </Button>
        </PlaceForm>
      )}
    </Fragment>
  );
};

export default UpdatePlace;

const Message = styledComponent.div`
	background-color: rgba(0, 0, 0, 0.85);
	max-width: 30rem;
	margin: 1rem auto;
	color: red;
	padding: 1rem;
	border-radius: 6px;
	box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.35);
`;

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
