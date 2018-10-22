const server = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const chaiFs = require('chai-fs');

chai.use(chaiHttp);
chai.use(chaiFs);

describe('server.js', function() {
  it('should /raw GET with the path and imageName defined', function(done) {
    chai.request(server)
      .get('/raw?path=images/originals&imageName=test-image.gif')
      .end(function(err, res){
        res.should.have.status(200);
        done();
    });
  });
  it('should /raw GET without path defined if imageName exists in images/originals directory', function(done) {
    chai.request(server)
      .get('/raw?imageName=test-image.gif')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });
  it('should return a 404 error on /raw GET if an imageName does not exist in file system', function(done) {
    chai.request(server)
      .get('/raw?imageName=nonexistent.gif')
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });
  it('should /resize GET with the path and imageName defined', function(done) {
    chai.request(server)
      .get('/resize?imageName=test-image.gif&path=images/resized/test&width=300&height=300')
      .end(function(err, res){
        res.should.have.status(200);
        expect('images/resized/test/300x300-test-image.gif').to.be.a.path();
        done();
      });
    });
  it('should write resized image to images/resized even if no path or dimensions defined', function(done) {
    chai.request(server)
      .get('/resize?imageName=test-image.gif')
      .end(function(err, res){
        res.should.have.status(200);
        expect('images/resized/_x_-test-image.gif').to.be.a.path();
        done();
      });
    });
  it('should return a 404 error on /resize GET if the raw image does not exist in images/originals', function(done) {
    chai.request(server)
      .get('/resize?imageName=nonexistent.gif')
      .end(function(err, res){
        res.should.have.status(404);
        expect('images/resized/_x_-nonexistent.gif').to.not.be.a.path();
        done();
      });
    });
  });
