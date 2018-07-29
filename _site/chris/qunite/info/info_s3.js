var t = {
    name: "info_s3",
    description: "Activity for widget standard - Contributor : 2009-2011",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		Q.pass("Participated in WAC test fest (3 times) – contribute WAC test asset.                      ");
		Q.pass("Tests owner for WAC tests – messaging, task, calendar, contact.                           ");
		Q.pass("W3C widget contributor for implementation report – Digital signature, P&C, interface, WARP");
	
		Q.testFinished();
    }
}
