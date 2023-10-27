import { faFont, faQuestionCircle, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useRef, useState } from "react";
import { Button, Nav, Navbar, NavDropdown, Tab, Tabs, Image, Toast, ToastContainer, Alert } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import ArtistSearchResult from "./ArtistSearchResult";
import FetchSpotifyData from "./FetchSpotifyData";
import InfoModal from "./InfoModal";
import DemoModal from "./DemoModal";
import TrackSearchResult from "./TrackSearchResult";
import { ReactComponent as ProtoHead } from "./assets/proto_head.svg";
import { ReactComponent as ProtoLogo } from "./assets/proto_logo.svg";
import html2canvas from "html2canvas";
import protoLogo from "./assets/proto_logo.svg";
import cameraIcon from "./assets/camera.png";

export default function Dashboard({ token }) {
  const [demoMode, setDemoMode] = useState(false);
  const { trackResults, artistResults, userInfo, loading, dataRender } = FetchSpotifyData({ token, setDemoMode });

  const { handleShowModal, modalRender } = InfoModal();
  const { handleShowDemoModal, demoModalRender } = DemoModal();
  const [showName, setShowName] = useState(true);
  const [showUserImage, setShowUserImage] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  const onNameClick = () => {
    setShowName(!showName);
  };
  const onUserImageClick = () => {
    setShowUserImage(!showUserImage);
  };
  const screenshotRef = useRef();

  const toastSuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const captureScreenshot = async () => {
    const canvasPromise = html2canvas(screenshotRef.current, {
      useCORS: true,
    });
    canvasPromise.then(async (canvas) => {
      try {
        const imgURL = canvas.toDataURL("screenshot/png");
        const data = await fetch(imgURL);
        const blob = await data.blob();
        await navigator.clipboard.write([
          // eslint-disable-next-line no-undef
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        toastSuccess();
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <div className="app-container">
      {loading ? (
        <div className="loading-spinner d-flex">
          <ScaleLoader color={"#fff"} loading={loading} size={150} />
        </div>
      ) : (
        <div className="primary-container">
          {/* Mobile Screenshot Button */}
          <Button size="md" variant="outline-light d-xs-flex d-md-none" onClick={() => captureScreenshot()} className="capture-button-mobile">
            <Image alt="camera icon" src={cameraIcon} height="auto" width="30" className="camera-icon me-2" />
            <span className="d-none d-sm-block">Capture Screenshot</span>
          </Button>
          <Navbar variant="dark" expand="md" className="p-2 mb-2 nav-main">
            <Navbar.Brand className="ms-4 me-auto d-none d-md-flex">
              <div>
                <ProtoLogo alt="User" width="65" height="auto" className="me-2" />
              </div>
              Top 5 Spotify
            </Navbar.Brand>
            <Navbar.Brand className="ms-4 d-md-none d-flex align-items-center">
              <div>
                <ProtoLogo alt="User" width="65" height="auto" className="me-3" />
              </div>
              <span>Top 5 Spotify</span>
            </Navbar.Brand>
            <Navbar.Brand className="d-md-none d-xs-flex"></Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1 d-md-none d-xs-inline responsive-navbar-button" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <div className="d-md-none d-xs-block">
                <Nav.Link onClick={onNameClick}>
                  <FontAwesomeIcon icon={faFont} style={{ margin: "0px 1px" }}></FontAwesomeIcon>&nbsp;Toggle Name
                </Nav.Link>
                <Nav.Link onClick={onUserImageClick}>
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>&nbsp;Toggle User Image
                </Nav.Link>
                <div className="mobile-menu-horizontal-line" />
                <Nav.Link href="https://github.com/OptimisticShibe/spotify-stats-dashboard" target="_blank">
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>&nbsp;Github Repository
                </Nav.Link>
                <Nav.Link onClick={handleShowModal}>
                  <FontAwesomeIcon icon={faQuestionCircle} inverse />
                  &nbsp;About This App
                </Nav.Link>
                <div className="mobile-menu-horizontal-line" />
                <Nav.Link onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>&nbsp;Logout
                </Nav.Link>
              </div>
              <NavDropdown autoClose="outside" title="Options & Info" id="nav-dropdown" className="d-none d-md-block">
                <NavDropdown.Item onClick={onNameClick}>
                  <FontAwesomeIcon icon={faFont} style={{ margin: "0px 1px" }}></FontAwesomeIcon>&nbsp;Toggle Name
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onUserImageClick}>
                  <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>&nbsp;Toggle User Image
                </NavDropdown.Item>
                <NavDropdown.Divider className="d-md-none d-xs-blck" />
                <NavDropdown.Item onClick={logout} className="d-md-none d-xs-block">
                  <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>&nbsp;Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://github.com/OptimisticShibe/spotify-stats-dashboard" target="_blank">
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>&nbsp;Github Repository
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowModal}>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  &nbsp;About This App
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-light" onClick={logout} className="me-4 d-none d-md-block">
                Logout
              </Button>
            </Navbar.Collapse>
            {modalRender}
            {demoModalRender}
          </Navbar>
          {/* Demo Mode Banner */}
          {demoMode && (
            <Alert variant="secondary" className="alert">
              <strong>ATTENTION:</strong> This app is in demo mode, and is displaying placeholder data.
              <Alert.Link onClick={handleShowDemoModal} href="#">
                {" "}
                Click here for more info.
              </Alert.Link>
            </Alert>
          )}
          <div className={demoMode ? "content-display-container-alert" : "content-display-container"} id="pin" ref={screenshotRef}>
            <ToastContainer bg="success" className="p-3 mt-5" position="top-end">
              <Toast show={showToast} bg="success">
                <Toast.Body className="text-white">
                  <strong>Copied to clipboard!</strong>
                </Toast.Body>
              </Toast>
            </ToastContainer>
            <div className="spotifyDataContainer">
              <div className="desktopArtistContainer d-none d-md-flex">
                <h4 className="text-center">Top Artists</h4>
                {artistResults.map((artist) => (
                  <ArtistSearchResult artist={artist} key={artist.uri} />
                ))}
              </div>
              <div className="centerContainer">
                <div className="userContainer">
                  <div className={showUserImage ? "user-image-container" : "d-none"}>
                    {userInfo.userImageUrl ? <img src={userInfo.userImageUrl} className="user-image" alt="User" /> : <ProtoLogo alt="User" />}
                  </div>
                  <div className={showName ? "user-name-container" : "d-none"}>
                    <h1>{userInfo.displayName ? userInfo.displayName : "Demo User"}</h1>
                  </div>
                </div>
                <div className="timeframe-button-container pb-2 d-none d-md-flex">
                  <h4>Range</h4>
                  {dataRender}
                </div>
                <div className="screenshotButtonContainer" data-html2canvas-ignore="true">
                  <Button size="lg" variant="outline-light d-md-flex d-none" onClick={() => captureScreenshot()} className="capture-button">
                    <Image alt="camera icon" src={cameraIcon} height="auto" width="30" className="camera-icon me-2" />
                    Capture Screenshot
                  </Button>
                </div>
              </div>
              <div className="desktopTrackContainer d-none d-md-flex">
                <h4 className="text-center">Top Tracks</h4>
                {trackResults.map((track) => (
                  <TrackSearchResult track={track} key={track.uri} />
                ))}
              </div>
            </div>
            {/* mobile display */}
            <div className="d-md-none d-xs-flex">
              <Tabs transition={false} id="mobile-tab-display">
                <Tab eventKey="tracks" title="Top Tracks">
                  {trackResults.map((track) => (
                    <TrackSearchResult track={track} key={track.uri} />
                  ))}
                </Tab>
                <Tab eventKey="artists" title="Top Artists" className="justify-content-center">
                  {artistResults.map((artist) => (
                    <ArtistSearchResult artist={artist} key={artist.uri} />
                  ))}
                </Tab>
              </Tabs>
              <div className="timeframe-button-container pb-2">
                <h4>Range</h4>
                {dataRender}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
