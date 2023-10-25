# "Top 5 Trend" Visualizer App

Top 5 Trend is a ReactJS experiment using the Spotify API. This app uses React Hooks to manage state, and gather data from 3 endpoints: **User, Top Tracks,** and **Top Artists**

  Tracks and Artists will fetch a user's top tracks and artists within 1 of 3 possible timeframes allowed by the API: 4 weeks, 6 months, and All Time.
  User endpoint is just used to fetch the User Icon (if there is one).
  
  ![top5spotifyDemoPic](https://user-images.githubusercontent.com/22552444/151829118-9daf0f8b-94b2-42d2-9dd6-400a30fe35fb.png)
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

  ---
  
  ### Known Issues
  - Spotify's API limits use of User Info endpoint, and will not display user images or names

  ---

  ### Troubleshooting
  This app is still very much a WIP. For most problems, simply **clicking the logout button** and logging back in with Spotify will fix your issues.
