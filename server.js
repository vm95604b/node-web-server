const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//nodemon server.js -e js,hbs allows the partials folder to be seen by nodemon
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

fs.appendFile('server.log', log + '\n', (err) => {
  if (err) {
    console.log('Unable to append to server.log.');
  }
});
  next();
});

// //
// //This will close all routes and send the maintenance page
// //
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=> {
  //res.send('Some HTML');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'This is my welcome message'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
