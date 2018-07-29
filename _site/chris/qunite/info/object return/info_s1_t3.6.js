var t = {
    name: "info_s1_t3.6",
    description: "call to getCarInfo() - check head unit sirial number",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo();
			if (typeof Info.hUnitSN == "string") {
				Q.pass("pass");
				Q.trace("Info.hUnitSN :"+ Info.hUnitSN);
				Q.testFinished();
			}else{
				Q.fail("Info.hUnitSN is not string type / Info.hUnitSN :"+ Info.hUnitSN);
                Q.testFinished();
			}
		}catch(e){
			Q.fail("exception thrown : " + e);
            Q.testFinished();
		}
    }
}
