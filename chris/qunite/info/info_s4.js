var t = {
    name: "info_s4",
    description: "Test-Case design : since 2006",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		Q.pass("functional test case base on Browser and WRT reguirements(specifications)                ");
		Q.pass("non-functional test case base on QA experience                                           ");
		Q.pass("automotive test case by javascript                                                       ");
		Q.pass("Design performance test tool & suite(development)                                        ");
		Q.pass("Set up performance test Methodology                                                      ");
		Q.pass("Test case design for Bondi, JIL full compliance                                          ");
		Q.pass("Contributor of WAC 2.0 deviceapi tests (The owner of Messaging, contact, task, calendar) ");
		
		Q.testFinished();
    }
}
