/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal";
import Map from "../../shared/components/UI/Map";

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);

    const toggleModalHandler = () => setShowMap((prevState) => !prevState);

    return (
        <Fragment>
            <Modal
                showModal={showMap}
                onCancel={toggleModalHandler}
                header={props.address}
                contentClass="place-item-modal-content"
                footerClass="place-item-modal-actions"
                footer={<Button onClick={toggleModalHandler}>CLOSE</Button>}>
                <div className="map-container">
                    <Map
                        center={props.coordinates}
                        zoom={16}
                    />
                </div>
            </Modal>

            <li className="place-item">
                <div className="place-item-image">
                    <img
                        src={props.image}
                        alt={props.title}
                    />
                </div>

                <div className="place-item-info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>

                <div className="place-item-actions">
                    <Button
                        inverse
                        onClick={toggleModalHandler}>
                        VIEW ON MAP
                    </Button>
                    <Button to={`/places/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </li>
        </Fragment>
    );
};

export default PlaceItem;
