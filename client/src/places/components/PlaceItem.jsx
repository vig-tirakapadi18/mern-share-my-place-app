/* eslint-disable react/prop-types */
import { Fragment, useContext, useState } from "react";
import styledComponent from "styled-components";

import Button from "../../shared/components/FormElements/Button";
import "./PlaceItem.css";
import Modal from "../../shared/components/UI/Modal";
import Map from "../../shared/components/UI/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingPulse from "../../shared/components/UI/LoadingPulse";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const authCtx = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const toggleModalHandler = () => setShowMap((prevState) => !prevState);

  const toggleConfirmModalHandler = () =>
    setShowConfirmModal((prevState) => !prevState);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal((prevState) => !prevState);

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${authCtx.token}`,
        }
      );

      props.onDelete(props.id);
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
      <Modal
        showModal={showMap}
        onCancel={toggleModalHandler}
        header={props.address}
        contentClass="place-item-modal-content"
        footerClass="place-item-modal-actions"
        footer={<Button onClick={toggleModalHandler}>CLOSE</Button>}>
        <MapContainer>
          <Map
            center={props.coordinates}
            zoom={16}
          />
          {/* <h1>This isLoading &&  MAP!</h1> */}
        </MapContainer>
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
          Are you sure you want to delete this place? Please note that it
          can&apos;t be undone later.
        </p>
      </Modal>

      {isLoading && <LoadingPulse />}
      {!isLoading && (
        <PlaceListItem>
          <PlaceListItemImage>
            <img
              src={props.image}
              alt={props.title}
            />
          </PlaceListItemImage>

          <PlaceListItemInfo>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </PlaceListItemInfo>

          <PlaceListItemActions>
            <Button
              inverse
              onClick={toggleModalHandler}>
              VIEW ON MAP
            </Button>
            {authCtx.userId === props.creatorId && (
              <Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button
                  danger
                  onClick={toggleConfirmModalHandler}>
                  DELETE
                </Button>
              </Fragment>
            )}
          </PlaceListItemActions>
        </PlaceListItem>
      )}
    </Fragment>
  );
};

export default PlaceItem;

const PlaceListItem = styledComponent.li`
	margin: 1rem 0;
`;

// const PlaceListItemContent = styledComponent.div`
// 	padding: 0;
// 	border-radius: 10px;
// 	box-shadow: 0 20px 30px 10px rgba(0, 0, 0, 0.25);
// `;

const PlaceListItemInfo = styledComponent.div`
padding: 1rem;
text-align: center;

h2, h3, p {
	margin: 0 0 0.5rem 0;
}
`;

const PlaceListItemImage = styledComponent.div`
	width: 100%;
	height: 12.5rem;
	margin-right: 1.5rem;

	img {
		width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
	}

	@media (min-width: 768px) {
    height: 20rem;
	}
`;

const PlaceListItemActions = styledComponent.div`
	padding: 1rem 1rem 0 1rem;
	text-align: center;
	border-top: 1px solid #ccc;

	button, a {
		margin: 0.5rem;
	}
`;

const MapContainer = styledComponent.div`
	height: 15rem;
  width: 100%;
`;
