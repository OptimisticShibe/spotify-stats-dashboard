import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Container, Dropdown, Nav, Navbar, NavDropdown, Tab, Tabs } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import ArtistSearchResult from "./ArtistSearchResult";
import FetchSpotifyData from "./FetchSpotifyData";
import InfoModal from "./InfoModal";
import TrackSearchResult from "./TrackSearchResult";

export default function Dashboard({ token }) {
  const { trackResults, artistResults, userInfo, loading, dataRender } = FetchSpotifyData({ token });

  const { handleShowModal, modalRender } = InfoModal();
  const [showName, setShowName] = useState(true);

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  const onNameClick = () => {
    setShowName(!showName);
    console.log(showName);
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
            <Navbar bg="dark" variant="dark" expand="md" className="px-3 mb-3 justify-content-between">
              {/* <div className="d-flex align-items-center flex-grow-1 justify-content-between"> */}
              <Navbar.Brand className="ml-0 d-none d-md-flex">Top 5 Spotify</Navbar.Brand>
              <Navbar.Brand className="d-md-none d-xs-flex">O</Navbar.Brand>
              <div className="timeframe-button-container">{dataRender}</div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1" />
              {/* <div className="d-flex align-items-center justify-content-around"> */}
              <Navbar.Collapse id="responsive-navbar-nav">
                <NavDropdown title="Options" id="nav-dropdown">
                  <NavDropdown.Item onClick={onNameClick}>Toggle Name</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown>

                <Button variant="outline-light" onClick={logout} className="mx-2">
                  Logout
                </Button>
                <FontAwesomeIcon icon={faQuestionCircle} onClick={handleShowModal} size="lg" inverse className="clickable d-none d-md-inline" />
              </Navbar.Collapse>
              {/* </div> */}
              {modalRender}
              {/* </div> */}
            </Navbar>

            <div className="user-container">
              <div className="user-image-container">
                <img
                  src={userInfo.userImageUrl ? userInfo.userImageUrl : require("./assets/defaultUser.png")}
                  className="rounded-circle border border-5 border-dark shadow img-fluid"
                  alt="User"
                />
              </div>
              <div className="d-flex mb-2 justify-content-center">
                <h2 className={showName ? undefined : "d-none"}>{userInfo.displayName}</h2>
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
                <h2 className="text-center">Top Artists</h2>
                {artistResults.map((artist) => (
                  <ArtistSearchResult artist={artist} key={artist.uri} />
                ))}
              </div>
              <div className="desktop-sub-data-container">
                <h2 className="text-center">Top Tracks</h2>
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
