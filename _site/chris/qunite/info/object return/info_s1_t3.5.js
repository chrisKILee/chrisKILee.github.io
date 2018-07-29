var t = {
    name: "info_s1_t3.5",
    description: "call to getCarInfo() - check vin",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo();
			if (typeof Info.vin == "string") {
				Q.pass("pass");
				Q.trace("Info.vin :"+ Info.vin);
				Q.testFinished();
			}else{
				Q.fail("Info.vin is not string type / Info.vin :"+ Info.vin);
                Q.testFinished();
			}
		}catch(e){
			Q.fail("exception thrown : " + e);
            Q.testFinished();
		}
    }
}
