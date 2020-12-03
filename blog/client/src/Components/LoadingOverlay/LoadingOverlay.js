import { Spinner } from "reactstrap";
import { Overlay } from "./LoadingOverlay.components";

const LoadingOverlay = () => {
  return (
    <Overlay>
      <Spinner color='primary'/>
    </Overlay>
  )
}

export default LoadingOverlay;