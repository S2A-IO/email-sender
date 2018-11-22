const email = require('./../server/index');
var assert = require('assert');
let correctParams = {};
let incorrectParams = {};
let context = '';
let status = false;
// Please change the parameters with valid values and parameters to run the test case
correctParams.env = {
  service: '***',
  host : '********',
  port : '***',
  user : '***************',
  pass : '***************',
  from : '***@riksof.com',
  cc : '***@riksof.com'
};
// Please change the parameters with valid values and parameters to run the test case
correctParams.current = {
  from : '***@riksof.com',
  to : "***@riksof.com",
  subject : "Test Case",
  message : "Testing",
  isHtml : true,
  cc : '***@riksof.com',
  bcc : [],
  replyTo : [""]
};
incorrectParams.env = {
  service: '***',
  host : '********',
  port : '***',
  user : '***************',
  pass : '***************',
  from : '***@riksof.com',
  cc : '***@riksof.com'
};
incorrectParams.current = {
  from1 : '***@riksof.com',
  to1 : "***@riksof.com",
  subject1 : "Test Case",
  message1 : "Testing",
  isHtml : true,
  cc : '***@riksof.com',
  bcc : [],
  replyTo : [""]
};
describe('testing email service', function () {
  it('testing email service', function (done) {
    this.timeout(15000);
    setTimeout(done, 15000);
    email.handler(correctParams, context, function testHandler ( error, res) {
      if ( res && res.response && res.response.includes('250 Ok')) {
        status = true;
      }
      assert.equal(status, true);
      done();
    });
  })
})

describe('testing email service with incorrect parameters', function () {
  it('testing email service with incorrect parameters', function (done) {
    this.timeout(15000);
    setTimeout(done, 15000);
    email.handler(incorrectParams, context, function testHandler ( error, res) {
      assert.equal(error.status, 400);
      done();
    });
  })
})
