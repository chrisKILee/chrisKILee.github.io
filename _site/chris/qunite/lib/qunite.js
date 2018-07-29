//https://members.wholesaleappcommunity.com/redmine/projects/wrtcompliance/wiki/QUnite

(function(window) 
    {
        var Q = 
        {
            doc: window.document,
            config: {},
            display: {},
            defaultTimeout: 5000,
            trace: true,
            hasBackgroundSupport: true,
            state: {
                username:"unknown",
                testtoken:"",
                suiteName:"",
                widgetId:"wac-545",
                userAgent: navigator.userAgent,
                paused: false,
                hasLocalStorage: false,
                hasWidgetPreferences: false,
                hostname: null,
                release: null,
                tests: null,
                currentIndex: -1,
                currentModule:"",
                stats: {
                    passedOverall: null,
                    tAll: 0,
                    tRan: 0,
                    tGood: 0,
                    tBad: 0,
                    aAll:0,
                    aGood:0,
                    aBad:0,
                    aExpected:0,
                    started:null,
                    finished:null
                },
                results: [],
                result: null,
                // result:{
                    // module: null,
                    // name: null,
                    // description: null,
                    // stage: 0,
                    // stats: {
                        // passed: null,
                        // aAll: 0,
                        // aBad: 0,
                        // aGood:0,
                        // aExpected:0,
                        // started:null,
                        // finished:null
                    // }
                // },
                log : []
            },
            
asyncFun: function(name, callback) {
    Q.fun(name, callback, true);
},

fun: function (name, callback, async){
    synchronize(function() {
        Q.config.infun = true;

        if ( async ) {
            Q.stopQueueProcessor();
        }

        try{
            callback.call();
        }catch(e) {
            FAIL("function  " + name + " died, exception and test follows", e, callback);

            // Restart the tests if they're blocking
            if ( Q.config.blocking )
            {
                Q.config.infun = false;
                startQueueProcessor();
            }
        }

        if(! Q.config.blocking){
            Q.config.infun = false;
        }
    }, null);
},

asyncTest: function(name, description, expected, callback)
{
   if ( arguments.length === 2 )
   {
       callback = expected;
       expected = 0;
   }

   Q.test(name, description, expected, callback, true);
},

test: function(name, testDescription, expected, callback, async, setupCallback, teardownCallback, timeout)
{
    Q.state.result.name = name;
    Q.state.result.description = testDescription;
    Q.state.result.async = async;
    Q.state.result.timeout = timeout;
    Q.displaySummary();

    if ( arguments.length === 2 ) {
        callback = expected;
        expected = null;
    }

    if ( expected && typeof expected === 'object') {
        expected = null;
    }

    if ( Q.config.currentModule ) {
        name = Q.config.currentModule + " module: " + name;
    }

    if ( !validTest(name) ) {
        return;
    }

    Q.writeTestStart(name, testDescription);

    // Q.config.queue = [];
    // setup may be asynchronous
    synchronize(function() {
        Q.config.intest = true;
        Q.config.testStage = "setup";
        Q.state.result.stats.aGood = 0;
        Q.state.result.stats.aBad = 0;

        Q.state.result.stats.aExpected = expected;
        Q.config.intest = true;

        try{
            if ( !Q.config.pollution ) {
                saveGlobal();
            }

            if(typeof setupCallback == "function"){
                setupCallback.call(this);
            }

        } catch(e) {
            Q.assert( false, "Setup failed on " + name + ": " + e.message );
        }
    });

    // the test may be asynchronouse
    synchronize(function() {
        Q.config.intest = true;
        Q.config.testStage = "test";
      
        if ( async )
        {
            Q.stopQueueProcessor();
      
            if(timeout > 0) {
                Q.setAbortTimeout(timeout);
            }
        }

        try {
            if(typeof callback == "function") {
                callback.call(null, document.getElementById('test'));
            }
            // callback.call(this, document.getElementById('test'));
        } catch(e) {
            FAIL("Test " + name + " died, exception and test follows", e, callback);
            Q.assert( false, "Died on test #" + (Q.state.result.stats.aAll + 1) + ": " + e.message );
            // else next test will carry the responsibility
            saveGlobal();

            // Restart the tests if they're blocking
            if ( Q.config.blocking ) {
                startQueueProcessor();
                Q.config.intest = false;
            }
        }
    });

    // teardown may be asynchronous
    synchronize(function() {
        Q.config.intest = true;
        Q.config.testStage = "teardown";

        try {
            checkPollution();
            if(typeof teardownCallback == "function")
            {
                teardownCallback.call(this);
            }

            var bucket = document.getElementById('testdiv');
            var iframe = document.getElementById('testiframe');
    
            if(iframe) {
                bucket.removeChild(iframe);
            }

        } catch(e) {
            Q.assert( false, "Teardown failed on " + name + ": " + e.message );
        }
    });

    synchronize(function() {
        if ( Q.state.result.stats.aExpected && Q.state.result.stats.aExpected != Q.state.result.stats.aAll ) {
            Q.assert( false, "Expected " + Q.state.result.stats.aExpected + " assertions, but " + Q.state.result.stats.aAll + " were run" );
        }

        Q.config.intest = false;
    });

    synchronize( done, null );
}, // end of test()

	  /**
	   * Specify the number of expected assertions to gurantee that failed test
	   * (no assertions are run at all) don't slip through.
	   */
expect: function(asserts) {
			Q.state.result.stats.aExpected = asserts;
		},
		/**
		 * Asserts true.
		 *
		 * @example assert( "asdfasdf".length > 5, "There must be at least 5 chars" );
		 */
assert: function(a, msg) {
			Q.state.result.stats.aAll++;
			Q.state.stats.aAll++;

			if(a) {
				Q.state.result.stats.aGood++;
				Q.state.stats.aGood++;
			} else {
				Q.state.result.stats.aBad++;
				Q.state.stats.aBad++;
			}

			Q.trace(msg, "a", true, a);
		},
pass: function(msg){
		  Q.assert(true, msg);
	  },
fail: function(msg){
		  Q.assert(false, msg);
	  },

	  /**
	   * Checks that the first two arguments are equal, with an optional message.
	   * Prints out both actual and expected values.
	   *
	   * Prefered to ok( actual == expected, message )
	   *
	   * @example equal( format("Received {0} bytes.", 2), "Received 2 bytes." );
	   *
	   * @param Object
	   *            actual
	   * @param Object
	   *            expected
	   * @param String
	   *            message (optional)
	   */
equal: function(actual, expected, message) {
		   push(expected == actual, actual, expected, message);
	   },

notEqual: function(actual, expected, message) {
			  push(expected != actual, actual, expected, message);
		  },

deepEqual: function(a, b, message) {
			   push(Q.equiv(a, b), a, b, message);
		   },

notDeepEqual: function(a, b, message) {
				  push(!Q.equiv(a, b), a, b, message);
			  },

strictEqual: function(actual, expected, message) {
				 push(expected === actual, actual, expected, message);
			 },

notStrictEqual: function(actual, expected, message) {
					push(expected !== actual, actual, expected, message);
				},

startQueueProcessor: function() {
						 if ( window.setTimeout ) {
							 window.setTimeout(function() {
									 if ( Q.config.timeout ) {
									 clearTimeout(Q.config.timeout);
									 }

									 if(Q.config.infun){
									 Q.config.infun = false;
									 }
									 if(Q.config.intest){
									 Q.config.intest = false;
									 }

									 Q.config.blocking = false;
									 process();
									 }, 13);
						 } else {
							 if(Q.config.infun){
								 Q.config.infun = false;
							 }
							 if(Q.config.intest){
								 Q.config.intest = false;
							 }
							 Q.config.blocking = false;
							 process();
						 }
					 },

stopQueueProcessor: function(timeout) {
						if(! Q.config.intest){
							Q.config.infun = true;
						}
						Q.config.blocking = true;

						if ( timeout && window.setTimeout ) {
							Q.config.timeout = window.setTimeout(function() {
									if(Q.config.intest){
									Q.assert( false, "Test timed out" );
									} else {
									trace("Async function timed out", true);
									}
									Q.startQueueProcessor();
									}, timeout);
						}
					},

					/**
					 * Trigger an event on an element.
					 *
					 * @example triggerEvent( Q.display.doc.body, "click" );
					 *
					 * @param DOMElement
					 *            elem
					 * @param String
					 *            type
					 */
triggerEvent: function( elem, type, event ) {
				  if ( Q.display.doc.createEvent ) {
					  event = Q.display.doc.createEvent("MouseEvents");
					  event.initMouseEvent(type, true, true, elem.ownerDocument.defaultView,
							  0, 0, 0, 0, 0, false, false, false, false, 0, null);
					  elem.dispatchEvent( event );

				  } else if ( elem.fireEvent ) {
					  elem.fireEvent("on"+type);
				  }
			  },

			  // Safe object type checking
is: function( type, obj ) {
		return Object.prototype.toString.call( obj ) === "[object "+ type +"]";
	},

trace: function (msg, type, assertion, result, addToTest){
		   var currentModule = Q.config.currentModule,
		   testStage = Q.config.testStage,
		   intest = Q.config.intest || addToTest,
		   time = new Date();

		   var logEntryType = assertion? "a" : "i";
		   var logEntry = {
time: time.getTime(),
	  type: logEntryType,
	  msg: msg,
	  result: result,
	  module: Q.state.currentModule};

		   if(intest) {
			   Q.state.result.log.push(logEntry);
		   } else {
			   Q.state.log.push(logEntry);
		   }

		   // msg = testStage + ":" + msg;
		   if(!isDefined(type)){
			   type = "i";
		   }

		   if(! assertion){
			   assertion = false;
		   }

		   if(! isDefined(result)){
			   result = null;
		   }

		   if(intest == false && assertion) {
			   alert("ERROR: Q.testFinished() was called before the test actually finished");
		   }

		   if(intest){
			   Q.displayTest(Q.state.currentIndex, Q.state.result);
			   var testIndex = Q.state.currentIndex;
			   var b =  document.getElementById("b_" + (testIndex + 1));
			   var next = b.nextSibling;
			   next.style.display = "block";
		   } else {
			   var tests = Q.display.tests;
			   if ( tests ) {
				   var b = Q.display.doc.createElement("strong");

				   if( "" + currentModule === "undefined"){
					   b.innerHTML = " <b style='color:black;'> # " + formatTime(time) + " " + msg +"</b>";
				   } else {
					   b.innerHTML = " <b style='color:black;'> # " + formatTime(time) + " " + currentModule + " " +msg +"</b>";
				   }
				   var li = Q.display.doc.createElement("li");
				   li.className = "trace";
				   li.appendChild( b );
				   tests.appendChild( li );
			   }
		   }
	   },
formatTime: function (date){
				if(typeof date == "number") {
					date = new Date(date);
				}

				var hour = date.getHours();
				var min = date.getMinutes();
				var sec = date.getSeconds();
				var msec = date.getMilliseconds();

				return ("" + leftpad(hour, "00", 2) + ":" + leftpad(min, "00", 2) + ":"  + leftpad(sec, "00", 2) + "." + msec);
			},
leftpad: function(str, strleft, ccount){
			 var s = strleft + str;
			 var len = s.length;
			 return (s.slice( len - ccount, len));
		 },
		 // Logging callbacks
done: function(failures, total) {},
	isNotNull: function(value) {
		return value !==null;
	},
assertNotNull: function(value, msg){
				   Q.assert(isNotNull(value), msg);
			   },
isArray: function(value){
			 return isDefined(value['length']);
		 },
isFunction: function(value){
				return typeof value === 'function';
			},
isNumber: function(value){
			  return typeof value === 'number';
		  },
isString: function(value){
			  return typeof value === 'string';
		  },
isNull: function(value) {
			return value === null;
		},
isDefined: function(value){
			   return typeof value !== 'undefined';
		   },
assertError: function(callback, msg){
				 Q.assert(throwsError(callback), msg);
			 },
testFinished: function() {
				  startQueueProcessor();
			  },
logError: function(message){
			  trace(message, 'e');
		  },
logWarning: function(message){
				trace(message, 'w');
			},
logInfo: function(message){
			 trace(message, 'i');
		 },
isObject: function(o){
			  return typeof o === 'object';
		  },
isPlainObject: function(o){
				   return isNotNull(o) && isObject(o);
			   },
isEqual: function(a, b) {
			 return(a == b);
		 },
isNotEqual: function(a, b) {
				return(a != b);
			},
isDeepEqual: function(a, b) {
				 return(equiv(a, b));
			 },
isNotDeepEqual: function(a, b) {
					return(! equiv(a, b));
				},
isStrictEqual: function(a, b) {
				   return(a === b);
			   },
isNotStrictEqual: function(a, b) {
					  return(a !== b);
				  },
arrayContains: function(array, elem) {
				   for (var i in array) {
					   if(isDeepEqual(array[i], elem)){
						   return true;
					   }
				   }
				   return false;
			   },
isDate: function(d) {
			return d && Object.prototype.toString.call(d)=="[object Date]";
		}
}; // end of Q definition

// Backwards compatibility, deprecated
Q.equals = Q.equal;
Q.same = Q.deepEqual;

// new aliases
Q.addTest=Q.test;
Q.addAsyncTest=Q.asyncTest;
Q.assertEqual = Q.equal;
Q.assertNotEqual = Q.notEqual;
Q.assertDeepEqual = Q.deepEqual;
Q.assertNotDeepEqual = Q.notDeepEqual;
Q.assertStrictEqual = Q.strictEqual;
Q.assertNotStrictEqual = Q.notStrictEqual;

// Maintain internal state
Q.config = {
	// The queue of tests to run
    queue: [],

	   // block until doc ready
	   blocking: true
};


Q.queryParams = (function() {
		var queryParams = {};
		if(top.location.search.length > 0){
		var paramsString = top.location.search.substring(1);
		var params  = paramsString.split("&");
		for(i in params) {
		var keyValue = params[i].split("=");
		var key = keyValue[0];
		var value = keyValue.length == 2? keyValue[1] : "";
		queryParams[key] = value ;
		}
		}
		return queryParams;
		})();

Q.getQueryParam = function(param){
	return Q.queryParams[param];
}


Q.debugMode = Q.getQueryParam("debug") === "" || Q.getQueryParam("debug") === "true" || top.debugMode ? true: false;

// Load paramaters
(function() {
 var location = window.location || { search: "", protocol: "file:" },
 GETParams = location.search.slice(1).split('&');

 for ( var i = 0; i < GETParams.length; i++ ) {
 GETParams[i] = decodeURIComponent( GETParams[i] );
 if ( GETParams[i] === "noglobals" ) {
 GETParams.splice( i, 1 );
 i--;
 Q.config.noglobals = true;
 } else if ( GETParams[i].search('=') > -1 ) {
 GETParams.splice( i, 1 );
 i--;
 }
 }

 // restrict modules/tests by get parameters
 Q.config.filters = GETParams;
 // Figure out if we're running the tests from a server or not
 Q.isLocal = !!(location.protocol === 'file:');
 })();

// Expose the API as global variables, unless an 'exports'
// object exists, in that case we assume we're in CommonJS
if ( typeof exports === "undefined" || typeof require === "undefined" ) {
	extend(window, Q);
	window.Q = Q;
} else {
	extend(exports, Q);
	exports.Q = Q;
}

Q.getStateAsString = function(minify) {
	var stateCopy = Q.state;

	var getMinLog = function(result){
		var minLog = [];
		for(j in result.log) {
			var logEntry = result.log[j];
			if(logEntry.type === "a" ){
				minLog.push(logEntry);
			}
		}
		return minLog;
	}

	if(minify){
		stateCopy.log = [];
		if(stateCopy.result != null) {
			stateCopy.result.description = "";
			stateCopy.result.log = getMinLog(stateCopy.result);
		}
		for(i in stateCopy.results){
			stateCopy.results[i].description = "";
			var minLog = [];
			stateCopy.results[i].log = getMinLog(stateCopy.results[i]);
		}
	}

	return JSON.stringify(stateCopy);
}

Q.abortTestRun = function() {
	Q.done = function() { Q.logInfo("testrun aborted"); };
	Q.config.aborted = true;
	Q.abortTest();
}


Q.abortTest = function(isUserRequest) {
	Q.display.testIFrame.parentNode.removeChild(Q.display.testIFrame);
	Q.display.testIFrame = null;
	Q.display.testDocument = null;
	Q.display.testWindow = null;
	Q.clearAbortTimeout();
	Q.config.intest = true;
	if(isUserRequest) {
		Q.fail("test aborted on user request");
	} else {
		Q.fail("test aborted on timeout");
	}

	Q.config.intest = false;
	Q.config.queue = [];
	done();
}

Q.setAbortTimeout = function(timeout) {
	Q.abortTimeoutId = Q.display.mainWindow.setTimeout(Q.abortTest, timeout);
}

Q.clearAbortTimeout = function(){
	if(Q.abortTimeoutId != null) {
		Q.display.mainWindow.clearTimeout(Q.abortTimeoutId);
		Q.abortTimeoutId = null;
	}
}

//Q.submitResults = function() {
//	alert(JSON.stringify((Q.state.results)));
//}

Q.init = function() {

	var pendingDebugLog = [];

	pendingDebugLog.push("in debugMode! debug messages will be shown above in reverse order");

	if(typeof top["deviceapis"] != "undefined" && typeof window["deviceapis"] == "undefined") {
		pendingDebugLog.push('top["deviceapis"] is  defined, and window["deviceapis"] is not defined, so setting setting window.deviceapis = top.deviceapis');
		window.deviceapis = top.deviceapis;
	} else {
		pendingDebugLog.push('typeof top["deviceapis"] :' + (typeof top["deviceapis"]));
		pendingDebugLog.push('typeof window["deviceapis"] :' + (typeof window["deviceapis"]));
	}

//chris
	if(typeof top["motor"] != "undefined" && typeof window["motor"] == "undefined") {
		pendingDebugLog.push('top["motor"] is  defined, and window["motor"] is not defined, so setting setting window.motor = top.motor');
		window.motor = top.motor;
	} else {
		pendingDebugLog.push('typeof top["motor"] :' + (typeof top["motor"]));
		pendingDebugLog.push('typeof window["motor"] :' + (typeof window["motor"]));
	}


	Q.config = {
            updateRate: 100,
			blocking: false,
			filters: [],
			queue: [],
			testStage: "config",
			intest: false,
			infun: false,
			aborted: false
	};
    
	Q.state.suiteName = document.title;

	try{
		if ("localStorage" in top){
			var testVariable = "testVariable";
			var testValue = "12334325435"
				top.localStorage.setItem(testVariable, testValue);
			if(top.localStorage.getItem(testVariable) == testValue) {
				top.localStorage.removeItem(testVariable);
				Q.state.hasLocalStorage = true;
			}
		}
	} catch (e){}

	try{
		if ("widget" in top && "preferences" in widget){
			var testVariable = "testVariable";
			var testValue = "12334325435"
				top.widget.preferences.setItem(testVariable, testValue);
			if(top.widget.preferences.getItem(testVariable) == testValue) {
				top.widget.preferences.removeItem(testVariable);
				Q.state.hasWidgetPreferences = true;
			}
		}
	} catch (e){}

	if(typeof window["serverName"] == "undefined"){
		Q.state.hostname =  window.location.hostname;
	} else {
		Q.state.hostname =  window["serverName"];
	}

	if(top.location.protocol == "https:") {
		Q.protocol = top.location.protocol;
	} else {
		Q.protocol = "http:";
	}

	Q.state.release = "unknown";

	if(location.pathname.indexOf("tests-trunk") > -1)  {
		Q.state.release = "trunk";
	} else {
		Q.state.release = "release-latest";
	}

	var tempDiv = document.createElement("div");
	var divObj = document.body.appendChild(tempDiv);
	divObj.innerHTML=
		'<h1 id="qunit-header">' + document.title + ' <button id="resumeButton" onclick="Q.unpause()">Resume</button> <h2 id="qunit-release"></h2><h2 id="qunit-hostname"></h2>\n</h1>\n'
		// + '<h2 id="qunit-header-filters"></h2>\n'
		// + '<h2 id="qunit-banner"></h2>\n'
		+ '<div id="qunit-testrunner-toolbar"></div>\n'
		+ '<div id="qunit-debug"></div>\n'
		//+ '<h2 id="qunit-target"></h2>\n'
		+ '<h2 id="qunit-userAgent"></h2>\n'
		+ '<h2 id="qunit-localStorage"></h2>\n'
		+ '<h2 id="qunit-widgetPreferences"></h2>\n'
		+ '<h2 id="qunit-backgroundSupport"></h2>\n'
		+ '<div id="resultsSummaryDiv">\n'
		+ '<p id="qunit-testresult"></p>\n'
		+ '<div id="submitDiv">\n'
		+ '<form id="submitForm">\n'
		+ '<p>Please enter the following details.</p>\n'
		+ 'username: <input id="username" name="username" type="text" value=""/><br/>\n'
		+ 'password: <input id="password" name="password" type="password" value=""/><br/>\n'
		+ 'testtoken: <input id="testtoken" name="text" type="text" value=""/><br/>\n'
		+ '<p>If you do not have a TCS user account, or test token,<br/> you need to access TCS (http://' + Q.state.hostname + '/tcs) through a web browser .</p>\n'
		+ '<p/>\n'
		//+ '<button id="submitButton" name="submitButton" onclick="Q.loginAndSubmitResults(); return false;">Submit Results</button>\n'
		+ '</form>\n'
		+ '<iframe id="submitFrame" name="submitFrame" width="100%" height="0" border="0" style="background:white;" scrolling="no"></iframe>'
		+ '</div>\n'
		+ '</div>\n'
		+ '<ol id="qunit-tests"></ol>\n'
		+ '<div id="testdiv"></div>\n';

	Q.display = {
tests: Q.idd("qunit-tests", document),
	   banner: Q.idd("qunit-banner", document),
	   release: Q.idd("qunit-release", document),
	   hostname: Q.idd("qunit-hostname", document),
	   debug: Q.idd("qunit-debug", document),
	   result: Q.idd("qunit-testresult", document),
	   header: Q.idd("qunit-header", document),
	   userAgent: Q.idd("qunit-userAgent", document),
	   localStorage: Q.idd("qunit-localStorage", document),
	   backgroundSupport: Q.idd("qunit-backgroundSupport", document),
	   widgetPreferences: Q.idd("qunit-widgetPreferences", document),
	   target: Q.idd("qunit-target", document),
	   toolbar: Q.idd("qunit-testrunner-toolbar", document),
	   main: Q.idd('main', document),
	   doc: window.document,
	   mainWindow: window,
	   testIFrame: null,
	   testWindow: null,
	   testDocument: null,
	   submitDiv: Q.idd("submitDiv", document),
	   submitFrame: Q.idd("submitFrame", document),
	   submitForm: Q.idd("submitForm", document),
	   resultsSummaryDiv: Q.idd("resultsSummaryDiv", document)
	}

	if(Q.debugMode) {
		Q.display.debug.style.display = "block";
		Q.display.debug.style.visibility = "visible";
	}

	for(i in pendingDebugLog) {
		Q.debug(pendingDebugLog[i]);
	}

	Q.displayUserAgent();
	Q.displayLocalStorage();
	Q.displayWidgetPreferences();
	Q.displayBackgroundSupport();
	Q.displayHostname();
	Q.displayRelease();
	Q.displayTarget();
	Q.displaySummary();

	Q.display.submitFrame.style.display = "none";
	Q.display.submitDiv.style.display = "none";

	var toolbar = Q.display.toolbar;
	if ( toolbar ) {
		toolbar.style.display = "none";

		var filter = Q.display.doc.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		filter.disabled = true;
		addEvent( filter, "click", function() {
				var li = Q.display.doc.getElementsByTagName("li");
				for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("pass") > -1 ) {
				li[i].style.display = filter.checked ? "none" : "";
				}
				}
				});
		toolbar.appendChild( filter );

		var label = Q.display.doc.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );

		var missing = Q.display.doc.createElement("input");
		missing.type = "checkbox";
		missing.id = "qunit-filter-missing";
		missing.disabled = true;
		addEvent( missing, "click", function() {
				var li = Q.display.doc.getElementsByTagName("li");
				for ( var i = 0; i < li.length; i++ ) {
				if ( li[i].className.indexOf("fail") > -1 && li[i].innerHTML.indexOf('missing test - untested code is broken code') > - 1 ) {
				li[i].parentNode.parentNode.style.display = missing.checked ? "none" : "block";
				}
				}
				});
		toolbar.appendChild( missing );

		label = Q.display.doc.createElement("label");
		label.setAttribute("for", "qunit-filter-missing");
		label.innerHTML = "Hide missing tests (untested code is broken code)";
		toolbar.appendChild( label );
	}

	var main = Q.display.main;
	if ( main ) {
		Q.config.fixture = main.innerHTML;
	}
}

addEvent(window, "load",
		function(){
		Q.init();
		if(typeof t !== "undefined") {
		Q.logInfo("running single test inline");
		Q.state.tests = ["included test"];
		Q.state.stats.tAll = 1;
		Q.state.currentIndex = 0;
		Q.state.result = {
module: "",
name: "",
stage: 0,
stats: {
passed: null,
aExpected:0,
aAll: 0,
aBad: 0,
aGood: 0
},
log:[]
}
createJObject(window);
J.loadResources = function (resources, index, testdef, prefixPath) {
	if(typeof index == "undefined") {
		index = 0;
	}
	if(index < resources.length) {
		J.getScript(prefixPath + resources[index],
				function(r){
				if(typeof extraResources != "undefined") {
				resources0 = resources.slice(0, index + 1);
				resources1 = resources.slice(index + 1);
				resources = Q.merge(resources0, extraResources);
				resources = Q.merge(resources, resources1);
				}
				extraResources = undefined;
				J.loadResources(resources, index + 1, testdef, prefixPath);
				},
				function(r) {
				J.loadResources(resources, index + 1, testdef, prefixPath);
				}
				);
	}  else {
		var async = false;
		if("async" in testdef && testdef.async==true) {
			async = true;
		}
		var timeout = (typeof testdef["timeout"] == "undefined")? Q.defaultTimeout: testdef["timeout"];
		Q.state.stats.started = (new Date()).getTime();
		Q.test(testdef.name, testdef.description, 0, testdef.fn, async, null, null, timeout);
		Q.startQueueProcessor();
	}
}
//  + '    var prefixPath = testFilePath.indexOf("/") > -1 ? testFilePath.slice(0, testFilePath.lastIndexOf("/") + 1) : "./";\n'
var prefixPath = "./";
J.loadResources(t.setup,0, t, prefixPath);
} else if(typeof tests == "undefined") {
	var msg = "ERROR: variable tests is undefined";
	//Q.logInfo(msg);
} else {
	Q.runTests(tests);
}
}
);

function done() {
	Q.state.stats.finished = Q.state.result.stats.finished = new Date().getTime();
	Q.state.result.stats.passed = (Q.state.result.stats.aBad == 0) && (Q.state.result.stats.aGood > 0);

	Q.state.stats.tRan++;
	if(Q.state.result.stats.passed){
		Q.state.stats.tGood++;
	} else {
		Q.state.stats.tBad++;
		if(Q.state.result.stats.aBad ==0 &&  Q.state.result.stats.aGood == 0 ) {
			Q.logInfo("no assertions were tested.");
		}
	}

	Q.state.results.push(Q.state.result);
	Q.state.log.push({time: new Date().getTime(), type:"t", testsIndex: Q.state.currentIndex});
	Q.state.result = null;

	Q.state.stats.passedOverall = (Q.state.stats.aBad == 0) ;

	Q.clearAbortTimeout();

	Q.displaySummary();


	Q.done( Q.state.stats.aBad, Q.state.stats.aAll );
}

function validTest( name ) {
	var i = Q.config.filters.length,
		run = false;

	if ( !i ) {
		return true;
	}

	while ( i-- ) {
		var filter = Q.config.filters[i],
			not = filter.charAt(0) == '!';

		if ( not ) {
			filter = filter.slice(1);
		}

		if ( name.indexOf(filter) !== -1 ) {
			return !not;
		}

		if ( not ) {
			run = true;
		}
	}

	return run;
}

function push(result, actual, expected, message) {
	message = message || (result ? "okay" : "failed");
	Q.assert( result, result ? message + ": " + Q.jsDump.parse(expected) : message + ", expected: " + Q.jsDump.parse(expected) + " result: " + Q.jsDump.parse(actual) );
}

function synchronize( callback, args, index ) {
	if(typeof index == "number") {
		Q.config.queue.splice(0, 0, {callback: callback, args:args});
	} else {
		Q.config.queue.push( {callback: callback, args:args});
	}
}


Q.synchronize = synchronize;

function pushTestTrace(isAssertion, msg){

}

function process() {
	var start = (new Date()).getTime();

	if( Q.config.queue.length && !Q.config.blocking) {
		if ( Q.config.updateRate <= 0 || (((new Date()).getTime() - start) < Q.config.updateRate) ) {
			var queueJob = Q.config.queue.shift();
			if(queueJob.args != null){
				queueJob.callback.apply(this, queueJob.args);
			} else {
				queueJob.callback();
			}
		}
		setTimeout( process, 13 );
	}
}


// function process() {
// var start = (new Date()).getTime();
//
// while ( Q.config.queue.length && ! Q.config.blocking) {
// if ( Q.config.updateRate <= 0 || (((new Date()).getTime() - start) <
// Q.config.updateRate) ) {
// var queueJob = Q.config.queue.shift();
// if(queueJob.args != null){
// queueJob.callback.apply(this, queueJob.args);
// } else {
// queueJob.callback();
// }
// } else {
// setTimeout( process, 13 );
// break;
// }
// }
// }

function saveGlobal() {
	Q.config.pollution = [];

	if ( Q.config.noglobals ) {
		for ( var key in window ) {
			Q.config.pollution.push( key );
		}
	}
}

function checkPollution( name ) {
	var old = Q.config.pollution;
	saveGlobal();

	var newGlobals = diff( old, Q.config.pollution );
	if ( newGlobals.length > 0 ) {
		Q.assert( false, "Introduced global variable(s): " + newGlobals.join(", ") );
		Q.state.result.stats.aExpected++;
	}

	var deletedGlobals = diff( Q.config.pollution, old );
	if ( deletedGlobals.length > 0 ) {
		Q.assert( false, "Deleted global variable(s): " + deletedGlobals.join(", ") );
		Q.state.result.stats.aExpected++;
	}
}

// returns a new Array with the elements that are in a but not in b
function diff( a, b ) {
	var result = a.slice();
	for ( var i = 0; i < result.length; i++ ) {
		for ( var j = 0; j < b.length; j++ ) {
			if ( result[i] === b[j] ) {
				result.splice(i, 1);
				i--;
				break;
			}
		}
	}
	return result;
}

function FAIL(message, exception, callback) {
	if ( typeof console !== "undefined" && console.error && console.warn ) {
		console.error(message);
		console.error(exception);
		console.warn(callback.toString());
	} else if ( window.opera && opera.postError ) {
		opera.postError(message, exception, callback.toString);
	}
}

function extend(a, b) {
	for ( var prop in b ) {
		a[prop] = b[prop];
	}

	return a;
}



function addEvent(elem, type, fn) {
	if(typeof elem['addedEvents'] == "undefined") {
		elem['addedEvents'] = {};
	}

	if ( elem.addEventListener ) {
		if(typeof elem.addedEvents[type] === "undefined"){
			elem.addedEvents[type] = [];
			elem.addedEvents[type].push(fn);
			var listener = function(){
				for(i in elem.addedEvents[type]) {
					(elem.addedEvents[type][i])();
				}
			};
			elem.addEventListener(type, listener, false);

		} else {
			elem.addedEvents[type].push(fn);
		}
	} else if ( elem.attachEvent ) {
		if(typeof elem.addedEvents[type] === "undefined"){
			elem.addedEvents[type] = [];
			elem.addedEvents[type].push(fn);
			elem.attachEvent("on" + type, function(){
					for(i in elem.addedEvents[type]) {
					(elem.addedEvents[type][i])();
					}
					});
		} else {
			elem.addedEvents[type].push(fn);
		}
	} else {
		fn();
	}
}

Q.addEvent = addEvent;

function id(name) {
	return !!(typeof Q.display.doc !== "undefined" && Q.display.doc && Q.display.doc.getElementById) && Q.display.doc.getElementById( name );
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe Rath?<prathe@gmail.com>
Q.equiv = function () {

	var innerEquiv; // the real equiv function
	var callers = []; // stack to decide between skip/abort functions
	var parents = []; // stack to avoiding loops from circular referencing


	// Determine what is o.
	function hoozit(o) {
		if (Q.is("String", o)) {
			return "string";

		} else if (Q.is("Boolean", o)) {
			return "boolean";

		} else if (Q.is("Number", o)) {

			if (isNaN(o)) {
				return "nan";
			} else {
				return "number";
			}

		} else if (typeof o === "undefined") {
			return "undefined";

			// consider: typeof null === object
		} else if (o === null) {
			return "null";

			// consider: typeof [] === object
		} else if (Q.is( "Array", o)) {
			return "array";

			// consider: typeof new Date() === object
		} else if (Q.is( "Date", o)) {
			return "date";

			// consider: /./ instanceof Object;
			// /./ instanceof RegExp;
			// typeof /./ === "function"; // => false in IE and Opera,
			// true in FF and Safari
		} else if (Q.is( "RegExp", o)) {
			return "regexp";

		} else if (typeof o === "object") {
			return "object";

		} else if (Q.is( "Function", o)) {
			return "function";
		} else {
			return undefined;
		}
	}

	// Call the o related callback with the given arguments.
	function bindCallbacks(o, callbacks, args) {
		var prop = hoozit(o);
		if (prop) {
			if (hoozit(callbacks[prop]) === "function") {
				return callbacks[prop].apply(callbacks, args);
			} else {
				return callbacks[prop]; // or undefined
			}
		}
	}

	var callbacks = function () {

		// for string, boolean, number and null
		function useStrictEquality(b, a) {
			if (b instanceof a.constructor || a instanceof b.constructor) {
				// to catch short annotaion VS 'new' annotation of a declaration
				// e.g. var i = 1;
				// var j = new Number(1);
				return a == b;
			} else {
				return a === b;
			}
		}

		return {
			"string": useStrictEquality,
				"boolean": useStrictEquality,
				"number": useStrictEquality,
				"null": useStrictEquality,
				"undefined": useStrictEquality,

				"nan": function (b) {
					return isNaN(b);
				},

				"date": function (b, a) {
					return hoozit(b) === "date" && a.valueOf() === b.valueOf();
				},

				"regexp": function (b, a) {
					return hoozit(b) === "regexp" &&
						a.source === b.source && // the regex itself
						a.global === b.global && // and its modifers (gmi) ...
						a.ignoreCase === b.ignoreCase &&
						a.multiline === b.multiline;
				},

				// - skip when the property is a method of an instance (OOP)
				// - abort otherwise,
				// initial === would have catch identical references anyway
				"function": function () {
					var caller = callers[callers.length - 1];
					return caller !== Object &&
						typeof caller !== "undefined";
				},

				"array": function (b, a) {
					var i, j, loop;
					var len;

					// b could be an object literal here
					if ( ! (hoozit(b) === "array")) {
						return false;
					}

					len = a.length;
					if (len !== b.length) { // safe and faster
						return false;
					}

					// track reference to avoid circular references
					parents.push(a);
					for (i = 0; i < len; i++) {
						loop = false;
						for(j=0;j<parents.length;j++){
							if(parents[j] === a[i]){
								loop = true;// dont rewalk array
							}
						}
						if (!loop && ! innerEquiv(a[i], b[i])) {
							parents.pop();
							return false;
						}
					}
					parents.pop();
					return true;
				},

				"object": function (b, a) {
					var i, j, loop;
					var eq = true; // unless we can proove it
					var aProperties = [], bProperties = []; // collection of strings

					// comparing constructors is more strict than using instanceof
					if ( a.constructor !== b.constructor) {
						return false;
					}

					// stack constructor before traversing properties
					callers.push(a.constructor);
					// track reference to avoid circular references
					parents.push(a);

					for (i in a) { // be strict: don't ensures hasOwnProperty and
						// go deep
						loop = false;
						for(j=0;j<parents.length;j++){
							if(parents[j] === a[i])
								loop = true; // don't go down the same path twice
						}
						aProperties.push(i); // collect a's properties

						if (!loop && ! innerEquiv(a[i], b[i])) {
							eq = false;
							break;
						}
					}

					callers.pop(); // unstack, we are done
					parents.pop();

					for (i in b) {
						bProperties.push(i); // collect b's properties
					}

					// Ensures identical properties name
					return eq && innerEquiv(aProperties.sort(), bProperties.sort());
				}
		};
	}();

	innerEquiv = function () { // can take multiple arguments
		var args = Array.prototype.slice.apply(arguments);
		if (args.length < 2) {
			return true; // end transition
		}

		return (function (a, b) {
				if (a === b) {
				return true; // catch the most you can
				} else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || hoozit(a) !== hoozit(b)) {
				return false; // don't lose time with error prone cases
				} else {
				return bindCallbacks(a, callbacks, [b, a]);
				}

				// apply transition with (1..n) arguments
				})(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
	};

	return innerEquiv;

}();

/**
 * jsDump Copyright (c) 2008 Ariel Flesler - aflesler(at)gmail(dot)com |
 * http://flesler.blogspot.com Licensed under BSD
 * (http://www.opensource.org/licenses/bsd-license.php) Date: 5/15/2008
 *
 * @projectDescription Advanced and extensible data dumping for Javascript.
 * @version 1.0.0
 * @author Ariel Flesler
 * @link {http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html}
 */
Q.jsDump = (function() {
		function quote( str ) {
		return '"' + str.toString().replace(/"/g, '\\"') + '"';
		};
		function literal( o ) {
		return o + '';
		};
		function join( pre, arr, post ) {
		var s = jsDump.separator(),
		base = jsDump.indent(),
		inner = jsDump.indent(1);
		if ( arr.join )
		arr = arr.join( ',' + s + inner );
		if ( !arr )
		return pre + post;
		return [ pre, inner + arr, base + post ].join(s);
		};
		function array( arr ) {
		var i = arr.length,    ret = Array(i);
		this.up();
		while ( i-- )
			ret[i] = this.parse( arr[i] );
		this.down();
		return join( '[', ret, ']' );
		};

		var reName = /^function (\w+)/;

		var jsDump = {
parse:function( obj, type ) { // type is used mostly internally, you
		  // can fix a (custom)type in advance
		  var    parser = this.parsers[ type || this.typeOf(obj) ];
		  type = typeof parser;

		  return type == 'function' ? parser.call( this, obj ) :
			  type == 'string' ? parser :
			  this.parsers.error;
	  },
typeOf:function( obj ) {
		   var type;
		   if ( obj === null ) {
			   type = "null";
		   } else if (typeof obj === "undefined") {
			   type = "undefined";
		   } else if (Q.is("RegExp", obj)) {
			   type = "regexp";
		   } else if (Q.is("Date", obj)) {
			   type = "date";
		   } else if (Q.is("Function", obj)) {
			   type = "function";
		   } else if (obj.setInterval && obj.document && !obj.nodeType) {
			   type = "window";
		   } else if (obj.nodeType === 9) {
			   type = "document";
		   } else if (obj.nodeType) {
			   type = "node";
		   } else if (typeof obj === "object" && typeof obj.length === "number" && obj.length >= 0) {
			   type = "array";
		   } else {
			   type = typeof obj;
		   }
		   return type;
	   },
separator:function() {
			  return this.multiline ?    this.HTML ? '<br />' : '\n' : this.HTML ? '&nbsp;' : ' ';
		  },
indent:function( extra ) {// extra can be a number, shortcut for
		   // increasing-calling-decreasing
		   if ( !this.multiline )
			   return '';
		   var chr = this.indentChar;
		   if ( this.HTML )
			   chr = chr.replace(/\t/g,'   ').replace(/ /g,'&nbsp;');
		   return Array( this._depth_ + (extra||0) ).join(chr);
	   },
up:function( a ) {
	   this._depth_ += a || 1;
   },
down:function( a ) {
		 this._depth_ -= a || 1;
	 },
setParser:function( name, parser ) {
			  this.parsers[name] = parser;
		  },
		  // The next 3 are exposed so you can use them
quote:quote,
	  literal:literal,
	  join:join,
	  //
	  _depth_: 1,
	  // This is the list of parsers, to modify them, use jsDump.setParser
	  parsers:{
window: '[Window]',
		document: '[Document]',
		error:'[ERROR]', // when no parser is found, shouldn't happen
		unknown: '[Unknown]',
		'null':'null',
		undefined:'undefined',
		'function':function( fn ) {
			var ret = 'function',
			name = 'name' in fn ? fn.name : (reName.exec(fn)||[])[1];// functions
			// never
			// have
			// name
			// in
			// IE
			if ( name )
				ret += ' ' + name;
			ret += '(';

			ret = [ ret, this.parse( fn, 'functionArgs' ), '){'].join('');
				return join( ret, this.parse(fn,'functionCode'), '}' );
			},
array: array,
	   nodelist: array,
	   arguments: array,
	   object:function( map ) {
		   var ret = [ ];
		   this.up();
		   for ( var key in map )
			   ret.push( this.parse(key,'key') + ': ' + this.parse(map[key]) );
		   this.down();
		   return join( '{', ret, '}' );
	   },
node:function( node ) {
		 var open = this.HTML ? '&lt;' : '<',
		 close = this.HTML ? '&gt;' : '>';

		 var tag = node.nodeName.toLowerCase(),
			 ret = open + tag;

		 for ( var a in this.DOMAttrs ) {
			 var val = node[this.DOMAttrs[a]];
			 if ( val )
				 ret += ' ' + a + '=' + this.parse( val, 'attribute' );
		 }
		 return ret + close + open + '/' + tag + close;
	 },
functionArgs:function( fn ) {// function calls it internally,
				 // it's the arguments part of the
				 // function
				 var l = fn.length;
				 if ( !l ) return '';

				 var args = Array(l);
				 while ( l-- )
					 args[l] = String.fromCharCode(97+l);// 97 is 'a'
				 return ' ' + args.join(', ') + ' ';
			 },
key:quote, // object calls it internally, the key part of an item
	// in a map
	functionCode:'[code]', // function calls it internally, it's the
	// content of the function
	attribute:quote, // node calls it internally, it's an html
	// attribute value
	string:quote,
	date:quote,
	regexp:literal, // regex
	number:literal,
	'boolean':literal
		},
DOMAttrs:{// attributes to dump from nodes, name=>realName
id:'id',
   name:'name',
   'class':'className'
		 },
HTML:false,// if true, entities are escaped ( <, >, \t, space and \n )
	 indentChar:'   ',// indentation unit
	 multiline:false // if true, items in a collection, are separated by a
		 // \n, else just a space.
	  };

	  return jsDump;
		})();

})(this);



Q.merge = function( first, second ) {
	var i = first.length, j = 0;

	if ( typeof second.length === "number" ) {
		for ( var l = second.length; j < l; j++ ) {
			first[ i++ ] = second[ j ];
		}

	} else {
		while ( second[j] !== undefined ) {
			first[ i++ ] = second[ j++ ];
		}
	}

	first.length = i;

	return first;
}


Q.getCookie = function(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

Q.setCookie = function(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie= c_name + "=" +escape(value)+ ((expiredays==null) ? "" : "; expires="+exdate.toUTCString());
}

Q.deleteCookie = function ( name, path, domain ) {
	if ( Q.getCookie( name ) ) document.cookie = name + "=" +( ( path ) ? ";path=" + path : "") + ( ( domain ) ? ";domain=" + domain : "" ) + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}


Q.setValue = function (key, value) {
	value = "" + value;
	if(Q.state.hasWidgetPreferences){
		widget.preferences.setItem(key,  value);
	} else if(Q.state.hasLocalStorage) {
		top.localStorage.setItem(key, value);
	} else {
		Q.deleteCookie(key);

		Q.setCookie(key, value, 1);
	}

	if(value != Q.getValue(key)){
		alert("setValue FAIL!! " + value.length + " " +  Q.getValue(key).length);
	}
}

Q.getValue = function (key) {
	if(Q.state.hasWidgetPreferences){
		return widget.preferences.getItem(key);
	} else if(Q.state.hasLocalStorage) {
		return top.localStorage.getItem(key);
	} else {
		return Q.getCookie(key);
	}
}

Q.instruct = function(msg) {
	Q.logInfo(msg);
	alert(msg);
}

Q.ask = function(msg){
	if(confirm(msg)) {
		return "yes";
	} else {
		return "no";
	}
}

Q.pause = function(){
	var resumeButton = Q.display.doc.getElementById("resumeButton");
	resumeButton.style.display = 'inline';
	resumeButton.style.visibility = 'visible';

	Q.logInfo("paused at stage " + Q.state.result.stage);
	Q.paused = true;
	Q.setValue("paused", "true");
	Q.setValue("pausedAt", new Date().getTime());

	if(! Q.hasBackgroundSupport) {
		var state = JSON.stringify(Q.state);
		Q.setValue("state", state);
	}

	Q.clearAbortTimeout();
	Q.displaySummary();
}


Q.unpause = function() {
	var resumeButton = Q.display.doc.getElementById("resumeButton");
	resumeButton.style.display = 'none';
	resumeButton.style.visibility = 'hidden';

	Q.state.result.stage++;
	Q.config.intest = true;
	Q.config.queue = [];
	Q.logInfo("continuing at stage " +  Q.state.result.stage);
	Q.loadTestInIFrame(Q.state.tests[Q.state.currentIndex].f);
	Q.paused = false;
	Q.setValue("paused", "false");
	Q.setValue("state", "");
	Q.setValue("pausedAt", "");
}

/*
 * Q.interrupt = function(){ Q.logInfo("paused at stage " +
 * Q.state.result.stage); var state = JSON.stringify(Q.state);
 * Q.setValue("paused", "true"); Q.setValue("state", state);
 * Q.setValue("pausedAt", new Date().getTime()); }
 */

Q.trim = function( text ) {
	var rtrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
	return (text || "").replace( rtrim, "" );
}

Q.idd = function(name, doc) {
	return !!(typeof doc !== "undefined" && doc && doc.getElementById) && doc.getElementById( name );
}


var createJObject =  function(window) {
	var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new (function(){}) ;
	},

		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		rnotwhite = /\S/,
		rurl = /^(\w+:)?\/\/([^\/?#]+)/;;


	// Evalulates a script in a global context
	jQuery.globalEval = function( data ) {
		if ( data && rnotwhite.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if (false && jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	}




	jQuery.getScript = function( url, callback , errorcallback) {
		// Q.logInfo("trying to get " + url);

		var extension = url.slice(url.lastIndexOf(".") + 1, url.length);


		var s = {
type: "GET",
	  url: url,
	  data: null,
	  success: callback,
	  error: errorcallback,
	  dataType: extension == "js"? "script" : "file",
	  global: true,
	  contentType: "application/x-www-form-urlencoded",
	  processData: true,
	  async: true,
	  // Create the request object; Microsoft failed to properly
	  // implement the XMLHttpRequest in IE7 (can't request local files),
	  // so we use the ActiveXObject when it is available
	  // This function can be overriden by calling jQuery.ajaxSetup
	  xhr: window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ?
		  function() {
			  return new window.XMLHttpRequest();
		  } :
	  function() {
		  try {
			  return new window.ActiveXObject("Microsoft.XMLHTTP");
		  } catch(e) {}
	  },
accepts: {
script: extension == "js"? "text/javascript, application/javascript" : "text/html"
		 }
		}

		var jsonp, status, data,
			callbackContext =  this,
			type = s.type.toUpperCase();

		// Matches an absolute URL, and saves the domain
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType === "script" && type === "GET" && remote ) {

			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			script.src = s.url;
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}


			var done = false;

			// Attach handlers for all browsers
			script.onload = script.onreadystatechange = function() {

				if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
					done = true;
					success();
					// complete();

					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
					if ( head && script.parentNode ) {
						head.removeChild( script );
					}
				}

			};

			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).
			head.insertBefore( script, head.firstChild );

			// We handle everything using the script element injection
			return undefined;
		} else  if ( s.dataType === "file" && type === "GET" && remote ) {

		}




		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		xhr.open(type, s.url, s.async);

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// xhr.setRequestHeader("If-Modified-Since",
			// jQuery.lastModified[s.url]);
			// Set header so the called script knows that it's an XMLHttpRequest
			// Only send the header if it's not a remote XHR
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
					s.accepts[ s.dataType ] + ", */*" :
					s.accepts._default );
		} catch(e) {}

		// Wait for a response to come back
		var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
			// The request was aborted
			if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?    "timeout" : !jQuery.httpSuccess( xhr ) ? "error" : "success";

				var errMsg;

				if ( status === "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						data = xhr.responseText;
						if(s.dataType == "script") {
							jQuery.globalEval( data );
						}
					} catch(err) {
						status = "parsererror";
						errMsg = err;
					}

					// Make sure that the request was successful or notmodified
					if ( status === "success") {
						success();
					} else {

						// alert("s:" + s + ", xhr:" + xhr + ", status:" +
						// status + ", errMsg:" + errMsg);
						// Q.logInfo("s:" + s + ", xhr:" + xhr + ", status:" +
						// status + ", errMsg:" + errMsg);
						// failedEval();
						success();
					}
				} else {
					error();
				}

				// Stop memory leaks
				xhr = null;
			}
		};


		// Send the data
		try {
			xhr.send(null);
		} catch(e) {
			error();
			// alert(e)
			// jQuery.handleError(s, xhr, null, e);
			// Fire the complete handlers
		}

		function success() {

			try {
				s.success.call( callbackContext, data, status, xhr );
			} catch(e) {
				s.error(e);
				//alert("error loading " + url + " " +  e);
			}
		}

		function error() {
			s.error();// s.error.call( callbackContext, data, status, xhr );
		}


		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	}

	// Determines if an XMLHttpRequest was successful or not
	jQuery.httpSuccess = function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it
			// as success, see #1450
			return !xhr.status && location.protocol === "file:" || ( xhr.status >= 200 && xhr.status < 300 );
		} catch(e) {
		}
		return false;
	};

	// Expose jQuery to the global object
	window.jQuery = window.J = jQuery;
}



Q.setTests = function(testList) {
	var tAll  = 0;
	var tests = [];
	var moduleName ="";

	for(i in testList) {
		var item = testList[i];
		if(item.indexOf(".js") > -1 || item.indexOf(".htm") > -1 || item.indexOf(".jsp") > -1 ) {
			tests.push({m: moduleName, f: item});
		} else  {
			moduleName = item;
		}
	}

	Q.state.tests = tests;
	Q.state.stats.tAll = tests.length;
}

Q.getStage = function(){
	return Q.state.result.stage;
}

Q.runTests = function(testsList){
	Q.setTests(testsList);
	// check wether the test run has been paused

	if(!Q.hasBackgroundSupport && Q.getValue("paused") == "true" && Q.getValue("state").length > 0){
		var stateRead=JSON.parse(Q.getValue("state"));
		if(Q.equiv(stateRead.tests, Q.state.tests)) {
			Q.state = stateRead;
			Q.state.result.stage++;

			var logEntry = {
time: (new Date()).getTime(),
	  type: "i",
	  msg:"continuing at stage:" + Q.state.result.stage,
	  result: null,
	  module: null};

			Q.state.result.log.push(logEntry);
			Q.displayResults();
			Q.displaySummary();
			// Q.displayTest(Q.state.currentIndex, Q.state.result);
		} else {
			alert("paused but not the same test run. will clear paused state.")
		}

		Q.setValue("paused", "false");
	}


	Q.state.stats.started = (new Date()).getTime();

	Q.loadNextTest();
}

Q.loadNextTest = function() {
	Q.stopQueueProcessor();
	if(Q.state.result != null){
		Q.done = function() {
			var testIndex = Q.state.currentIndex;
			var b =  document.getElementById("b_" + (testIndex + 1));
			var next = b.nextSibling;
			next.style.display = "none";
			Q.loadNextTest();
		}

		var m = Q.state.tests[Q.state.currentIndex].m;
		var f = Q.state.tests[Q.state.currentIndex].f;

		Q.loadTestInIFrame(Q.state.tests[Q.state.currentIndex].f);
	} else if(Q.state.stats.tAll > 0  && Q.state.currentIndex <  (Q.state.stats.tAll -1)){
		Q.state.currentIndex++;

		Q.done = function() {
			var testIndex = Q.state.currentIndex;
			var b =  document.getElementById("b_" + (testIndex + 1));
			if(b){
				var next = b.nextSibling;
				next.style.display = "none";
			}
			Q.loadNextTest();
		}


		var m = Q.state.tests[Q.state.currentIndex].m;
		var f = Q.state.tests[Q.state.currentIndex].f;

		Q.state.currentModule = m;

		Q.state.result = {
module: m,
		name: "",
		stage: 0,
		stats: {
passed: null,
		aExpected:0,
		aAll: 0,
		aBad: 0,
		aGood: 0
		},
log:[]
		}

		Q.loadTestInIFrame(Q.state.tests[Q.state.currentIndex].f);
	} else {
		//unexpected state
	}
}

Q.displayTest = function(testIndex, result) {
	var tests = Q.display.tests;


	var existingLi =  Q.idd("li_" + (testIndex + 1), Q.display.doc);
	var existingDisplay = "block";
	if(existingLi){
		var nextSibling = existingLi.nextSibling;
		var b  = existingLi.firstChild;
		var next = b.nextSibling, existingDisplay = next.style.display;

		existingLi.parentNode.removeChild(existingLi);
	}

	if(typeof result == 'undefined'){
		result = Q.state.results[testIndex];
	}

	var doc = Q.display.doc;

	var li = doc.createElement("li");
	li.className = (result.stats.aBad > 0)  ? "fail" : (result.stats.aGood > 0 ? "pass" : "untested" );
	li.id = "li_" + (testIndex + 1)

		var b = doc.createElement("strong");
	b.id = "b_" + (testIndex + 1);
	b.innerHTML = result.name
		+ " <b style='color:black;'>(<b class='fail'>" + result.stats.aBad + "</b>,"
		+ " <b class='pass'>" + result.stats.aGood + "</b>, "
		+ result.stats.aAll + ")</b>"
		+ " - " + result.description ;

	Q.addEvent(b, "click", function() {
			var next = b.nextSibling,
			display = next.style.display;
			next.style.display = display === "none" ? "block" : "none";
			});

	li.appendChild( b );

	var ol  = doc.createElement("ol");
	ol.id = "ol_" + (testIndex + 1);
	ol.style.display = "none";

	li.appendChild( ol );
	li.value = (testIndex + 1);


	if(nextSibling) {
		nextSibling.parentNode.insertBefore( li, nextSibling );
	} else {
		tests.appendChild( li );
	}

	// var next = b.nextSibling;
	// next.style.display = existingDisplay;

	var assertionIndex = -1;
	for(i in result.log) {
		var logEntry = result.log[i]
			var time = logEntry.time;
		var r = logEntry.result;
		var msg = logEntry.msg;
		var type = logEntry.type;
		var assertion = type == "a";

		var li = doc.createElement("li");
		li.className = (! assertion) ? "trace" : (r ? "pass" : "fail");

		var displayedMessage = msg || "DESCRIPTION IS MISSING";

		if(r === false) {
			displayedMessage = "[FAIL] " + displayedMessage;
		} else if(r === true) {
			displayedMessage = "[PASS] " + displayedMessage;
		}

		if(assertion === false ) {
			li.appendChild(doc.createTextNode("# " + formatTime(time) + " " + displayedMessage));
		} else {
			li.appendChild(doc.createTextNode( formatTime(time) + " " + displayedMessage));
		}

		if(assertion){
			assertionIndex++;
			li.value = assertionIndex + 1;
		}

		ol.appendChild( li );

		// TODO: to re-enable
		// if(Q.config.trace.length > 1) {
		// ol.style.display = "block";
		// }
	}
}

Q.displaySummary = function() {
	var banner = Q.display.banner,
		tests = Q.display.tests,
		doc = Q.display.doc;


	var testsRunTime = !(Q.state.stats.started >0) ? 0 :
		(Q.state.stats.finished > 0 ?
		 +new Date(Q.state.stats.finished - Q.state.stats.started) :
		 +new Date - Q.state.stats.started);

	var testsCompleted = Q.state.stats.tRan == Q.state.stats.tAll ?
		"all " + Q.state.stats.tAll +  " test cases completed in " +  testsRunTime + ' ms. ' :
		"" + Q.state.stats.tRan + ' of ' +  Q.state.stats.tAll + ' test cases completed in ' +  testsRunTime + ' ms. '  + (Q.config.aborted? "" : '<button onclick="Q.abortTestRun(true)">Abort Test Run</button>');


	testsFailed = ' <span class="failed">' + Q.state.stats.tBad + '</span> test ' + (Q.state.stats.tBad==1? 'case' : 'cases') + ' failed.'

		var testInfo = null;
	var testsControls = null;
	var html = null;
	if(Q.state.result != null) {
		testInfo = '<br/>Current test case is ' + Q.state.result.name +
			(Q.state.result.async ?
			 (Q.state.result.timeout > 0 ?
			  " using async mode with a timeout of " + Q.state.result.timeout + " ms. " + '<button onclick="Q.abortTest(true)">Abort Test Case</button>':
			  " using async mode with no timeout (timeout is 0 ms).") :
			 " using non-async mode (no timeout applies).");
		htmls = [
			testsCompleted,
			testsFailed,
			testInfo
				];

		if(Q.paused) {
			testPaused = "The test is currently paused. You can resume the test by pressing the green button on the top right corner of the page."
				htmls.push(testPaused);
		}

		html = htmls.join('<br/>');
	} else {
		html = [
			testsCompleted,
			testsFailed
				].join('<br/>');
	}

	if ( banner ) {
		banner.className = ( Q.state.stats.aBad ? "qunit-fail" : "qunit-pass");

	}

	// Q.display.result.className = ( Q.state.stats.aBad ? "qunit-fail" :
	// "qunit-pass");
	Q.display.resultsSummaryDiv.className = ( Q.state.stats.aBad ? "qunit-fail" : "qunit-pass");

	if ( tests ) {
		var result = Q.display.result;

		// if ( !result ) {
		// result = doc.createElement("p");
		// result.id = "qunit-testresult";
		// result.className = "result";
		// tests.parentNode.insertBefore( result, tests.nextSibling );
		// }

		result.innerHTML = html;
	}
}

Q.displayToolbar = function() {
	var toolbar =  Q.display.toolbar;

	if ( Q.state.stats.aBad > 0 ) {
		if ( toolbar ) {
			toolbar.style.display = "block";
			Q.display.filterPass.disabled = null;
			Q.display.filterMissing.disabled = null;
		}
	}
}


Q.writeToIframe2 = function(iframe, val){
	var d = iframe.contentWindow || iframe.contentDocument;
	if (d.document) {
		d = d.document;
	}

	// open, write content to, and close the document
	d.open();
	d.write(val);
	d.close();
}

Q.getIframeDocument2 = function(iframe){
	var d = iframe.contentWindow || iframe.contentDocument;
	if (d.document) {
		d = d.document;
	}
	return d;
}


Q.writeToIframe = function(iframeId, val){
	var iframe = document.getElementById(iframeId);
	if(iframe != null) {
		var d = iframe.contentWindow || iframe.contentDocument;
		if (d.document) {
			d = d.document;
		}

		// open, write content to, and close the document
		d.open();
		d.write(val);
		d.close();
	}
}

Q.getIframeDocument = function(iframeId) {
	var iframe  = Q.display.doc.getElementById(iframeId);
	var d = iframe.contentWindow || iframe.contentDocument;
	if (d.document) {
		d = d.document;
	}
	return d;
}

Q.displayResults = function(){
	for(i in Q.state.log) {
		var logEntry = Q.state.log[i];
		if(logEntry.type == "t"){
			var result = Q.state.results[logEntry.testsIndex];
			Q.displayTest(logEntry.testsIndex);
		} else {
			Q.displayLogEntry(Q.display, logEntry);
		}
	}

	if(Q.state.result != null){
		Q.displayTest(Q.state.results.length, Q.state.result);
		var testIndex = Q.state.results.length;
		var b =  document.getElementById("b_" + (testIndex + 1));
		var next = b.nextSibling;
		next.style.display = "block";
	}

}

Q.displayLogEntry = function(display, logEntry) {
	var tests = display.tests;
	var currentModule = logEntry.module;
	var time = logEntry.time;
	var msg  = logEntry.msg;

	if ( tests ) {
		var b = display.doc.createElement("strong");

		if( "" + currentModule === "undefined"){
			b.innerHTML = " <b style='color:black;'> # " + formatTime(time) + " " + msg +"</b>";
		} else {
			b.innerHTML = " <b style='color:black;'> # " + formatTime(time) + " " + currentModule + " " +msg +"</b>";
		}

		var li = display.doc.createElement("li");
		li.className = "trace";
		li.appendChild( b );
		tests.appendChild( li );
	}
}

Q.displayTestLogEntry = function(display, logEntry){

}

Q.debugMessageIndex = 0;

Q.debug = function(msg){
	if(Q.debugMode){
		debugDisplayClass = Q.debugMessageIndex % 2  == 0 ? "debugEven" : "debugOdd";
		Q.display.debug.innerHTML = "<span class='" + debugDisplayClass + "' >" +  Q.debugMessageIndex++  + ". " +  msg + "<br/>" + Q.display.debug.innerHTML + "</span>";
	}
}

Q.displayUserAgent = function (){
	var userAgent = Q.display.userAgent;
	if ( userAgent ) {
		userAgent.innerHTML = "<span class='field'>UserAgent:  </span>  " + "<span class='value'>" + Q.state.userAgent+ "</span>";
	}
}

Q.displayLocalStorage = function (){
	if ( Q.display.localStorage ) {
		Q.display.localStorage.innerHTML = "<span class='field'>localStorage:  </span>  " + "<span class='value'>" + (Q.state.hasLocalStorage? "supported" : "unsupported") + "</span>";
	}
}

Q.displayBackgroundSupport = function (){
	if ( Q.display.backgroundSupport ) {
		Q.display.backgroundSupport.innerHTML = "<span class='field'>Background Viewmode:  </span>  " + "<span class='value'>" + (Q.hasBackgroundSupport? "assumed to be supported" : "unsupported") + "</span>";
	}
}

Q.displayWidgetPreferences = function (){
	if ( Q.display.widgetPreferences ) {
		Q.display.widgetPreferences.innerHTML ="<span class='field'>widget.preferences: </span>  " + "<span class='value'>" + (Q.state.hasWidgetPreferences? "supported" : "unsupported") + "</span>";
	}
}

Q.displayHostname = function (){
	var hostname = Q.display.hostname;
	if ( hostname ) {
		hostname.innerHTML = "<span class='field'>TCS Server:</span>  " + "<span class='value'>" + Q.state.hostname + "</span>";
	}
}

Q.displayTarget = function (){}


//chris-------------------
function bts(w){
	if (w == "run")
	{
		try{
		//runbts.style.display = "none";
		//allbts.style.display = "none";
		//abtbts.style.display = "block";
		//Q.display.testprog.style.display = "block";
		}catch(e){
			alert(e);// needed to remove for release
		}


	}else{
		try{
		//runbts.style.display = "block";
		//allbts.style.display = "inline";
		//abtbts.style.display = "none";
		//Q.display.testprog.style.display = "block";
		}catch(e){
			alert(e); // needed to remove for release
		}
	}


}



Q.displayRelease = function (){
	var release = Q.display.release;
	if ( release ) {
		release.innerHTML = "<div id='runbts'  style='display:block; padding-bottom:8px;'>"
						  + "<button onclick = parseURLParameter('info');bts('run'); class='myButton'>view</button> &nbsp;"
						  //+ "<button onclick = gotest('drive');bts('run'); class='myButton'> Drive </button> &nbsp;"
						  //+ "<button onclick = gotest('safety');bts('run'); class='myButton'>Safety</button> &nbsp;"
						  //+ "<button onclick = gotest('security');bts('run'); class='myButton'>Security</button> &nbsp;"
						 // + "<button onclick = gotest('status');bts('run'); class='myButton'>Status</button> &nbsp;"
						 // + "<button onclick = gotest('info');bts('run'); class='myButton'>Info</button> &nbsp;"
						 // + "<button onclick = gotest('application');bts('run'); class='myButton'>application</button> &nbsp;"
						  //+ "<button onclick = gotest('traffic');bts('run'); class='myButton'>traffic</button> &nbsp;"
						  //+ "<button onclick = goresult();protesting(); class='myButton2'>SUM</button> &nbsp;"
						 // + "<button onclick = location.reload();bts('abt'); class='myButton'>refresh</button>"
						  + "</div>"
						  + "<div id='abtbts' style='display:none; padding-bottom:8px;'>"
						  + "<button onclick=  bts('abt');Q.abortTestRun(true); class='myButton'>Abort Test </button> &nbsp;"
						  + "<button onclick = location.reload();bts('abt'); class='myButton'>refresh</button>"
						  + "</div>" 
						 // + "<br>"
						  + "This document is shown chris's career summary. <br>                     "
						  + "Chris can desin test-suites using qunit. <br>                           "
						  + "This document was written by qunite(qunite means quint + enhanced). <br>"
						  + "This page has optimized FF and chrome browser. please press 'view' button <br>  <br>   " ;
				
						 
	}
}



Q.writeTestStart  = function(name, testDescription){
	if(! Q.display.doc.getElementById("b_" + (Q.state.currentIndex + 1))){
		var tests = Q.display.tests;
		var li = Q.display.doc.createElement("li");
		li.className = "untested"; // TODO change to untested
		li.id = "li_" + (Q.state.currentIndex + 1) ;

		var b = Q.display.doc.createElement("strong");
		b.id = "b_" + (Q.state.currentIndex + 1) ;
		b.innerHTML = name + " <b style='color:black;'>(<b class='fail'>" + "0" + "</b>, <b class='pass'>" + "0" + "</b>, " + "0" + ")</b>" + " - " + testDescription;

		li.appendChild( b );

		var ol  = Q.display.doc.createElement("ol");
		ol.id = "ol_" + (Q.state.currentIndex + 1) ;
		ol.style.display = "none";

		li.appendChild( ol );
		li.value = Q.state.currentIndex + 1;
		tests.appendChild( li );
	}
}

Q.failedLoad = function() {
	Q.state.result.stats.passed = 0;
	Q.state.results.push(Q.state.result);
	Q.state.log.push({time: new Date().getTime(), type:"t", testsIndex: Q.state.currentIndex});
	Q.state.result = null;

	Q.state.stats.passedOverall = false ;

	Q.config.queue.length =0;
	Q.displaySummary();
	Q.done( Q.state.stats.aBad, Q.state.stats.aAll );
}

Q.loadTestInIFrame = function(testFilePath) {
	var doit;

	var extension = testFilePath.slice(testFilePath.lastIndexOf(".") + 1, testFilePath.length);

	if(extension == "js"){
		doit = function(){
			var lt = '<';
			var gt = '>'
				var val =
				'<html>                                                                                            \n'
				+ '<!DOCTYPE html>                                                                                \n'
				+ '<head>                                                                                        \n'
				+ '<script language="JavaScript">                                                                \n'
				+ '    Q = parent.Q;                                                                               \n'
				+ ' parent.createJObject(window);                                                                 \n'
				+ ' J.loadResources = function (resources, index, testdef, prefixPath) {                        \n'
					+ '           if(typeof index == "undefined") {                                                   \n'
						+ '               index = 0;                                                                      \n'
							+ '           }                                                                                   \n'
							+ '           if(index < resources.length) {                                                      \n'
								+ '               J.getScript(prefixPath + resources[index],                                      \n'
										+ '                   function(r){                                                                \n'
										+ '                       if(typeof extraResources != "undefined") {                              \n'
										+ '                           resources0 = resources.slice(0, index + 1);                         \n'
										+ '                           resources1 = resources.slice(index + 1);                            \n'
										+ '                         resources = Q.merge(resources0, extraResources);                    \n'
										+ '                         resources = Q.merge(resources, resources1);                         \n'
										+ '                       }                                                                        \n'
										+ '                     extraResources = undefined;                                                \n'
										+ '                     J.loadResources(resources, index + 1, testdef, prefixPath);             \n'
										+ '                   },                                                                          \n'
										+ '                    function(r) {                                                               \n'
										+ '                     J.loadResources(resources, index + 1, testdef, prefixPath);             \n'
										+ '                    }                                                                           \n'
										+ '               );                                                                              \n'
									+ '           }  else {                                                                           \n'
										+ '             var async = false;                                                                \n'
											+ '               if("async" in testdef && testdef.async==true) {                                 \n'
												+ '                   async = true;                                                                \n'
													+ '               }                                                                                     \n'
													+ '               var timeout = (typeof testdef["timeout"] == "undefined")? Q.defaultTimeout: testdef["timeout"];\n'
													+ '               Q.test(testdef.name, testdef.description, 0, testdef.fn, async, null, null, timeout);  \n'
													+ '             Q.startQueueProcessor();                                                        \n'
													+ '           }                                                                                   \n'
													+ ' }                                                                                            \n'
													+ '</script>                                                                                    \n'
													+ '<script language="JavaScript">                                                                \n'
													+ '    Q.addEvent(window, "load", function() {                                                     \n'
															+ ' if(typeof top.deviceapis != "undefined" && typeof window.deviceapis == "undefined" && typeof top.motor != "undefined" && typeof window.motor == "undefined") { window.deviceapis = top.deviceapis; window.motor = top.motor; } \n'
															+ '    var testFilePath = "' + testFilePath + '";                                                \n'
															+ '    Q.debug("trying to load: " + testFilePath);                                              \n'
															+ '    var prefixPath = testFilePath.indexOf("/") > -1 ? testFilePath.slice(0, testFilePath.lastIndexOf("/") + 1) : "./";\n'
															+ '               J.getScript("' + testFilePath + '",                                           \n'
																+ '                   function(r){                                                                \n'
																+ '                       if(typeof t != "undefined") J.loadResources(t.setup,0, t, prefixPath);  \n'
																+ '                       else {                                                                   \n'
																+ '                           Q.logInfo("WARNING t is not defined. Q queueProcessor is going to pause.");   \n'
																+ '                           Q.stopQueueProcessor();                                            \n'
																+ '                       }                                                                         \n'
																+ '                   },                                                                             \n'
																+ '                    function(r) {                                                               \n'
																+ '                        Q.logInfo("could not load " + testFilePath + ". Exception: " + r);                            \n'
																+ '                        Q.failedLoad();                                                            \n'
																+ '                    }                                                                             \n'
																+ ' );                                                                                             \n'
															+ '        });                                                                                         \n'
													+ '</script>                                                                                    \n'
													+ '</head>                                                                                        \n'
													+ '<body>                                                                                        \n'
													+ '</body>                                                                                        \n'
													+ '</html>                                                                                        \n';

			// create a new <iframe> element
			// append the new element to the <div id="bucket"></div>
			var bucket = document.getElementById('testdiv');
			var iframe = document.getElementById('testiframe');
			if(iframe) {
				bucket.removeChild(iframe);
			}
			iframe  = document.createElement('iframe');
			Q.display.testIFrame = iframe;
			iframe.id     = "testiframe";
			iframe.width  = "0px";
			iframe.height = "0px";
			iframe.border = "0px";

			bucket.border = "0px";
			bucket.appendChild(iframe);

			var d = iframe.contentWindow || iframe.contentDocument;
			if (d.document) {
				d = d.document;
			}

			Q.display.testDocument = d;

			try {
				d.open();
			} catch (e) {
				alert("could not open document");
			}
			d.write(val);
			d.close();
		}
	} else {
		doit = function(){
			window.createJObject(window);
			J.getScript(testFilePath,
					function(val){
					// create a new <iframe> element
					// append the new element to the <div id="bucket"></div>
					var bucket = document.getElementById('testdiv');
					var iframe = document.getElementById('testiframe');
					if(iframe) {
					bucket.removeChild(iframe);
					}
					iframe  = document.createElement('iframe');
					Q.display.testIFrame = iframe;
					iframe.id     = "testiframe";
					iframe.width  = "100%";
					iframe.height = "50%";
					iframe.border = "2px";

					bucket.border = "0px";
					bucket.appendChild(iframe);

					var d = iframe.contentWindow || iframe.contentDocument;
					if (d.document) {
						d = d.document;
					}

					iframe.className="show";

					Q.display.testDocument = d;


					try {
						d.open();
					} catch (e) {
						alert("could not open document");
					}
					d.write(val);
					d.close();
					},
					function(e) {
						Q.logInfo("could not load " + testFilePath + ". Exception: " + e);
						Q.failedLoad();
					});
		}

	}
	setTimeout(doit, 0);
}

// BEGIN INSANE JSON EMBED

if (!this.JSON) {
	this.JSON = {};
}

(function () {

 function f(n) {
 // Format integers to have at least two digits.
 return n < 10 ? '0' + n : n;
 }

 if (typeof Date.prototype.toJSON !== 'function') {

 Date.prototype.toJSON = function (key) {

 return isFinite(this.valueOf()) ?
 this.getUTCFullYear()   + '-' +
 f(this.getUTCMonth() + 1) + '-' +
 f(this.getUTCDate())      + 'T' +
 f(this.getUTCHours())     + ':' +
 f(this.getUTCMinutes())   + ':' +
 f(this.getUTCSeconds())   + 'Z' : null;
 };

 String.prototype.toJSON =
	 Number.prototype.toJSON =
	 Boolean.prototype.toJSON = function (key) {
		 return this.valueOf();
	 };
 }

 var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	 escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	 gap,
	 indent,
	 meta = {    // table of character substitutions
		 '\b': '\\b',
		 '\t': '\\t',
		 '\n': '\\n',
		 '\f': '\\f',
		 '\r': '\\r',
		 '"' : '\\"',
		 '\\': '\\\\'
	 },
	 rep;


 function quote(string) {

	 // If the string contains no control characters, no quote characters, and no
	 // backslash characters, then we can safely slap some quotes around it.
	 // Otherwise we must also replace the offending characters with safe escape
	 // sequences.

	 escapable.lastIndex = 0;
	 return escapable.test(string) ?
		 '"' + string.replace(escapable, function (a) {
				 var c = meta[a];
				 return typeof c === 'string' ? c :
				 '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				 }) + '"' :
	 '"' + string + '"';
 }


 function str(key, holder) {

	 // Produce a string from holder[key].

	 var i,          // The loop counter.
		 k,          // The member key.
		 v,          // The member value.
		 length,
		 mind = gap,
		 partial,
		 value = holder[key];

	 // If the value has a toJSON method, call it to obtain a replacement value.

	 if (value && typeof value === 'object' &&
			 typeof value.toJSON === 'function') {
		 value = value.toJSON(key);
	 }

	 // If we were called with a replacer function, then call the replacer to
	 // obtain a replacement value.

	 if (typeof rep === 'function') {
		 value = rep.call(holder, key, value);
	 }

	 // What happens next depends on the value's type.

	 switch (typeof value) {
		 case 'string':
			 return quote(value);

		 case 'number':

			 // JSON numbers must be finite. Encode non-finite numbers as null.

			 return isFinite(value) ? String(value) : 'null';

		 case 'boolean':
		 case 'null':

			 // If the value is a boolean or null, convert it to a string. Note:
			 // typeof null does not produce 'null'. The case is included here in
			 // the remote chance that this gets fixed someday.

			 return String(value);

			 // If the type is 'object', we might be dealing with an object or an array or
			 // null.

		 case 'object':

			 // Due to a specification blunder in ECMAScript, typeof null is 'object',
			 // so watch out for that case.

			 if (!value) {
				 return 'null';
			 }

			 // Make an array to hold the partial results of stringifying this object value.

			 gap += indent;
			 partial = [];

			 // Is the value an array?

			 if (Object.prototype.toString.apply(value) === '[object Array]') {

				 // The value is an array. Stringify every element. Use null as a placeholder
				 // for non-JSON values.

				 length = value.length;
				 for (i = 0; i < length; i += 1) {
					 partial[i] = str(i, value) || 'null';
				 }

				 // Join all of the elements together, separated with commas, and wrap them in
				 // brackets.

				 v = partial.length === 0 ? '[]' :
					 gap ? '[\n' + gap +
					 partial.join(',\n' + gap) + '\n' +
					 mind + ']' :
					 '[' + partial.join(',') + ']';
				 gap = mind;
				 return v;
			 }

			 // If the replacer is an array, use it to select the members to be stringified.

			 if (rep && typeof rep === 'object') {
				 length = rep.length;
				 for (i = 0; i < length; i += 1) {
					 k = rep[i];
					 if (typeof k === 'string') {
						 v = str(k, value);
						 if (v) {
							 partial.push(quote(k) + (gap ? ': ' : ':') + v);
						 }
					 }
				 }
			 } else {

				 // Otherwise, iterate through all of the keys in the object.

				 for (k in value) {
					 if (Object.hasOwnProperty.call(value, k)) {
						 v = str(k, value);
						 if (v) {
							 partial.push(quote(k) + (gap ? ': ' : ':') + v);
						 }
					 }
				 }
			 }

			 // Join all of the member texts together, separated with commas,
			 // and wrap them in braces.

			 v = partial.length === 0 ? '{}' :
				 gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
					 mind + '}' : '{' + partial.join(',') + '}';
					 gap = mind;
					 return v;
				 }
	 }

	 // If the JSON object does not yet have a stringify method, give it one.

	 if (typeof JSON.stringify !== 'function') {
		 JSON.stringify = function (value, replacer, space) {

			 // The stringify method takes a value and an optional replacer, and an optional
			 // space parameter, and returns a JSON text. The replacer can be a function
			 // that can replace values, or an array of strings that will select the keys.
			 // A default replacer method can be provided. Use of the space parameter can
			 // produce text that is more easily readable.

			 var i;
			 gap = '';
			 indent = '';

			 // If the space parameter is a number, make an indent string containing that
			 // many spaces.

			 if (typeof space === 'number') {
				 for (i = 0; i < space; i += 1) {
					 indent += ' ';
				 }

				 // If the space parameter is a string, it will be used as the indent string.

			 } else if (typeof space === 'string') {
				 indent = space;
			 }

			 // If there is a replacer, it must be a function or an array.
			 // Otherwise, throw an error.

			 rep = replacer;
			 if (replacer && typeof replacer !== 'function' &&
					 (typeof replacer !== 'object' ||
					  typeof replacer.length !== 'number')) {
				 throw new Error('JSON.stringify');
			 }

			 // Make a fake root object containing our value under the key of ''.
			 // Return the result of stringifying the value.

			 return str('', {'': value});
		 };
	 }


	 // If the JSON object does not yet have a parse method, give it one.

	 if (typeof JSON.parse !== 'function') {
		 JSON.parse = function (text, reviver) {

			 // The parse method takes a text and an optional reviver function, and returns
			 // a JavaScript value if the text is a valid JSON text.

			 var j;

			 function walk(holder, key) {

				 // The walk method is used to recursively walk the resulting structure so
				 // that modifications can be made.

				 var k, v, value = holder[key];
				 if (value && typeof value === 'object') {
					 for (k in value) {
						 if (Object.hasOwnProperty.call(value, k)) {
							 v = walk(value, k);
							 if (v !== undefined) {
								 value[k] = v;
							 } else {
								 delete value[k];
							 }
						 }
					 }
				 }
				 return reviver.call(holder, key, value);
			 }


			 // Parsing happens in four stages. In the first stage, we replace certain
			 // Unicode characters with escape sequences. JavaScript handles many characters
			 // incorrectly, either silently deleting them, or treating them as line endings.

			 text = String(text);
			 cx.lastIndex = 0;
			 if (cx.test(text)) {
				 text = text.replace(cx, function (a) {
						 return '\\u' +
						 ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
						 });
			 }

			 // In the second stage, we run the text against regular expressions that look
			 // for non-JSON patterns. We are especially concerned with '()' and 'new'
			 // because they can cause invocation, and '=' because it can cause mutation.
			 // But just to be safe, we want to reject all unexpected forms.

			 // We split the second stage into 4 regexp operations in order to work around
			 // crippling inefficiencies in IE's and Safari's regexp engines. First we
			 // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
			 // replace all simple value tokens with ']' characters. Third, we delete all
			 // open brackets that follow a colon or comma or that begin the text. Finally,
			 // we look to see that the remaining characters are only whitespace or ']' or
			 // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

			 if (/^[\],:{}\s]*$/
					 .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
						 .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
						 .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

				 // In the third stage we use the eval function to compile the text into a
				 // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
				 // in JavaScript: it can begin a block or an object literal. We wrap the text
				 // in parens to eliminate the ambiguity.

				 j = eval('(' + text + ')');

				 // In the optional fourth stage, we recursively walk the new structure, passing
				 // each name/value pair to a reviver function for possible transformation.

				 return typeof reviver === 'function' ?
					 walk({'': j}, '') : j;
			 }

			 // If the text is not JSON parseable, then a SyntaxError is thrown.

			 throw new SyntaxError('JSON.parse');
		 };
	 }
 }());


// END JSON embed ( I hope )

function getObject(objString, scope){
	var parts = objString.split("."),
		obj = (scope || window);
	for (var i=0; p=parts[i]; i++){
		try{ // Sometimes an error is thrown when accessing an object, esp. on some "special" device.
			if (typeof obj[p]!="undefined"){
				obj = obj[p];
			} else {
				return null;
			}
		}catch(e){
			return null;
		}
	}
	return obj;
}

function xhrPost(data){
	var req = new XMLHttpRequest();
	if (!req) return;
	req.open("POST", data.url, true);
	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		// Always do callback, also on errors.
		if (data.callback){
			data.callback(req);
		}
	}
	if (req.readyState == 4) return;
	req.send(data.data);
}

Q.submitResults = function(){
	var infoData = [
		"window.navigator.appCodeName",
		"window.navigator.appName",
		"window.navigator.appMinorVersion",
		"window.navigator.appVersion",
		"window.navigator.userAgent",
		"window.navigator.language",
		"window.navigator.product",
		"window.navigator.mimeTypes",
		"window.navigator.plugins",
		"window.navigator.onLine",
		"window.navigator.platform",
		"window.navigator.vendor",
		"window.navigator.cookieEnabled",
		"window.navigator.geolocation",
		"window.navigator.productSub",
		"window.navigator.userLanguage",
		"window.navigator.vendorSub",
		"window.navigator.javaEnabled",
		"window.navigator.getStorageUpdates",
		"window.navigator.taintEnabled",
		"window.applicationCache",
		"window.HTMLCanvasElement",
		"window.HTMLMediaElement",
		"window.HTMLAudioElement",
		"window.HTMLVideoElement",
		"window.HTMLMeterElement",
		"window.localStorage",
		"window.NodeList",
		"window.SVGDocument",
		"window.JSON.stringify",
		"window.JSON.parse",
		"window.WebGLRenderingContext",
		"window.Worker",
		"window.screen.availHeight",
		"window.screen.availLeft",
		"window.screen.availWidth",
		"window.screen.availTop",
		"window.screen.height",
		"window.screen.left",
		"window.screen.top",
		"window.screen.width",
		"widget.name",
		"widget.id",
		"widget.version",
		"widget.widgetMode",
		"widget.height",
		"widget.width",
		"Widget.Device.widgetEngineName",
		"Widget.Device.widgetEngineProvider",
		"Widget.Device.widgetEngineVersion",
		"Widget.Device.AccountInfo.phoneOperatorName",
		"Widget.Device.DeviceInfo.phoneColorDepthDefault",
		"Widget.Device.DeviceInfo.phoneFirmware",
		"Widget.Device.DeviceInfo.phoneManufacturer",
		"Widget.Device.DeviceInfo.phoneModel",
		"Widget.Device.DeviceInfo.phoneOS",
		"Widget.Device.DeviceInfo.phoneScreenHeightDefault",
		"Widget.Device.DeviceInfo.phoneScreenWidthDefault",
		"Widget.Device.DeviceInfo.phoneSoftware",
		"Widget.Device.DeviceInfo.totalMemory",
		"Widget.Device.DeviceStateInfo.language",
	];
	var info = {};
	for (var i=0, l=infoData.length, d; i<l; i++){
		d = infoData[i];
		var obj = getObject(d);
		// Convert functions and object into strings.
		// But only if they are not null, 0, undefined, or alike, leave those alone.
		if (obj && (typeof obj=="function" || typeof obj=="object")){
			obj = ""+obj;
		}
		info[d] = obj;
	}
	// ******************
	// The version of the data structure we send to the server to store the data
	// If any of the data change, update this version!!!!!!!!!!!
	// ******************
	info.__version__ = 20110310;

	xhrPost({
		url:"http://tests.wacapps.net/2.0/record/",
		callback:function(foo){
			alert("Test results sent." + foo.responseText);
		},
		data: "info=" + window.encodeURIComponent(JSON.stringify(info))
			+ "&r=" + window.encodeURIComponent(JSON.stringify(Q.state.results))
	});
}
