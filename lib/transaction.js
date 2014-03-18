/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var util = require('util');

var ProcessLogger = require('./processLogger').ProcessLogger;

/**
 * Create a Transaction
 * @param {Object} data
 *  @param {String} data.trxId
 *  @param {Number} data.requestId
 *  @param {String} data.name
 *  @param {String} data.domain
 *  @param {String} data.type
 * @param {String} logPath
 * @constructor
 */
var Transaction = function(data, logPath){
    var startDate = new Date();
    ProcessLogger.call(this, logPath, data.requestId, startDate);

    /**
     * Start the transaction. Do the trace.
     */
    this.start = function(){

    };

    /**
     * End the transaction. Do the trace.
     * @param {String|Boolean} state 'OK' or true means success. Everything else means fail.
     */
    this.end = function(state){

    };

    /**
     * Start an IO call.
     * @param {String} name
     * @param {String} domain
     * @param {String} system
     * @return {IO}
     */
    this.startIO = function(name, domain, system){

    };

};

util.inherits(Transaction, ProcessLogger);

exports.Transaction = Transaction;