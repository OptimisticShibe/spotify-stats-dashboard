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
    if (!code) return;
    axios
      .post("https://topfivespotify.site/login", {
        code,
      })
      .then((res) => {
        localStorage.clear();
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        setIsLoggedIn(true);

        // TODO: check if this is the best way
        // Removes code from URL
        window.history.pushState({}, null, "/");
        setCode("");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("https://topfivespotify.site/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.body.access_token);
          setExpiresIn(res.data.body.expires_in);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expiresIn);
          setIsLoggedIn(true);
        })
        .catch(() => {
          window.location = "/";
        });
      // }, expiresIn);
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  // localStorage.clear();
  useEffect(() => {
    if (!accessToken) return;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiresIn", expiresIn);
  }, [accessToken, refreshToken, expiresIn]);

  return isLoggedIn;
}
