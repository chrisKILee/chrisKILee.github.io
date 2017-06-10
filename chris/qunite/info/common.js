


var propRefToString = function(propRef) {
  
    if (propRef)
        return "[aspect: "+propRef.aspect+", component: "+propRef.component+", property: "+propRef.property+"]";
    else
        return "object Property Reference is null";
}

var devicestatusWatchOptionsToString = function(watchOptions) {

    if (watchOptions)
        return "[minTimeout: "+watchOptions.minTimeout+", maxTimeout: "+watchOptions.maxTimeout+", minChangePercent: "+watchOptions.minChangePercent+"]";
    else
        return "object watchOptions is null";
}

var stringify = function(o) {
    var s = ""
    for (p in o ) {
        s +=  p + ":" + o[p]  + "," ; 
    }
    s = "{" + s + "}"
}

var dummyFunction=function(){Q.testFinished();};
var dummyNoAsyncFunction=function(){;};

var unexpectedError = function(e) { Q.fail('An error happened unexpectedly, preventing this test to run: '+errorToString(e)); Q.testFinished(); };
var unexpectedNoAsyncError = function(e) { Q.fail('An error happened unexpectedly, preventing this test to run: '+errorToString(e)); };

var unexpectedSuccess        = function(property) { Q.fail('A success callback was unexpectedly triggered. FYI, property value was: '+property); Q.testFinished(); };
var unexpectedNoAsyncSuccess = function(property) { Q.fail('A success callback was unexpectedly triggered. FYI, property value was: '+property); };

var expectedSuccess          = function(property) {Q.pass('As expected success callback was triggered. FYI, property value was: '+property); Q.testFinished();};
var expectedError            = function(property) {Q.pass('As expected error callback was triggered. FYI, property value was: '+property); Q.testFinished();};
var expectedNoAsyncError     = function(property) {Q.pass('As expected error callback was triggered. FYI, property value was: '+property);};

var askAccept        = function()   {    deviceapis.devicestatus.setUserPermission(true);   }
var askWait          = function()   {    deviceapis.devicestatus.setUserPermission(false);  }
var askRefuse        = function()   {    deviceapis.devicestatus.setUserPermission(false);  }
var askRefuseAndWait = function()   {    deviceapis.devicestatus.setUserPermission(false);  }

var policyAllow      = function()   {    deviceapis.devicestatus.setPolicyPermission(true);   };
var policyDeny       = function()   {    deviceapis.devicestatus.setPolicyPermission(false);  };

var expectedPermissionDeniedError  = function(e) {
    Q.pass(e.code + " : " + e.message + " error CB");
	Q.testFinished();
}

var expectedInvalidError  = function(e) {
    Q.pass(e.code + " : " + e.message + " error CB");
	Q.testFinished();
}

var errorToString = function(err) {
    
  var codeString;
  switch(err.code) {
    case err.UNKNOWN_ERR:       codeString="UNKNOWN_ERR";           break;
    case err.SECURITY_ERR:      codeString="SECURITY_ERR";          break;
    case err.TIMEOUT_ERROR:     codeString="TIMEOUT_ERR";           break;
    case err.NOT_SUPPORTED_ERR: codeString="NOT_SUPPORTED_ERR";     break;
    case err.INVALID_VALUES_ERR:codeString="INVALID_VALUES_ERR";    break;
    case err.NOT_FOUND:         codeString="NOT_FOUND";             break;
    default:                    codeString="undefined error code";  break;
  }
  return "[code: "+codeString+" ("+err.code+"), message: "+(err.message?err.message:"(empty)")+"]";
}

//------------------------------
// compareArrays()
//------------------------------
function compareArrays( a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a2.length; i++) {

        if (typeof a1[i] === 'array')
        {
            if ( !compareArrays( a1[i], a2[i]) )
                return false;
        }

        if (a1[i] !== a2[i]) return false;
    }
    return true;
}

var invalid_function = 'invalid function';
var invalid_object = 1234;
var invalid_string = {toString: undefined};
var invalid_number = {toString: undefined};
var invalid_boolean = null;