# E2E transaction logger #


Having structured logs of running services is always important in productions. E2E transactions log files contains all information about the interaction of your server. Separated in transactions which represent the client calls (http) and io calls which represent the back end calls made by your server (DB, file system ...).

In another level you can also trace business processes using the same library in the same files which allow to relate the business data level with the service level.

These files can then be parsed and loaded in DB to be used in Dashboards showing good system, operating and business views and report of your services.


## Quick Example

	var http = require('http');
	var transactionLogger = require('e2e-transaction-logger');

	// create an http server
	http.createServer(function (req, res) {
	
	    // start the transaction when a request arrives
	    var trx = transactionLogger.startTransaction('Hello World');
	
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Hello World\n');
	
	    // end the transaction when the response is sent
	    trx.end('OK');
	
	}).listen(3000, '127.0.0.1');
	


## Download

    npm install async

## Documentation

### TransactionLogger

A transaction logger allow to start transactions.

#### constructor(logPath)

You can create your own transaction logger using the constructor.

__Arguments__

* logPath - The path where the log files will be written.

__Example__

	var transactionLogger = require('e2e-transaction-logger');

	var myTransactionLogger = new transactionLogger('my/custom/log/path');

---

#### startTransaction(name)

Start a transaction and return a Transaction object.

__Arguments__

* name - The name of the transaction

__Example__

	var trx = transactionLogger.stratTransaction('MyTransaction');

---

### processLogger

An object of type ProcessLogger.

### ProcessLogger

A process logger allow to trace processes.

__Example__

	transactionLogger.processLogger.processStart('ProcessName', 'processId', 'StartEventName');

---

#### constructor(logPath)

You can create your own process logger using the constructor.

__Arguments__

* logPath - The path where the log files will be written.

__Example__

	var myProcessLogger = new transactionLogger.ProcessLogger('my/custom/log/path');

---

#### processStart(processName, processId, eventName)

Trace the start of a process.

__Arguments__

* processName - The name of the process
* processId - The process id.
* eventName - The start event name.

__Example__

	processLogger.processStart('ProcessName', 'processId', 'StartEventName');

---

#### processEnd(processName, processId, eventName)

Trace the end of a process.

__Arguments__

* processName - The name of the process
* processId - The process id.
* eventName - The end event name.

__Example__

	processLogger.processEnd('ProcessName', 'processId', 'EndEventName');

---

#### processStateStart(processName, processId, stateName)

Trace the start of a state.

__Arguments__

* processName - The name of the process
* processId - The process id.
* stateName - The state name.

__Example__

	processLogger.processStateStart('ProcessName', 'processId', 'StateName');

---

#### processStateEnd(processName, processId, stateName)

Trace the end of a state.

__Arguments__

* processName - The name of the process
* processId - The process id.
* stateName - The state name.

__Example__

	processLogger.processStateEnd('ProcessName', 'processId', 'StateName');

---

#### processChoice(processName, processId, gateway, choice)

Trace a choice.

__Arguments__

* processName - The name of the process
* processId - The process id.
* gateway - The gateway name.
* choice - The choice name.

__Example__

	processLogger.processChoice('ProcessName', 'processId', 'Gateway', 'Choice');

---

#### processEvent(processName, processId, eventName)

Trace an event.

__Arguments__

* processName - The name of the process
* processId - The process id.
* eventName - The gateway name.

__Example__

	processLogger.processEvent('ProcessName', 'processId', 'EventName');

---

#### processValueString(processName, processId,  key, value)

Trace a value in a String type.

__Arguments__

* processName - The name of the process
* processId - The process id.
* key - The key.
* value - The value.

__Example__

	processLogger.processValueString('ProcessName', 'processId', 'Key', 'MyValue');

---

#### processValueFloat(processName, processId,  key, value)

Trace a value in a Float type.

__Arguments__

* processName - The name of the process
* processId - The process id.
* key - The key.
* value - The value.

__Example__

	processLogger.processValueString('ProcessName', 'processId', 'Key', 123.456);

---

#### processValueDateTime(processName, processId,  key, value)

Trace a value in a Date type.

__Arguments__

* processName - The name of the process
* processId - The process id.
* key - The key.
* value - The value.

__Example__

	processLogger.processValueDateTime('ProcessName', 'processId', 'Key', new Date());

---

### Transaction

A Transaction object is return by the startTransaction method of a transaction logger. It is then used to trace what happen inside a the transaction using startIO or any ProcessLogger method. Using a transactions to trace a process instead of directly a ProcessLogger allow you to link the process steps to the transactions and ios of these transactions.

