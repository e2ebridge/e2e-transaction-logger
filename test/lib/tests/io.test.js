/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

exports.startEnd = function(test){
    test.expect(16);

    var logger = require('./../../../lib/logger');
    var IO = require('./../../../lib/io').IO;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'ioName');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'ioDomain');
            test.equals(entry.logType, 'IO_ENTER');
            test.equals(entry.param1, null);
            test.equals(entry.param2, 'ioSystem');
        }

        if(logEntryCalls === 1){
            test.equals(entry.trxId, 'trxId1');
            test.equals(entry.requestId, 1);
            test.equals(entry.name, 'ioName');
            test.equals(entry.state, 'ERROR');
            test.equals(entry.domain, 'ioDomain');
            test.equals(entry.logType, 'IO_EXIT');
            test.equals(entry.param1, null);
            test.equals(entry.param2, 'ioSystem');
        }

        logEntryCalls++;
    };

    var done = function(){
        logger.logEntry = logger_logEntry;

        test.done();
    };

    //// test

    var logPath = 'logPath';

    var io = new IO({
        trxId: 'trxId1',
        requestId: 1,
        trxStartDate: new Date(),
        name: 'ioName',
        domain: 'ioDomain',
        system: 'ioSystem'
    },logPath);

    io.start();

    io.end('ERROR');

    done();
};