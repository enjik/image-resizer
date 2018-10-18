const express = require('express');
const app = express();
const fs = require('fs');
const resize = require('/resize.js');

//http://domain/{rawImagePath}/rawImageName
app.get('/', function(err, callback) {
  if (err) {

  } else {

  }
});

//http://domain/{resizedImagePath}/resizedImageName
app.get('/', function(err, callback) {
  if (err) {

  } else {

  }
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening at ${PORT}!`);
});
