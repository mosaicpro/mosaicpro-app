import React from "react";
import { Modal } from "react-bootstrap";
import { isMobile } from "react-device-detect";

function CustomModal({ title, children, ...props }) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          className={"fw-bold avalon " + isMobile ? "h5" : "h1"}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default CustomModal;
