/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

exports.defaultDef = function(test){
    test.expect(14);

    var logger = require('./../../../lib/logger');
    var transactionLoggerMiddleware = require('./../../../lib/middleware').transactionLogger;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0, trxId, requestId;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            trxId = entry.trxId;
            requestId = entry.requestId;
            test.equals(entry.name, 'GET /index.html');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'INTERFACE');
            test.equals(entry.logType, 'SERVICE_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, trxId);
            test.equals(entry.requestId, requestId);
            test.equals(entry.name, 'GET /index.html');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'INTERFACE');
            test.equals(entry.logType, 'SERVICE_EXIT');
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

    var middleware = transactionLoggerMiddleware({
        logPath: logPath
    });

    var req = {
        url: '/index.html',
        method: 'GET'
    };
    var res = {
        end: function(){
            process.nextTick(done);
        }
    };

    var next = function(){
        res.end();
    };

    middleware(req, res, next);
};

exports.staticDef = function(test){
    test.expect(15);

    var logger = require('./../../../lib/logger');
    var transactionLoggerMiddleware = require('./../../../lib/middleware').transactionLogger;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0, trxId, requestId;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            trxId = entry.trxId;
            requestId = entry.requestId;
            test.equals(entry.trxId, 'StaticTrxId');
            test.equals(entry.name, 'StaticName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'StaticDomain');
            test.equals(entry.logType, 'StaticType_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, trxId);
            test.equals(entry.requestId, requestId);
            test.equals(entry.name, 'StaticName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'StaticDomain');
            test.equals(entry.logType, 'StaticType_EXIT');
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

    var middleware = transactionLoggerMiddleware({
        logPath: logPath,
        trxId: 'StaticTrxId',
        name: 'StaticName',
        domain: 'StaticDomain',
        type: 'StaticType'
    });

    var req = {
        url: '/index.html',
        method: 'GET'
    };
    var res = {
        end: function(){
            process.nextTick(done);
        }
    };

    var next = function(){
        res.end();
    };

    middleware(req, res, next);
};

exports.dynamicDef = function(test){
    test.expect(15);

    var logger = require('./../../../lib/logger');
    var transactionLoggerMiddleware = require('./../../../lib/middleware').transactionLogger;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0, trxId, requestId;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            trxId = entry.trxId;
            requestId = entry.requestId;
            test.equals(entry.trxId, 'DynamicTrxId');
            test.equals(entry.name, 'DynamicName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'DynamicDomain');
            test.equals(entry.logType, 'DynamicType_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, null);
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, trxId);
            test.equals(entry.requestId, requestId);
            test.equals(entry.name, 'DynamicName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'DynamicDomain');
            test.equals(entry.logType, 'DynamicType_EXIT');
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

    var middleware = transactionLoggerMiddleware({
        logPath: logPath,
        trxId: function(){return 'DynamicTrxId';},
        name: function(){return 'DynamicName';},
        domain: function(){return 'DynamicDomain';},
        type: function(){return 'DynamicType';}
    });

    var req = {
        url: '/index.html',
        method: 'GET'
    };
    var res = {
        end: function(){
            process.nextTick(done);
        }
    };

    var next = function(){
        res.end();
    };

    middleware(req, res, next);
};