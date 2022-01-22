import { useState, useEffect, useRef, createRef } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import UserDisplay from "./UserDisplay";
import ArtistSearchResult from "./ArtistSearchResult";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Container } from "react-bootstrap";
import NavButton from "./NavButton";
import DropdownMenu from "./DropdownMenu";

const spotifyApi = new SpotifyWebApi({
  clientId: "f655ecf166914d6b9ecf6d7abcc91c52",
});

// TODO: Figure out a way to limit API calls?
export default function TopItems({ code }) {
  const accessToken = useAuth(code);
  const [trackResults, setTrackResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const TIME_RANGE = {
    short: "short_term",
    medium: "medium_term",
    long: "long_term",
  };
  const [timeRange, setTimeRange] = useState(TIME_RANGE.medium);

  // Any time access token changes, set access token on api
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Get Top Tracks
  useEffect(() => {
    if (!accessToken) return setTrackResults([]);
    spotifyApi
      .getMyTopTracks({ limit: 5, time_range: timeRange })
      .then((res) => {
        setTrackResults(
          res.body.items.map((track) => {
            /*
          const largestAlbumImage = track.album.images.reduce((largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          }, track.album.images[0]);
          */
            const largestAlbumImage = track.album.images[1] ? track.album.images[1] : track.album.images[0];
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: largestAlbumImage.url,
            };
          }),
        );
      })
      .then(() => setLoading(false));
  }, [timeRange, accessToken]);

  // Get Top Artists
  useEffect(() => {
    if (!accessToken) return setTrackResults([]);
    spotifyApi.getMyTopArtists({ limit: 5, time_range: timeRange }).then((res) => {
      setArtistResults(
        res.body.items.map((artist) => {
          const largestAlbumImage = artist.images[1] ? artist.images[1] : artist.images[0];
          // Genres returned by API are all lowercase
          const capitalizedGenre = artist.genres[0]
            .split(" ")
            .map((word) => {
              return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
          return {
            artistName: artist.name,
            uri: artist.uri,
            imageUrl: largestAlbumImage.url,
            genre: capitalizedGenre,
          };
        }),
      );
    });
  }, [timeRange, accessToken]);

  // Get User Profile Pic
  useEffect(() => {
    if (!accessToken) return setUserInfo({});
    spotifyApi.getMe().then((res) => {
      setUserInfo({
        displayName: res.body.display_name ? res.body.display_name : null,
        userName: res.body.id,
        userImageUrl: res.body.images[0].url ? res.body.images[0].url : null,
      });
    });
  }, [accessToken]);

  return (
    <Container>
      {loading ? (
        <div className="loading-spinner d-flex">
          <ScaleLoader color={"#fff"} loading={loading} size={150} />
        </div>
      ) : (
        <div>
          <NavButton>
            <DropdownMenu></DropdownMenu>
          </NavButton>
          <UserDisplay userInfo={userInfo} />
          <div className="d-flex flex-lg-row flex-column justify-content-around">
            <div className="d-flex flex-column data-container mx-3 align-items-center">
              <h2>Top Artists</h2>
              {artistResults.map((artist) => (
                <ArtistSearchResult artist={artist} key={artist.uri} />
              ))}
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button className="btn btn-lg btn-outline-light m-3 d-md-table" onClick={() => setTimeRange(TIME_RANGE.short)}>
                4 Weeks
              </button>
              <button className="btn btn-lg btn-outline-light m-3" onClick={() => setTimeRange(TIME_RANGE.medium)}>
                6 Months
              </button>
              <button className="btn btn-lg btn-outline-light m-3" onClick={() => setTimeRange(TIME_RANGE.long)}>
                All Time
              </button>
            </div>
            <div className="d-flex flex-column data-container mx-3 align-items-center">
              <h2>Top Tracks</h2>
              {trackResults.map((track) => (
                <TrackSearchResult track={track} key={track.uri} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
