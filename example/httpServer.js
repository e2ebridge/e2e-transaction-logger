/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var http = require('http');

var transactionLogger = require('../');

// create an http server
http.createServer(function (req, res) {

    // start the transaction when a request arrives
    var trx = transactionLogger.startTransaction('Hello World');

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');

    // end the transaction when the response is sent
    trx.end();

}).listen(3000, '127.0.0.1');