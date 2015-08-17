/* global describe,before,after,it */

var Sails = require('sails').Sails;
var should = require('should');

describe('Sails', function () {

  var sails;
  var federalistms;

  // Before running any tests, attempt to lift Sails
  before(function (done) {

    // Hook will timeout in 10 seconds
    this.timeout(11000);

    // Attempt to lift sails
    Sails().lift({
      hooks: {
        // Load the hook
        "federalistms": require('../'),
        // Skip grunt
        "grunt": false
      },
      log: { level: "error" }
    }, function (err, _sails) {
      if (err) return done(err);
      sails = _sails;
      federalistms = sails.hooks.federalistms;
      return done();
    });
  });

  // After tests are complete, lower Sails
  after(function (done) {

    if (sails) {
      return sails.lower(done);
    }
    
    return done();
  });
  
  // Test that Sails can lift with the hook in place
  it('should not crash', function () {
    return true;
  });
  
  describe('federalist-ms installable hook', function () {
    
    it('should be loaded', function () {
      should.exist(federalistms);
    });
    
    it('should have a Jekyll build function', function() {
      (federalistms).should.have.enumerable('jekyll');
    });
    
    it('should have a Hugo build function', function() {
      (federalistms).should.have.enumerable('hugo');
    });
    
    it('should have a static build function', function() {
      (federalistms).should.have.enumerable('static');
    });
    
  });
  
});