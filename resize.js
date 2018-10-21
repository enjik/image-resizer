const Jimp = require('jimp');
const fs = require('fs');
//resizedImageName = rawImageName + resizeOption
//http://localhost:8000?format=png&width=200&height=200
// const widthString = req.query.width;
// const heightString = req.query.height;
// const format = req.query.format;

//  const resize = function(path, format, width, height)  {
//   const stream = fs.createReadStream(path);
//   if (format) {
//     project = project.toFormat(format);
//   }
//   if (width || height) {
//     project = project.resize(width, height);
//   }
//   return stream.pipe(project);
// }
//
// module.exports = resize;

const resize = function(pathToReadFrom, pathToWriteTo, image, width, height)  {
  Jimp.read(pathToReadFrom)
  .then(img => {
    return img.clone()
      .resize(width, height) // resize
      .write(pathToWriteTo + '/resized-' + image); // save
  })
  .catch(err => {
    console.error(err);
  });
}


module.exports = resize;
