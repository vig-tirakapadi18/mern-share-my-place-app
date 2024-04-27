import Card from "../../shared/components/UI/Card";
import PlaceItem from "./PlaceItem";

import "./PlacesList.css";

/* eslint-disable react/prop-types */
const PlacesList = (props) => {
    if (props.places.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found. Mayne create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-list">
            {props.places.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creatorId}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};

export default PlacesList;
