import React from "react";

export default function TrackSearchResult({ track }) {
  return (
    <div className="item-bg m-2 shadow">
      <div className="d-flex data-container">
        <img src={track.albumUrl} alt={track} />
        <div className="m-3 text-main">
          <div>{track.title}</div>
          <div className="text-sub">{track.artist}</div>
        </div>
      </div>
    </div>
  );
}
