'use strict';

/**
 * @author Copyright RIKSOF (Private) Limited.
 */
const NodeMailer = require( 'nodemailer' );
const SmtpTransport = require( 'nodemailer-smtp-transport' );

const BAD_GATEWAY = 502;
const BAD_REQUEST = 400;

/**
 * This function is the entry point for serverless function.
 *
 * @param {any} data                          Data passed to this function.
 * @param {any} context                       Client context. Unused.
 * @param {function} callback                 Callback function to pass back
 *                                            the response.
 *
 * @returns {undefined} None.
 */
module.exports.handler = function SendEmailHandler( data, context, callback ) {
  let transporter = NodeMailer.createTransport( SmtpTransport({ // create transporter object using the default SMTP
    service: data.env.service,
    host: data.env.host,
    port: parseInt( data.env.port, 10),
    auth: {
      user: data.env.user,
      pass: data.env.pass
    }
  }));

  let p = [];

  if ( Array.isArray( data.current ) ) {
    for ( let i = 0; i < data.current.length; i++ ) {
      p[ i ] = sendEmail( transporter, data.current[i] );
      p = Promise.all( p );
    }
  } else {
    p = sendEmail( transporter, data.current );
  }

  return p.then( function AfterEmailSent( res ) {
    callback( null, res );
  }).catch( function OnEmailError( error ) {
    callback( error, null );
  });
};

function sendEmail( transporter, current ) {
  return new Promise( function OnPromise( resolve, reject ) {

    // Initialize error as empty.
    let error = null;

    // Initialize mailOptions as empty.
    let mailOptions = {};

    // Validate the param from constains value
    if ( !current.from ) error = new Error( 'Please give a sender address for the email' );

    // Validate the param to constains value
    if ( !current.to ) error = new Error( 'Please give a recipient address for the email' );

    // Validate the param subject constains value
    if ( !current.subject ) error = new Error( 'Please give a subject for the email' );

    // Validate the param message constains value
    if ( !current.message ) error = new Error( 'Please give a content for the email' );

    // Throw Validation error if exist.
    if ( error ) {
      error.status = BAD_REQUEST;
      reject( error );
    }

    // sender address
    mailOptions.from = current.from;

    // list of recipients
    mailOptions.to = current.to;

    // Subject content
    mailOptions.subject = current.subject;

    // Check text is html or plaintext
    if ( current.isHtml ) mailOptions.html = current.message;
    else mailOptions.text = current.message;

    // Checks the param cc constains value
    if ( current.cc ) mailOptions.cc = current.cc;

    // Checks the param bcc constains value
    if ( current.bcc ) mailOptions.bcc = current.bcc;

    // Checks the param replyTo constains value
    if ( current.replyTo ) mailOptions.replyTo = current.replyTo;

    // Checks the param attachments constains array Objects
    if ( current.attachments && current.attachments.length ) mailOptions.attachments = current.attachments;

    transporter.sendMail( mailOptions, function SendMail( error, info ) {

      if ( error ) {
        // Is the error object if message failed
        error.status = BAD_GATEWAY;
        reject( error );
      } else {
        // otherwise is the info that includes the result, the exact format depends on the transport mechanism used.
        resolve( info );
      }
    });
  });
}
