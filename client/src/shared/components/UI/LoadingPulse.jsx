import styledComponent from "styled-components";

import loadingPulse from "../../../assets/pulse.svg";

const LoadingPulse = () => {
  return (
    <LoaderWrapper>
      <img
        src={loadingPulse}
        alt="loading..."
      />
    </LoaderWrapper>
  );
};

export default LoadingPulse;

const LoaderWrapper = styledComponent.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;
