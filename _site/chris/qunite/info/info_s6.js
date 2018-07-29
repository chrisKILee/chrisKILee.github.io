var t = {
    name: "info_s6",
    description: "Web Programming : 2002 ~ 2006",
    async:true,
    setup:["setup.js"],
    teardown:null,
    fn: function()
    {        
		Q.pass("Development of web site");
		Q.trace("i-challenge, epson, korean airlines");
		Q.pass("maintainance and support of web site");
		Q.trace("samsungsdi");
		Q.pass("web master");

		Q.testFinished();
    }
}
