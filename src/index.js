'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.f578b6d9-bea2-4454-8a0c-89bd3b358ca4';  // TODO replace with your app ID (OPTIONAL).




  var https = require('https');
  var results = '';
  var jonsaysarray = [] || jonsaysarray;
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
var phrases = str.Items;

phrases.forEach(function(item) {
if (item.skill == 'Jon Says') {
    jonsaysarray.push(item.jonsays);
}
});
	console.log(jonsaysarray,"jon phrases")
	});
};
var req = https.request(options, callback).end();


var languageStrings = {
    "en": {
        "translation": {
            "FACTS": [
                "Google it."
            ],
            "SKILL_NAME" : "Jon's Facts of Life",
            "GET_FACT_MESSAGE" : "",
            "HELP_MESSAGE" : "You can say What would Jon say, or not. It doesn't matter to Alexa",
            "HELP_REPROMPT" : "I must be speaking in manbun, sorry about that",
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
    "en-US": {
        "translation": {
            "FACTS": jonsaysarray,
            "SKILL_NAME" : "American Jon sayings",
									   "GET_FACT_MESSAGE" : "",
            "HELP_MESSAGE" : "You can say What would Jon say, or not. It doesn't matter to Alexa",
            "HELP_REPROMPT" : "I must be speaking in manbun, sorry about that",
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
    "en-GB": {
        "translation": {
            "FACTS": jonsaysarray,
            "SKILL_NAME" : "British Jon sayings",
									   "GET_FACT_MESSAGE" : "",
            "HELP_MESSAGE" : "You can say What would Jon say, or not. It doesn't matter to Alexa",
            "HELP_REPROMPT" : "I must be speaking in manbun, sorry about that",
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
 };

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId=APP_ID;
	// To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
	    'Unhandled': function () {
        this.emit(':ask', 'What did you mean?', "Damn are you that drunk or just british?");
    }
};