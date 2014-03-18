/**
 * Author: cschmitt
 * Copyright: E2E Technologies Ltd
 */
"use strict";

/**
 * Create a process logger.
 * @param {String=} logPath
 * @param {Number=} requestId
 * @param {Date=} startDate
 * @constructor
 */
var ProcessLogger = function(logPath, requestId, startDate){

    this.startDate = startDate;

    /**
     * Start a process. Do the trace.
     * @param {String} processName
     * @param {String} processId
     */
    this.processStart = function(processName, processId){

    };

    /**
     * End a process. Do the trace.
     * @param {String} processName
     * @param {String} processId
     */
    this.processEnd = function(processName, processId){

    };

    /**
     * Start a process state. Do the trace.
     * @param {String} processName
     * @param {String} processId
     * @param {String} stateName
     */
    this.processStateStart = function(processName, processId, stateName){

    };

    /**
     * End a process state. Do the trace.
     * @param {String} processName
     * @param {String} processId
     * @param {String} stateName
     */
    this.processStateEnd = function(processName, processId, state){

    };

    /**
     * Trace a process choice.
     * @param {String} processName
     * @param {String} processId
     * @param {String} gateway
     * @param {String} choice
     */
    this.processChoice = function(processName, processId, gateway, choice){

    };

    /**
     * Trace a process event.
     * @param {String} processName
     * @param {String} processId
     * @param {String} event
     */
    this.processEvent = function(processName, processId, event){

    };

    /**
     * Trace a process string value.
     * @param {String} processName
     * @param {String} processId
     * @param {String} key
     * @param {String} value
     */
    this.processValueString = function(processName, processId, key, value){

    };

    /**
     * Trace a process float value.
     * @param {String} processName
     * @param {String} processId
     * @param {String} key
     * @param {Number} value
     */
    this.processValueFloat = function(processName, processId, key, value){

    };

    /**
     * Trace a process datetime value.
     * @param {String} processName
     * @param {String} processId
     * @param {String} key
     * @param {Date} value
     */
    this.processValueDateTime = function(processName, processId, key, value){

    };

};

module.exports = new ProcessLogger();
module.exports.ProcessLogger = ProcessLogger;