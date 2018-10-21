const express = require('express');
const app = express();
const fs = require('fs');
const resize = require('./resize.js');
const PORT = 3000;

// Request raw image
app.get('/raw', (req, res) => {
  const path = req.query.path || 'images/originals';
  const image = req.query.imageName;

  // Check that original image exists
  if (fs.existsSync(path + '/' + image)) {
    // Set type of response
    res.type(`image/${req.query.imageName.split('.')[1]}`);
    // Send image
    res.send(fs.readFileSync(path + '/' + image));
  } else {
    res.status(404).send('Could not find original image! Check image path to ensure it leads to existing image.');
  }
});

// Request resized image
app.get('/resize', (req, res) => {
  const image = req.query.imageName;
  const format = req.query.format || req.query.imageName.split('.')[1];
  const pathToWriteTo = req.query.path;
  const pathToReadFrom = 'images/originals/' + image;

  // Check that original image exists
  if (!fs.existsSync(pathToReadFrom)) {
    res.status(404).send('Could not find original image! Check image path to ensure it leads to existing image.');
  }
  // Parse width and height to integer
  let width;
  let height;
  if (req.query.width) {
    width = parseInt(req.query.width);
  }
  if (req.query.height) {
    height = parseInt(req.query.height);
  }
  // Set type of response
  res.type(`image/${format}`);
  // Get resized image
  resize(pathToReadFrom, pathToWriteTo, image, width, height);
  res.send('Resized image written to ' + pathToWriteTo + '/' + image);
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}!`);
});
