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
  const format = req.query.imageName.split('.')[1];
  const pathToWriteTo = req.query.path || 'images/resized';
  const pathToReadFrom = 'images/originals/' + image;

  // Check that original image exists
  if (!fs.existsSync(pathToReadFrom)) {
    res.status(404).send('Could not find original image! Check image path to ensure it leads to existing image.');
  } else {
    // Parse width and height to integer
    let width;
    let height;
    width = req.query.width ? parseInt(req.query.width) : undefined;
    height = req.query.height? parseInt(req.query.height) : undefined;
    // Set type of response
    res.type('text/html');
    // Write resized image to file system
    resize(pathToReadFrom, pathToWriteTo, image, format, width, height);
    res.send(`Image resized and written to ${pathToWriteTo}/${width}x${height}-${image}`);
  }
});

app.listen(PORT, () => {
  console.log(`listening at ${PORT}!`);
});

module.exports = app;
