import { useState } from "react";
import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function DemoModal() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const handleCloseModal = () => setShowHelpModal(false);
  const handleShowDemoModal = () => setShowHelpModal(true);

  const modalBody = `
  ##### What is Demo Mode?
  Instead of fetching your personal Spotify data, this app is displaying stored mock data.

  ##### Why a Demo Mode?
  Spotify limits its API access for personal apps, blocking endpoints to anyone not manually added to a developer's test list. Demo mode is a way to showcase the app's functionality, despite this.

  Details can be found in Spotify's [Quota Modes](https://developer.spotify.com/documentation/web-api/concepts/quota-modes) documentation.

  ##### Will this app get a quota extension from Spotify?
  Unlikely, as Spotify only offers this to apps with wide-audience use.
  `;

  return {
    handleShowDemoModal,
    demoModalRender: (
      <Modal show={showHelpModal} onHide={handleCloseModal} size="lg" centered aria-labelledby="More-info modal">
        <ModalHeader closeButton>
          <ModalTitle className="text-center">About Demo Mode</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <ReactMarkdown children={modalBody} />
        </ModalBody>
      </Modal>
    ),
  };
}
