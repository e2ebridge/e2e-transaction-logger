/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

exports.startEnd = function(test){
    test.expect(16);

    var logger = require('./../../../lib/logger');
    var Transaction = require('./../../../lib/transaction').Transaction;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'trxName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'trxDomain');
            test.equals(entry.logType, 'trxType_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
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

    var transaction = new Transaction({
        trxId: 'trxId1',
        requestId: 1,
        name: 'trxName',
        domain: 'trxDomain',
        type: 'trxType'
    },logPath);

    transaction.start();

    transaction.end('OK');

    done();
};

exports.IO = function(test){
    test.expect(32);

    var logger = require('./../../../lib/logger');
    var Transaction = require('./../../../lib/transaction').Transaction;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'trxName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'trxDomain');
            test.equals(entry.logType, 'trxType_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'ioName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'ioDomain');
            test.equals(entry.logType, 'IO_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, 'ioSystem');
        }

        if(logEntryCalls === 2){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'ioName');
            test.equals(entry.state, 'ERROR');
            test.equals(entry.domain, 'ioDomain');
            test.equals(entry.logType, 'IO_EXIT');
            test.equals(entry.param1, null);
            test.equals(entry.param2, 'ioSystem');
        }

        if(logEntryCalls === 3){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'trxName');
            test.equals(entry.state, 'ERROR');
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

    var transaction = new Transaction({
        trxId: 'trxId1',
        requestId: 1,
        name: 'trxName',
        domain: 'trxDomain',
        type: 'trxType'
    },logPath);

    transaction.start();

    var io = transaction.startIO('ioName','ioDomain','ioSystem');

    io.end('ERROR');

    transaction.end('ERROR');

    done();
};