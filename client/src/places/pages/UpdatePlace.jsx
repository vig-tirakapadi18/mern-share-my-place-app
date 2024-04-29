import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/components/util/validator";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import { useEffect, useState } from "react";
import Card from "../../shared/components/UI/Card";
import "./UpdatePlace.css";

const DUMMY_PLACES = [
    {
        id: "u1",
        title: "Colosseum",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/405px-Colosseo_2020.jpg",
        description:
            "The Colosseum, also known as the Flavian Amphitheater, is a large, elliptical amphitheater in Rome, Italy. It was built between 70 and 72 CE and is considered one of the most spectacular architectural monuments of the ancient world.",
        address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
        creatorId: "c1",
        location: { lat: 41.890251, long: 12.492373 },
    },
    {
        id: "u2",
        title: "Eiffel Tower",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Exposition_Universelle_de_Paris_1889_-_Universit%C3%A4ts-_und_Landesbibliothek_Darmstadt.jpg/1280px-Exposition_Universelle_de_Paris_1889_-_Universit%C3%A4ts-_und_Landesbibliothek_Darmstadt.jpg",
        description:
            "The Eiffel Tower is a 1,083 ft (330 m) tall wrought iron tower in Paris, France that was designed by Gustave Eiffel for the 1889 World's Fair. It's the tallest structure in Paris and one of the most recognizable structures in the world. The tower's silhouette has been replicated around the world.",
        address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
        creatorId: "c2",
        location: { lat: 48.8583736, long: 2.291901 },
    },
];

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { placeId } = useParams();

    const foundPlace = DUMMY_PLACES.find((place) => place.id === placeId);

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
        if (foundPlace) {
            setFormData(
                {
                    title: {
                        value: foundPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: foundPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsLoading(false);
    }, [setFormData, foundPlace]);

    const placeDataUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(currentFormState.inputs);
    };

    if (!foundPlace) {
        return (
            <div className="center message">
                <Card>
                    <h2>Could&apos;nt find a place!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        <div className="center">
            <h2>Loading...</h2>
        </div>;
    }

    return (
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
                value={currentFormState.inputs.title.value}
                isValid={currentFormState.inputs.title.isValid}
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 chars)!"
                value={currentFormState.inputs.description.value}
                isValid={currentFormState.inputs.description.isValid}
                onInput={inputHandler}
            />
            <Button
                type="submit"
                disabled={!currentFormState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
