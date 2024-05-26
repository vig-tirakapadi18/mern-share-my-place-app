import styledComponent from "styled-components";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UI/Card";
import PlaceItem from "./PlaceItem";

/* eslint-disable react/prop-types */
const PlacesList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className="center">
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
        <PlaceList
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
        </PlaceList>
      ))}
    </ul>
  );
};

export default PlacesList;

const PlaceList = styledComponent.div`
    list-style: none;
    margin: 1rem auto;
    padding: 1rem;
    width: 90%;
    max-width: 40rem;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 10px;
    color: white;
    box-shadow: 0 20px 30px 5px rgba(0, 0, 0, 0.5);
`;
