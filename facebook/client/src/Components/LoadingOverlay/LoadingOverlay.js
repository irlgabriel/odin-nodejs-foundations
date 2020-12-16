import { AbsoluteContainer } from "./LoadingOverlay.components";
import { Spinner } from "reactstrap";

const LoadingOverlay = () => {
  return (
    <AbsoluteContainer>
      <Spinner size={128} style={{ zIndex: "5" }} color="royalblue" />
    </AbsoluteContainer>
  );
};

export default LoadingOverlay;
