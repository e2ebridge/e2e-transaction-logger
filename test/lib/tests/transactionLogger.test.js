/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

exports.startTrx = function(test){
    test.expect(14);

    var logger = require('./../../../lib/logger');
    var TransactionLogger = require('./../../../lib/transactionLogger').TransactionLogger;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0, trxId, requestId;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            trxId = entry.trxId;
            requestId = entry.requestId;
            test.equals(entry.name, 'trxName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'trxDomain');
            test.equals(entry.logType, 'trxType_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, trxId);
            test.equals(entry.requestId, requestId);
            test.equals(entry.name, 'trxName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'trxDomain');
            test.equals(entry.logType, 'trxType_EXIT');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        logEntryCalls++;
    };

    var done = function(){
        logger.logEntry = logger_logEntry;

        test.done();
    };

    //// test

    var logPath = 'logPath';

    var transactionLogger = new TransactionLogger(logPath);

    var trx = transactionLogger.startTransaction('trxName','trxDomain','trxType');
    trx.end('OK');

    done();
};