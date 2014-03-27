/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var http = require('http');
var fs = require('fs');

var transactionLogger = require('../');

// create an http server
http.createServer(function (req, res) {
    // start the transaction
    var trx = transactionLogger.startTransaction('Hello World');

    // start the io
    var io = trx.startIO('Read','FILE','HelloWorld.html');

    fs.readFile(__dirname + '/resource/HelloWorld.html',function(err, data){
        if(err){
            // end the io with an error
            io.end('ERROR');

            res.end(err.toString());

            // end the transaction with an error
            trx.end('ERROR');
            return;
        }

        // end the io
        io.end();

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);

        // end the transaction
        trx.end();
    });



}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');