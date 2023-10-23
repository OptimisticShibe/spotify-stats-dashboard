import { faFont, faQuestionCircle, faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Button, Nav, Navbar, NavDropdown, Tab, Tabs } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import ArtistSearchResult from "./ArtistSearchResult";
import FetchSpotifyData from "./FetchSpotifyData";
import InfoModal from "./InfoModal";
import TrackSearchResult from "./TrackSearchResult";
import { ReactComponent as ProtoHead } from "./assets/proto_head.svg";
import { ReactComponent as ProtoLogo } from "./assets/proto_logo.svg";

export default function Dashboard({ token }) {
  const { trackResults, artistResults, userInfo, loading, dataRender } = FetchSpotifyData({ token });

  const { handleShowModal, modalRender } = InfoModal();
  const [showName, setShowName] = useState(true);
  const [showUserImage, setShowUserImage] = useState(true);

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

  return (
    <div>
      <div>
        {loading ? (
          <div className="loading-spinner d-flex">
            <ScaleLoader color={"#fff"} loading={loading} size={150} />
          </div>
        ) : (
          <div className="primary-container">
            <Navbar variant="dark" expand="md" className="p-2 mb-2 justify-content-between nav-main">
              <Navbar.Brand className="ml-0 mx-4 d-none d-md-flex">Top 5 Spotify</Navbar.Brand>
              <Navbar.Brand className="d-md-none d-xs-flex"></Navbar.Brand>
              <div className="timeframe-button-container">{dataRender}</div>
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
                <NavDropdown title="Options & Info" id="nav-dropdown" className="d-none d-md-block">
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
            </Navbar>

            <div className={showUserImage || showName ? "user-container" : "d-none"}>
              <div className={showUserImage ? "user-image-container" : "d-none"}>
                {!userInfo.userImageUrl ? <img src={userInfo.userImageUrl} className="user-image" alt="User" /> : <ProtoLogo alt="User" />}
                {/* <img src={require("./assets/proto_head.svg")} className="user-image" alt="User" /> */}
                {/* <img src={userInfo.userImageUrl ? userInfo.userImageUrl : require("./assets/defaultUser.png")} className="user-image" alt="User" /> */}
              </div>
              <div className={showName ? "user-name-container" : "d-none"}>
                <h1>{userInfo.displayName}</h1>
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
            </div>
            {/* full display options */}
            <div className="d-none d-md-grid desktop-data-container">
              <div className="desktop-sub-data-container">
                <h4 className="text-center">Top Artists</h4>
                {artistResults.map((artist) => (
                  <ArtistSearchResult artist={artist} key={artist.uri} />
                ))}
              </div>
              <div className="desktop-sub-data-container">
                <h4 className="text-center">Top Tracks</h4>
                {trackResults.map((track) => (
                  <TrackSearchResult track={track} key={track.uri} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
