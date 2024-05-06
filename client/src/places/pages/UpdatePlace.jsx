import { useNavigate, useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import { Fragment, useContext, useEffect, useState } from "react";
import Card from "../../shared/components/UI/Card";
import "./UpdatePlace.css";
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
            <div className="center message">
                <Card>
                    <h2>Could&apos;nt find a place!</h2>
                </Card>
            </div>
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
                <form
                    className="place-form"
                    onSubmit={placeDataUpdateSubmitHandler}>
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
                </form>
            )}
        </Fragment>
    );
};

export default UpdatePlace;
