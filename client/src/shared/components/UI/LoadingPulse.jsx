import loadingPulse from "../../../assets/pulse.svg";
import "./LoadingPulse.css";

const LoadingPulse = () => {
    return (
        <div className="loader">
            <img
                src={loadingPulse}
                alt="loading..."
            />
        </div>
    );
};

export default LoadingPulse;
