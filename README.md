
# Image Resizer Service

> A service to retrieve and resize raw images (jpg, png, or gif) from the file system. Utilizes the libraries jimp and gifsicle.

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#Usage)
3. [API](#API)

## Requirements
- Node 8.11.3

## Usage

> Setting up and image storage instructions.

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
```
_(Note: 'images/originals' is the path to the image location relative to the root directory -- if a path is not defined, the service will attempt to find the image by name in 'images/originals')_

### GET request to resize raw image and save to file system

```sh
curl -H "Content-Type: application/json" -X GET http://localhost:3000/resize?path=images/resized&imageName=octocat.gif&width=500&height=500
```
_(Note: 'images/resized' is where the resized image will be stored relative to the root directory -- if a path is not defined, 'images/resized' will be the default location)_
