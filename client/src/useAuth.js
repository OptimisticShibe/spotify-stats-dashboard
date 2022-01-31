import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem("expiresIn"));
  const [code, setCode] = useState();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);

  useEffect(() => {
    if (!code) return;
    axios
      .post("https://whispering-castle-41935.herokuapp.com/login", {
        code,
      })
      .then((res) => {
        localStorage.clear();
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

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
        .post("https://whispering-castle-41935.herokuapp.com/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.body.access_token);
          setExpiresIn(res.data.body.expires_in);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    localStorage.clear();
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiresIn", expiresIn);
  }, [accessToken, refreshToken, expiresIn]);
  return accessToken;
}
