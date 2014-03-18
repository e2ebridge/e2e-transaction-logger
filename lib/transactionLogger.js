/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var util = require('util');

var ProcessLogger = require('./processLogger').ProcessLogger;

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
     * @param {String} domain
     * @param {String} type
     * @param {String=} trxId
     * @return {Transaction}
     */
    this.startTransaction = function(name, domain, type, trxId){

    };
};

util.inherits(TransactionLogger, ProcessLogger);

module.exports = new TransactionLogger();
module.exports.TransactionLogger = TransactionLogger;

