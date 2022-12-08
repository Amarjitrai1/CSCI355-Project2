const express = require('express');
const path = require('path');
const app = express();
const https = require('https');

//The file that stores user info. An exemplification of file writing.
const settings = require('./settings.js')

//To allow for parsing JSON bodies
app.use(express.json({type: '*/*'}));

//setting the app engine to ejs to be able to render html files such as the video html and load a custom title/movie
app.engine('html', require('ejs').renderFile);

//For express to allow my html to know which path to go to for files, etc.
app.use(express.static(path.join(__dirname, 'public')));

//Send the user the login page upon first visit/login.
app.get(['/', '/login'], (req, res) => {
	res.sendFile('./views/login.html', { root: __dirname });
});

//Send the user the login page upon first visit.
app.get('/home', (req, res) => {
	res.sendFile('./views/index.html', { root: __dirname });
});

//Send the user the login page upon first visit.
app.get('/account', (req, res) => {
	res.sendFile('./views/account.html', { root: __dirname });
});

//Retrive user info
app.get('/account/user_info', (req, res) => {
	res.json(settings["user12345"]);
});

//Update user info. The user will send a post request.
app.post('/account/user_info', (req, res) => {
  //We will take the user's request body and update our internal settings.js file to store their updated info.
  settings["user12345"].fullName = req.body.fullName;
  settings["user12345"].gender = req.body.gender;
  settings["user12345"].birthday = req.body.birthday;
  settings["user12345"].email = req.body.emailUser;
	res.json({status: "successfully updated"});
});

//Retrive video being requested
app.get('/video', (req, res) => {

  //By Default we will say unknown movie. If an ID is available present the title and adjust the video html.
  var videoName = "Unknown Movie"
  if(req.query.movieID == 1){
    videoName = "Dune"
  }
  if(req.query.movieID == 2){
    videoName = "The Matrix"
  }
  if(req.query.movieID == 3){
    videoName = "Spider-Man: No Way Home"
  }
  //res.render('./views/video-playing.html', { root: __dirname, videoID:videoName });
  res.render(__dirname + '/views/video-playing.html', {videoID:videoName});
});

//The user asked to search for the movie, here's how we handle it.
app.get(['/api/search','/api/initial'], async (request, response) => {

    // Get the query string from the request
    const query = request.query;
    var apiURL = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${query.query}`

    console.log(request.url)
    if(request.url.toLowerCase() == '/api/initial'){
      apiURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1`
    }

    //Send the GET request for the api we will use.
    https.get(apiURL, (res) => {
    // Check for errors
    if (res.statusCode !== 200) {
      //Tell the user we're giving you an error 500
      response.status(500);
      response.send({ error: "Internal Request Error" });
    }

    // Read the response data as a JSON object
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const jsonResp = JSON.parse(data);
        response.send(jsonResp);
      } catch (error) {
        response.status(500);
        response.send({ error: "Internal Request Error" });
      }
    });
  });
});

//Redirecting any 404's back to login.
app.get('*', (req, res) => {
  res.redirect('/');
});

// Port 5000 is where we will test our node app on localhost
app.listen(5000, () => console.log('Ready to listen on port 5000'));
