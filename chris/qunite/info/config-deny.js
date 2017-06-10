// reset device and load security policies

function config(callbacks){
    resetDevice();
    policyDeny();
    callbacks.success();
}
