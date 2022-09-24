import { Fragment } from "react";
import ReactDOM from "react-dom";
import { CgCloseR } from "react-icons/cg";
import classes from "./LargeImage.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const LargeImage = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <img src={props.img} width="100%" />
          <span className={classes.close}>
            <CgCloseR onClick={props.imgLargeClose} />
          </span>
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default LargeImage;
