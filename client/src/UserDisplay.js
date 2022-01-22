import React from "react";
import { Container } from "react-bootstrap";

export default function UserDisplay({ userInfo }) {
  return (
    <Container>
      <div className="d-flex justify-content-center m-3 user-container">
        <img src={userInfo.userImageUrl} className="rounded-circle border border-5 border-dark shadow" alt="User" />
      </div>
      <div className="d-flex m-2 justify-content-center">
        <h2>{userInfo.displayName}</h2>
      </div>
    </Container>
  );
}
