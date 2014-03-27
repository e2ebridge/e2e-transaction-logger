/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var express = require('express');
var fs = require('fs');

// get the transaction logger middle ware
var transactionLogger = require('../').transactionLoggerMiddleware;

var app = express();

// use the middle ware for all requests
app.use(transactionLogger({
    logPath: __dirname + '/logs'        // configure the logPath
}));

app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/hello.html', function(req, res){
    // start the io
    var io = req.trx.startIO('Read','FILE','HelloWorld.html');

    fs.readFile(__dirname + '/resource/HelloWorld.html',function(err, data){
        if(err){
            // end the io with an error
            io.end('ERROR');

            res.send(503, err);
            return;
        }

        // end the io
        io.end();

        res.set('Content-Type', 'text/html');
        res.send(data);
    });
});

app.get('/error.html', function(req, res){
    // start the io
    var io = req.trx.startIO('Read','FILE','error.html');

    fs.readFile(__dirname + '/error.html',function(err, data){
        if(err){
            // end the io with an error
            io.end('ERROR');
            res.send(503, err);
            return;
        }

        // end the io
        io.end();

        res.set('Content-Type', 'text/html');
        res.send(data);
    });
});

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
});