import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const URL = "http://localhost:8000";
  // const URL = "https://topfivetrend.rafiqramadan.com";
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem("expiresIn"));
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }
    axios
      .post(`${URL}/login`, {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        // Removes code from URL
        window.history.pushState({}, null, "/");
        setCode("");
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        console.log("Login Error");
      });
  }, [URL, code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${URL}/refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.body.access_token);
          setExpiresIn(res.data.body.expires_in);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresIn", expiresIn);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          window.location = "/";
          console.log("Refresh error");
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [URL, refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("expiresIn", expiresIn);
  }, [accessToken, refreshToken, expiresIn]);
  return accessToken;
}
