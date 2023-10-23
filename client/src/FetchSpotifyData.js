import { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

const credentials = {
  clientId: "f655ecf166914d6b9ecf6d7abcc91c52",
};

const spotifyApi = new SpotifyWebApi(credentials);

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
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // https://stackoverflow.com/questions/61178240/useeffect-does-not-listen-for-localstorage/61178371#61178371

  // Fetch data
  useEffect(() => {
    if (!accessToken) return;
    const TIME_RANGE_TRACKS = ["short_term", "medium_term", "long_term"];
    Promise.all(
      TIME_RANGE_TRACKS.map(async (timeRange) => {
        const trackData = await spotifyApi.getMyTopTracks({ limit: 5, time_range: timeRange }).then((res) => {
          return {
            time_range: timeRange,
            track_data: res.body.items.map((track) => {
              const largestAlbumImage = track.album.images[1] ? track.album.images[1] : track.album.images[0];
              return {
                artist: track.artists[0].name,
                title: track.name,
                trackLink: track.external_urls.spotify,
                uri: track.uri,
                albumUrl: largestAlbumImage.url,
              };
            }),
          };
        });
        return trackData;
      }),
    ).then((values) => localStorage.setItem("trackData", JSON.stringify(values)));

    Promise.all(
      TIME_RANGE_TRACKS.map(async (timeRange) => {
        const artistData = await spotifyApi.getMyTopArtists({ limit: 5, time_range: timeRange }).then((res) => {
          return {
            time_range: timeRange,
            artist_data: res.body.items.map((artist) => {
              const largestAlbumImage = artist.images[1] ? artist.images[1] : artist.images[0];
              // Fix capitalization of genres
              const capitalizedGenre = artist.genres[0]
                ? artist.genres[0]
                    .split(" ")
                    .map((word) => {
                      return word[0].toUpperCase() + word.substring(1);
                    })
                    .join(" ")
                : "[No Genre]";
              return {
                artistName: artist.name,
                uri: artist.uri,
                artistLink: artist.external_urls.spotify,
                imageUrl: largestAlbumImage.url,
                genre: capitalizedGenre,
              };
            }),
          };
        });
        return artistData;
      }),
    ).then((values) => localStorage.setItem("artistData", JSON.stringify(values)));

    (async () => {
      const userData = await spotifyApi.getMe().then((res) => {
        return {
          displayName: res.body.display_name ? res.body.display_name : null,
          userName: res.body.id,
          userImageUrl: res.body.images[1].url ? res.body.images[1].url : null,
        };
      });
      return userData;
    })().then((value) => localStorage.setItem("userData", JSON.stringify(value)));
  }, [accessToken]);

  // set which data is returned

  useEffect(() => {
    const tracks = localStorage.getItem("trackData");
    const artists = localStorage.getItem("artistData");

    if (tracks) {
      const filteredTracks = JSON.parse(tracks).filter((track) => track.time_range === timeRange);
      setTrackResults(filteredTracks[0].track_data);
    }
    if (artists) {
      const filteredArtists = JSON.parse(artists).filter((artist) => artist.time_range === timeRange);
      setArtistResults(filteredArtists[0].artist_data);
    }
  }, [timeRange, loading]);

  // Get User Profile Pic
  useEffect(() => {
    const user = localStorage.getItem("userData");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserInfo({
        displayName: parsedUser.displayName ? parsedUser.displayName : null,
        userName: parsedUser.userName,
        userImageUrl: parsedUser.userImageUrl ? parsedUser.userImageUrl : null,
      });
    }
  }, [loading]);

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
        <ButtonGroup className="timeframe-button-group">
          {radios.map((radio, idx) => {
            return (
              <ToggleButton
                key={idx}
                className="timeframe-radio"
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
