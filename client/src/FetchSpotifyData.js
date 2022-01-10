import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import TrackSearchResult from "./TrackSearchResult";
import UserDisplay from "./UserDisplay";
import ArtistSearchResult from "./ArtistSearchResult";

const spotifyApi = new SpotifyWebApi({
  clientId: "f655ecf166914d6b9ecf6d7abcc91c52",
});

export default function TopItems({ code }) {
  const accessToken = useAuth(code);
  const [trackResults, setTrackResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [userInfo, setUserInfo] = useState({});
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
    spotifyApi.getMyTopTracks({ limit: 5, time_range: timeRange }).then((res) => {
      setTrackResults(
        res.body.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        }),
      );
    });
  }, [timeRange, accessToken]);

  // Get Top Artists
  useEffect(() => {
    if (!accessToken) return setTrackResults([]);

    spotifyApi.getMyTopArtists({ limit: 5, time_range: timeRange }).then((res) => {
      console.log(res);
      setArtistResults(
        res.body.items.map((artist) => {
          const smallestAlbumImage = artist.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, artist.images[0]);
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
            imageUrl: smallestAlbumImage.url,
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
    <div>
      <UserDisplay userInfo={userInfo} />
      <div className="d-flex flex-row justify-content-around">
        <div className="">
          <h2>Top Artists</h2>
          {artistResults.map((artist) => (
            <ArtistSearchResult artist={artist} key={artist.uri} />
          ))}
        </div>
        <div className="">
          <h2>Top Tracks</h2>
          {trackResults.map((track) => (
            <TrackSearchResult track={track} key={track.uri} />
          ))}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center">
        <button className="btn btn-outline-dark m-3" onClick={() => setTimeRange(TIME_RANGE.short)}>
          4 Weeks
        </button>
        <button className="btn btn-outline-dark m-3" onClick={() => setTimeRange(TIME_RANGE.medium)}>
          6 Months
        </button>
        <button className="btn btn-outline-dark m-3" onClick={() => setTimeRange(TIME_RANGE.long)}>
          All Time
        </button>
      </div>
    </div>
  );
}
