/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";


exports.logEntry = function(test){
    test.expect(3);

    var logger = require('./../../../lib/logger');
    var fs = require('fs-extra');
    var path = require('path');

    var logPath = path.resolve(__dirname,'../resource/logger/logs');
    var filePath = path.resolve(logPath,logger.getFilename());

    fs.removeSync(logPath);

    logger.logEntry(logPath,{
        datetime: new Date('2014-03-18 08:37:01'),
        trxId: 'trxId',
        requestId: 1,
        name: 'testName',
        elapsedTime: 10,
        state: 'OK',
        domain: 'testDomain',
        logType: 'test_ENTER',
        param1: 'param1',
        param2: 'param2'
    },function(){

        test.equals(fs.readFileSync(filePath).toString(),
            '2014-03-18\t08:37:01\t+0100\ttrxId\t1\ttestName\t10\tOK\ttestDomain\ttest_ENTER\tparam1\tparam2\n');

        fs.removeSync(logPath);

        logger.logEntry(logPath,{
            datetime: new Date('2014-03-18 08:37:01'),
            trxId: 'trxId',
            requestId: 1,
            name: 'testName',
            elapsedTime: 10,
            state: true,
            domain: 'testDomain',
            logType: 'test_ENTER',
            param1: 'param1',
            param2: 'param2'
        },function(){

            test.equals(fs.readFileSync(filePath).toString(),
                '2014-03-18\t08:37:01\t+0100\ttrxId\t1\ttestName\t10\tOK\ttestDomain\ttest_ENTER\tparam1\tparam2\n');

            fs.removeSync(logPath);

            logger.logEntry(logPath,{
                datetime: new Date('2014-03-18 08:37:01'),
                trxId: 'trxId',
                requestId: 1,
                name: 'testName',
                elapsedTime: 10,
                state: false,
                domain: 'testDomain',
                logType: 'test_ENTER',
                param1: 'param1',
                param2: 'param2'
            },function(){

                test.equals(fs.readFileSync(filePath).toString(),
                    '2014-03-18\t08:37:01\t+0100\ttrxId\t1\ttestName\t10\tERROR\ttestDomain\ttest_ENTER\tparam1\tparam2\n');

                fs.removeSync(logPath);

                test.done();
            });
        });
    });
};