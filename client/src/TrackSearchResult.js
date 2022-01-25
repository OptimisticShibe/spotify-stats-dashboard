import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function TrackSearchResult({ track }) {
  return (
    <div className="item-bg m-2 shadow">
      <div className="d-flex data-container">
        <img src={track.albumUrl} alt={track} />
        <div className="m-3 text-main">
          <OverlayTrigger placement="top" overlay={<Tooltip id="track-result-track-name">{track.title}</Tooltip>}>
            <div>{track.title}</div>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={<Tooltip id="track-result-artist-name">{track.artist}</Tooltip>}>
            <div className="text-sub">{track.artist}</div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
}
