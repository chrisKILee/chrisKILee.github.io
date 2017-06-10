var t = {
    name: "info_s1_t3.7",
    description: "call to getCarInfo() - check head unit Manufacturer Code",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		try{
			var Info = infoAPI.getCarInfo();
			if (typeof Info.hUnitManufacturerCode == "number") {
				Q.pass("pass");
				Q.trace("Info.hUnitManufacturerCode :"+ Info.hUnitManufacturerCode);
				Q.testFinished();
			}else{
				Q.fail("Info.hUnitManufacturerCode is not number type / Info.hUnitManufacturerCode :"+ Info.hUnitManufacturerCode);
                Q.testFinished();
			}
		}catch(e){
			Q.fail("exception thrown : " + e);
            Q.testFinished();
		}
    }
}
