import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttp } from "../../shared/hooks/http-hook";
import { Fragment, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";

const UserPlaces = () => {
    const { userId } = useParams();
    const [places, setPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttp();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/places/user/${userId}`
                );

                setPlaces(responseData.places);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const deletedPlaceHandler = (deletedPlaceId) => {
        setPlaces((prevPlaces) =>
            prevPlaces.filter((prevPlace) => prevPlace.id !== deletedPlaceId)
        );
    };

    return (
        <Fragment>
            <ErrorModal
                error={error}
                onClear={clearError}
            />
            {isLoading && <LoadingPulse />}
            {!isLoading && places && (
                <PlacesList
                    places={places}
                    onDeletePlace={deletedPlaceHandler}
                />
            )}
        </Fragment>
    );
};

export default UserPlaces;
