import axios from "axios";
import { useState } from "react";

export function ProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // TODO: context for token access in Fetch
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const code = new URLSearchParams(window.location.search).get("code");

  if (code) {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        localStorage.clear();

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("expiresIn", expiresIn);
        // TODO: check if this is the best way
        // Removes code from URL
        window.history.pushState({}, null, "/");
        setIsLoggedIn(true);
      })
      .catch((e) => {
        console.log(e);
        // window.location = "/";
      });
  }
  return { isLoggedIn };
}
