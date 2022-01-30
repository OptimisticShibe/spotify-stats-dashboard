import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Navbar, NavbarBrand, Tab, Tabs } from "react-bootstrap";
import ScaleLoader from "react-spinners/ScaleLoader";
import ArtistSearchResult from "./ArtistSearchResult";
import FetchSpotifyData from "./FetchSpotifyData";
import InfoModal from "./InfoModal";
import TrackSearchResult from "./TrackSearchResult";
import UserDisplay from "./UserDisplay";

// Display Results etc
export default function Dashboard() {
  const { trackResults, artistResults, userInfo, loading, dataRender } = FetchSpotifyData();

  const { handleShowModal, modalRender } = InfoModal();

  return (
    <div className="Primary-Container">
      <div>
        {loading ? (
          <div className="loading-spinner d-flex">
            <ScaleLoader color={"#fff"} loading={loading} size={150} />
          </div>
        ) : (
          <div>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Nav className="me-auto py-2">
                  <NavbarBrand>Spootifuu</NavbarBrand>
                  {/* full display options */}
                  <div className="d-flex px-5">{dataRender}</div>
                </Nav>
                <Navbar.Text className="d-none d-lg-block">
                  Created by: <a href="https://github.com/OptimisticShibe">Optimistic Shibe</a>
                </Navbar.Text>
                <Navbar.Text className="mx-2 clickable">
                  <FontAwesomeIcon icon={faQuestionCircle} onClick={handleShowModal} size="lg" inverse />
                  {modalRender}
                </Navbar.Text>
              </Container>
            </Navbar>
            <Container>
              <UserDisplay userInfo={userInfo} />
              <div className="d-lg-none d-xl-none">
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
              <div className="d-none d-lg-flex flex-row justify-content-around">
                <div className="d-flex flex-column data-container mx-3 align-items-center px-5">
                  <h2>Top Artists</h2>
                  {artistResults.map((artist) => (
                    <ArtistSearchResult artist={artist} key={artist.uri} />
                  ))}
                </div>
                <div className="d-flex flex-column data-container mx-3 align-items-center px-5">
                  <h2>Top Tracks</h2>
                  {trackResults.map((track) => (
                    <TrackSearchResult track={track} key={track.uri} />
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}
