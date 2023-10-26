# "Top 5 Spotify" Data Display App

Top 5 Spotify is a ReactJS app built with Node and an express server for managing authentication to Spotify's offiical API. This app uses React Hooks to manage state, and gather data from 3 endpoints: **User, Top Tracks,** and **Top Artists**

  Tracks and Artists will fetch a user's top tracks and artists within 1 of 3 possible timeframes allowed by the API: 4 weeks, 6 months, and All Time.
  User endpoint is just used to fetch the User Icon (if there is one) and username for display purposes.
  
  ![image](https://github.com/OptimisticShibe/spotify-stats-dashboard/assets/22552444/4e9f08b7-efbb-4753-835f-08b057207fe4)

  ---

  ### Technologies used in this app
  - ReactJS
  - Axios
  - Express
  - NodeJS
  - React Bootstrap

  ---

  ### Features
  - Data display of user's top tracks + artists for all 3 available time measure periods
  - Track + Artist items link to relevant spotify pages
  - Toggle-able image and name
  - One-click 'copy to clipboard' functionality for clean social-media ready screenshots
  - Demo Mode with mocked data

  ---
  
  ### Known Issues
  - Spotify's API is limited in development mode for personal projects like this, and does not allow access to general users. Demo mode was implemented to offer mocked data as an alterantive.
