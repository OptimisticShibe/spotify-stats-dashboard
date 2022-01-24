import { useState } from "react";
import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function InfoModal() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const handleCloseModal = () => setShowHelpModal(false);
  const handleShowModal = () => setShowHelpModal(true);

  return {
    handleShowModal,
    modalRender: (
      <Modal show={showHelpModal} onHide={handleCloseModal} centered aria-labelledby="More-info modal">
        <ModalHeader closeButton>
          <ModalTitle>What is this?</ModalTitle>
        </ModalHeader>
        <ModalBody>Explanation of the app I Guess</ModalBody>
      </Modal>
    ),
  };
}
