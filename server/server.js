require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const REDIRECT_URI = 'http://localhost:3000'
const CLIENT_ID = 'f655ecf166914d6b9ecf6d7abcc91c52'
const CLIENT_SECRET = 'd4e749097b7742b09cd944023b26ec2e'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
      console.log(data);
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  console.log('made it to server')
  const code = req.body.code;
  console.log(`code = ${code}`)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });
  console.log(spotifyApi)

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      console.log(`data from server /login = ${data}`)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("error in server")
      res.sendStatus(400);
    });
});

app.listen(3001);
