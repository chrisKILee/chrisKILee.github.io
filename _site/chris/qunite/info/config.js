// reset device and load security policies

function config(callbacks){
    resetDevice();
    policyAllow();
    callbacks.success();
}
