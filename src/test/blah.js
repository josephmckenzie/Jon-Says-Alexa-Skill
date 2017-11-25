   var https = require('https');
  var results = '';
  var jonsaysarray = ['I like manbuns'] || jonsaysarray;
  var options = {
        host: 'bsi7688wf2.execute-api.us-east-1.amazonaws.com',
        path: '/dev/todos',
		    port: 443
	};

var callback = function(response) {

  response.on('data', function (chunk) {
    results += chunk;
  });
  response.on('end', function () {
//    console.log(str,"str");
var str = JSON.parse(results);
var phrases = str;

phrases.forEach(function(item) {
	if (item.jonsays !== null && item.skill == 'Jon Says' ) {
    jonsaysarray.push(item.jonsays);
	
	}
})


	console.log(jonsaysarray,"Jon says Array")
	});
};
var req = https.request(options, callback).end();
