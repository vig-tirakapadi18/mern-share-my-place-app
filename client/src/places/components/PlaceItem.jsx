/* eslint-disable react/prop-types */
import { Fragment, useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal";
import Map from "../../shared/components/UI/Map";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const authCtx = useContext(AuthContext);

    const toggleModalHandler = () => setShowMap((prevState) => !prevState);

    const toggleConfirmModalHandler = () =>
        setShowConfirmModal((prevState) => !prevState);

    const confirmDeleteHandler = () => {
        setShowConfirmModal((prevState) => !prevState);
        console.log("OKAY WAIT DELETING...");
    };

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
                    {/* <h1>This is MAP!</h1> */}
                </div>
            </Modal>

            <Modal
                showModal={showConfirmModal}
                onCancel={toggleConfirmModalHandler}
                header="Are you sure?"
                footerClass="place-item-modal-actions"
                footer={
                    <Fragment>
                        <Button
                            inverse
                            onClick={toggleConfirmModalHandler}>
                            CANCEL
                        </Button>
                        <Button
                            danger
                            onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </Fragment>
                }>
                <p>
                    Are you sure you want to delete this place? Please note that
                    it can&apos;t be undone later.
                </p>
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
                    {authCtx.isLoggedIn && (
                        <Fragment>
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                            <Button
                                danger
                                onClick={toggleConfirmModalHandler}>
                                DELETE
                            </Button>
                        </Fragment>
                    )}
                </div>
            </li>
        </Fragment>
    );
};

export default PlaceItem;
