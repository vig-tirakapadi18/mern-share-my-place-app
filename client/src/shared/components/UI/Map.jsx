/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import styledComponent from "styled-components";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return (
    <MapWrapper
      ref={mapRef}
      className={props.className}
      style={props.style}>
      Map
    </MapWrapper>
  );
};

export default Map;

const MapWrapper = styledComponent.div`
	width: 100%;
	height: 100%;
`;
