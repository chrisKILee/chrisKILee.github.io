var t = {
    name: "info_s5",
    description: "Test Execute : since 2005",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		Q.pass("Verification & validation against the LG Cyon phones.(2005)");
		Q.pass("Messaging Test (about 1year : 2006 ~ 2007)                 ");
		Q.pass("Mobile Browser R&D team (about 1year : 2007 ~ 2008)        ");
		Q.pass("WRT : BINDI, JIL, W3C WAC, automotive (since 2009 ~ )      ");
		
		Q.testFinished();
    }
}
