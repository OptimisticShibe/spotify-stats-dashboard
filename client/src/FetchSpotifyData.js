import { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "f655ecf166914d6b9ecf6d7abcc91c52",
});

export default function FetchSpotifyData({ token }) {
  const [accessToken, setAccessToken] = useState(token);
  const [trackResults, setTrackResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const TIME_RANGE = {
    short: "short_term",
    medium: "medium_term",
    long: "long_term",
  };
  const [timeRange, setTimeRange] = useState(TIME_RANGE.short);
  const radios = [
    { name: "4 Weeks", value: "short_term" },
    { name: "6 Months", value: "medium_term" },
    { name: "All Time", value: "long_term" },
  ];

  useEffect(() => {
    if (token) {
      return setAccessToken(token);
    }
    return setAccessToken(localStorage.getItem("accessToken"));
  }, [token]);

  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken);
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Get Top Tracks
  useEffect(() => {
    if (!accessToken) return setTrackResults([]);
    spotifyApi.getMyTopTracks({ limit: 5, time_range: timeRange }).then((res) => {
      setTrackResults(
        res.body.items.map((track) => {
          const largestAlbumImage = track.album.images[1] ? track.album.images[1] : track.album.images[0];
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: largestAlbumImage.url,
          };
        }),
      );
    });
  }, [timeRange, accessToken]);

  // Get Top Artists
  useEffect(() => {
    if (!accessToken) return setTrackResults([]);
    spotifyApi.getMyTopArtists({ limit: 5, time_range: timeRange }).then((res) => {
      setArtistResults(
        res.body.items.map((artist) => {
          const largestAlbumImage = artist.images[1] ? artist.images[1] : artist.images[0];
          // Fix capitalization of genres
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

  useEffect(() => {
    if (userInfo && artistResults && trackResults) {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [userInfo, artistResults, trackResults]);

  return {
    trackResults,
    artistResults,
    userInfo,
    loading,
    dataRender: (
      <>
        <ButtonGroup>
          {radios.map((radio, idx) => {
            return (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="outline-light"
                name="radio"
                value={radio.value}
                checked={timeRange === radio.value}
                onChange={() => {
                  setTimeRange(radio.value);
                }}
              >
                {radio.name}
              </ToggleButton>
            );
          })}
        </ButtonGroup>
      </>
    ),
  };
}
