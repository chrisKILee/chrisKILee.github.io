﻿var t = {
    name: "info_s1",
    description: "Test and Team Management : since 2009",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		Q.pass("I was promoted to team manager from Test leader at july 2012                              ");
		Q.pass("Enhanced performance of Mobile Browser.                                                      ");
		Q.pass("Benchmark test leader in QCC of Obigo                                                        ");
		Q.pass("Bondi project: product QA and commercial project QA of 1.0CR, 1.1 AR, 1.5                    ");
		Q.pass("JIL : product QA of JIL 1.1, JIL1.2 (obtained JIL1.2 compliance certification from JIL Ltd)  ");
		Q.pass("WAC : product QA of WAC1.0 and WAC2.0 (obtained WAC2.0 compliance certification from WAC Ltd)");
		
		Q.testFinished();
    }
}
