const express = require('express');
const app = express();
const fs = require('fs');
const resize = require('./resize.js');

// request raw image
app.get('/raw', (req, res) => {
  let path = req.query.path;
  let image = req.query.imageName;
  res.type(`image/${req.query.imageName.split('.')[1]}`);
  res.send(fs.readFileSync(path + '/' + image));
});

// request resized image
app.get('/resize', (req, res) => {
  let format = req.query.format ? req.query.format : req.query.imageName.split('.')[1];
  let width;
  let height;
  let path = req.query.path;
  let image = req.query.imageName;

  if (req.query.width) {

  }
  res.type(`image/${format}`);
  resize(path + '/' + image, width, height).pipe(res);
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening at ${PORT}!`);
});
