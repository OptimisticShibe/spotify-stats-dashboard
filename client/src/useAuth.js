import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [code, setCode] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);

  useEffect(() => {
    if (code != null) {
      axios
        .post("http://localhost:3001/login", {
          code,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
          setIsLoggedIn(true);

          // TODO: check if this is the best way
          // Removes code from URL
          window.history.pushState({}, null, "/");
        })
        .catch(() => {
          console.log("whuh oh");
          // window.location = "/";
        });
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expiresIn);
          setIsLoggedIn(true);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  // localStorage.clear();
  useEffect(() => {
    if (!accessToken) return;
    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  return isLoggedIn;
}
