import { useState } from "react";
import { Modal, ModalBody, ModalTitle } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export default function InfoModal() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const handleCloseModal = () => setShowHelpModal(false);
  const handleShowModal = () => setShowHelpModal(true);

  const modalBody = `
  Top 5 Spotify is a ReactJS app which uses the Spotify API to gather and display users' top 5 Artists and Tracks over a period of time

  Tracks and Artists will fetch a user's top tracks and artists within 1 of 3 possible timeframes allowed by the API: **4 weeks, 6 months,** and **All Time.**

  ---

  ##### Troubleshooting
  For most problems, simply **clicking the logout button** and logging back in with Spotify will fix your issues.

  ---

  ##### Credits
  This app was made by **Rafiq Ramadan**. The code is [available on Github.](https://github.com/OptimisticShibe/spotify-stats-dashboard)
  `;

  return {
    handleShowModal,
    modalRender: (
      <Modal show={showHelpModal} onHide={handleCloseModal} size="lg" centered aria-labelledby="More-info modal">
        <ModalHeader closeButton>
          <ModalTitle className="text-center">About Top 5 Spotify</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <ReactMarkdown children={modalBody} />
        </ModalBody>
      </Modal>
    ),
  };
}
