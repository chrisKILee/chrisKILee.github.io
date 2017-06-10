var t = {
    name: "info_s1_t3.2",
    description: "call to getCarInfo() with parameter needlessly as null",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo(null);
			if (typeof Info == "object") {
				Q.pass("pass");
				Q.trace("Info :"+ Info);
				Q.testFinished();
			}else{
				Q.fail("CarInfo is not object type / Info :"+ Info);
                Q.testFinished();
			}
		}catch(e){
			Q.fail("exception thrown : " + e);
            Q.testFinished();
		}
    }
}
