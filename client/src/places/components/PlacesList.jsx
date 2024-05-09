import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI/Card";
import PlaceItem from "./PlaceItem";

import "./PlacesList.css";

/* eslint-disable react/prop-types */
const PlacesList = (props) => {
    if (props.places.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul>
            {props.places.map((place) => (
                <div
                    key={place.id}
                    className="place-list">
                    <PlaceItem
                        id={place.id}
                        image={place.image}
                        title={place.title}
                        description={place.description}
                        address={place.address}
                        creatorId={place.creator}
                        coordinates={place.location}
                        onDelete={props.onDeletePlace}
                    />
                </div>
            ))}
        </ul>
    );
};

export default PlacesList;
