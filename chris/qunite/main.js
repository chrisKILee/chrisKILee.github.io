
function parseURLParameter(kkk) {
	//Q.abortTestRun(true);
	var urlString = document.URL.toString();
	var testArr = [];

	xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET", kkk+"/test-suite.xml", true);

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				try {
					var xmlDoc = xmlhttp.responseXML;
					var test = xmlDoc.getElementsByTagName("test");
					for (i = 0; i < test.length; i++) {
						testArr[i] = kkk+"/" + test[i].getAttribute('src');
					}
					//alert(testArr.length);
					tests = testArr;
					Q.runTests(tests);
				} catch(e) {
					xmlDoc = null;
					alert(e.message);
				}
			} else {
				//alert("status : "+xmlhttp.status);
				if(xmlhttp.status == 0){
					alert("Test Suite is not prepared" );
				}else{
					alert("status : "+xmlhttp.status);
				}
			}
		}
	}
	xmlhttp.send();
}

var tests;

