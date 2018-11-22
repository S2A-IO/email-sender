# email-sender
Email sending services for S2A
- [Installation](#installation)
- [Usage Example](#usage-example)

## Installation
  ```
npm install git://github.com/S2A-IO/email-sender --save
  ```
email-sender has the peerDependencies of nodemailer and nodemailer-smtp-transport we have to install it.
```
npm install nodemailer nodemailer-smtp-transport --save
```
## Usage Example
Load the required image to crop and initialize it.

| Field    | Description      | Required       |
|----------|-------------|----------------|
| data   | Data passed to this function.  | **YES** |
| context      | Client context. Unused. | **YES** |
| callback      | Callback function to pass back the response. | **YES** |

data.env = {
  service: 'SES', //sending email service
  host: 'smtp.ethereal.email', //host address
  port : 465,
  user : 'account.user', //hosted user account
  pass : 'account.pass' // hosted user password
};
data.current = {
  from : 'foo@example.com', //sender address
  to: 'bar@example.com, baz@example.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  message: '<b>Hello world?</b>',
  isHtml : true
};
  ```
  email.handler(data, context, function testHandler ( error, res) {
    if ( error ) {
      console.log('error',error);
    } else {
      console.log('res',res);
    }
  });
  ```
