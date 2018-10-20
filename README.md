
# Image Resizer Service

> A service to retrieve and/or resize raw images from the file system. Compatible for jpg, png, or gif images.

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#Usage)
3. [API](#API)

## Requirements
- Node 8.11.3

## Usage

> Some usage instructions

### Setting Up

To install dependencies
From within the root directory:

```sh
npm install
npm start
```
### Image Storage

Original images should be stored in root/images/originals.
Resized images will be output to root/images/resized or the file path that is designated in the request.

## API

### GET request to the server to retrieve raw image from file system
```sh
curl -H "Content-Type: application/json" -X GET http://localhost:3000/raw?path=images/originals&imageName=octocat.gif

_(Note: 'images/originals' is the path to the image location relative to the root directory -- a different path may be specified)_
```

### GET request to resize raw image and save to file system
```sh
curl -H "Content-Type: application/json" -X GET http://localhost:3000/resize?path=images/resized&imageName=octocat.gif&width=300&height=300

_(Note: 'images/resized' is where the resized image will be stored relative to the root directory -- if a path is not defined, this will be the default location)_
```
