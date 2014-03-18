/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

var path = require('path');
var fs = require('fs-extra');

var getDate = function(date){
    return ('0000'+date.getFullYear()).slice(-4) + '-' +
        ('00'+(date.getMonth()+1)).slice(-2) + '-' +
        ('00'+date.getDate()).slice(-2);
};

var getTime = function(date){
    return ('00'+date.getHours()).slice(-2) + ':' +
        ('00'+date.getMinutes()).slice(-2) + ':' +
        ('00'+date.getSeconds()).slice(-2);
};

var getTimezone = function(date){
    var timezoneOffset = date.getTimezoneOffset();
    var hours = Math.floor(Math.abs(timezoneOffset) / 60);
    var min = Math.abs(timezoneOffset) - hours * 60;

    return ((timezoneOffset > 0) ? '-' : '+') +
        ('00'+hours).slice(-2) +
        ('00'+min).slice(-2);

};

var getFilename = exports.getFilename = function(){
    var date = new Date();
    return 'transaction_' + getDate(date) + '.log';
};


/**
 * write the transaction log entry
 * @param {String} logPath
 * @param {Object} entry
 *   @param {Date} entry.datetime
 *   @param {String} entry.trxId
 *   @param {Number} entry.requestId
 *   @param {String} entry.name
 *   @param {Number} entry.elapsedTime
 *   @param {String|Boolean} entry.state
 *   @param {String} entry.domain
 *   @param {String} entry.logType
 *   @param {String=} entry.param1
 *   @param {String=} entry.param2
 * @param {Function=} callback
 */
exports.logEntry = function(logPath, entry, callback){
    var filename = getFilename();
    var fullName = path.resolve(logPath || './logs', filename);
    var data = getDate(entry.datetime) + '\t' +
            getTime(entry.datetime) + '\t' +
            getTimezone(entry.datetime) + '\t' +
            entry.trxId + '\t' +
            entry.requestId + '\t' +
            entry.name + '\t' +
            entry.elapsedTime + '\t' +
            ((entry.state === 'OK' || entry.state === true) ? 'OK' : 'ERROR') + '\t' +
            entry.domain + '\t' +
            entry.logType + '\t' +
            (entry.param1 || '') + '\t' +
            (entry.param2 || '') + '\n';

    if(typeof callback !== 'function'){
        callback = function(){};
    }

    fs.createFile(fullName,function(err){

        if(err){
            callback(err);
            return;
        }

        fs.appendFile(fullName, data, callback);
    });
};
