/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var util = require('util');

var ProcessLogger = require('./processLogger').ProcessLogger;
var Transaction = require('./transaction').Transaction;

/**
 * The request id needs to be unique on the node instance
 * @type {number}
 */
var currentRequestId = 1;

/**
 * Create a transaction logger
 * @param {String=} logPath
 * @constructor
 */
var TransactionLogger = function(logPath){
    ProcessLogger.call(this, logPath, 0, new Date());

    this.logPath = logPath;

    /**
     * Start a transaction
     * @param {String} name
     * @param {String=} domain
     * @param {String=} type
     * @param {String=} trxId
     * @return {Transaction}
     */
    this.startTransaction = function(name, domain, type, trxId){
        var trx;

        trxId = trxId || require('node-uuid').v4();

        trx = new Transaction({
            trxId: trxId,
            requestId: currentRequestId++,
            name: name,
            domain: domain || 'INTERFACE',
            type: type || 'SERVICE'
        }, logPath);

        trx.start();

        return trx;
    };
};

util.inherits(TransactionLogger, ProcessLogger);

module.exports = new TransactionLogger();
module.exports.TransactionLogger = TransactionLogger;

