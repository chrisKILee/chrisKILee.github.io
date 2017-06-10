var extraResources; 
var isOnWRT = Q.isOnWRT;

if(isOnWRT){
    extraResources = ["common.js"];
} else  {
    extraResources = ["../../lib/deviceapis.js","../../lib/deviceapis_devicestatus.js", "device.js", "common.js", "config-deny-mock.js"];    
}