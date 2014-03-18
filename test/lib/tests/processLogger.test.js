/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

exports.startTrx = function(test){
    test.expect(54);

    var logger = require('./../../../lib/logger');
    var ProcessLogger = require('./../../../lib/processLogger').ProcessLogger;

    //// mockup
    var logger_logEntry = logger.logEntry;
    var logEntryCalls = 0;
    logger.logEntry = function(logPath, entry){

        if(logEntryCalls === 0){
            test.equals(entry.name, 'Process Start');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_START');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'StartEvent');
        }

        if(logEntryCalls === 1){
            test.equals(entry.name, 'Process State Start');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_STATE_START');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'State');
        }

        if(logEntryCalls === 2){
            test.equals(entry.name, 'Process State End');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_STATE_END');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'State');
        }

        if(logEntryCalls === 3){
            test.equals(entry.name, 'Process Choice');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_CHOICE');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'Gateway::Choice');
        }

        if(logEntryCalls === 4){
            test.equals(entry.name, 'Process Event');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_EVENT');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'Event');
        }

        if(logEntryCalls === 5){
            test.equals(entry.name, 'Process String');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_STRING');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'Key::String');
        }

        if(logEntryCalls === 6){
            test.equals(entry.name, 'Process Float');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_FLOAT');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'Key::123.456');
        }

        if(logEntryCalls === 7){
            test.equals(entry.name, 'Process Datetime');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_DATETIME');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'Key::13255185645');
        }

        if(logEntryCalls === 8){
            test.equals(entry.name, 'Process End');
            test.equals(entry.state, 'OK');
            test.equals(entry.domain, 'PROCESS_END');
            test.equals(entry.logType, 'CUSTOM');
            test.equals(entry.param1, 'processName::processId');
            test.equals(entry.param2, 'EndEvent');
        }

        logEntryCalls++;
    };

    var done = function(){
        logger.logEntry = logger_logEntry;

        test.done();
    };

    //// test

    var logPath = 'logPath';

    var processLogger = new ProcessLogger(logPath);

    processLogger.processStart('processName','processId','StartEvent');
    processLogger.processStateStart('processName','processId','State');
    processLogger.processStateEnd('processName','processId','State');
    processLogger.processChoice('processName','processId','Gateway','Choice');
    processLogger.processEvent('processName','processId','Event');
    processLogger.processValueString('processName','processId','Key','String');
    processLogger.processValueFloat('processName','processId','Key',123.456);
    processLogger.processValueDateTime('processName','processId','Key',new Date(13255185645000));
    processLogger.processEnd('processName','processId','EndEvent');

    done();
};