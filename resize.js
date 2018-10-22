const Jimp = require('jimp');
const gifsicle = require('gifsicle');
const { exec } = require('child_process');

const resize = function(pathToReadFrom, pathToWriteTo, image, format, width, height)  {
  if (format === 'gif') {
    // GIF resizing and writing
    exec(`gifsicle --resize ${width}x${height} -i ${pathToReadFrom} > ${pathToWriteTo}/${width}x${height}-${image}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
    });
  } else {
    // JPG or PNG resizing and writing
    Jimp.read(pathToReadFrom)
    .then(img => {
      return img.clone()
        .resize(width, height)
        .write(`${pathToWriteTo}/${width}x${height}-${image}`);
    })
    .catch(err => {
      console.error(err);
    });
  }
}

module.exports = resize;
