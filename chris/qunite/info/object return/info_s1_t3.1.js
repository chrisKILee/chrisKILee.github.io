var t = {
    name: "info_s1_t3.1",
    description: "call to getCarInfo()",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo();
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
