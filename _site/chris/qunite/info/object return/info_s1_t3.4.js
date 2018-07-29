var t = {
    name: "info_s1_t3.4",
    description: "call to getCarInfo() - check carModelName",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo();
			if (typeof Info.carModelName == "string") {
				Q.pass("pass");
				Q.trace("Info.carModelName :"+ Info.carModelName);
				Q.testFinished();
			}else{
				Q.fail("Info.carModelName is not string type / Info.carModelName :"+ Info.carModelName);
                Q.testFinished();
			}
		}catch(e){
			Q.fail("exception thrown : " + e);
            Q.testFinished();
		}
    }
}
