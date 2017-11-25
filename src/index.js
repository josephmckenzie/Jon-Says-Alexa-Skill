'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.f578b6d9-bea2-4454-8a0c-89bd3b358ca4';  // TODO replace with your app ID (OPTIONAL).
var RepeatNameIntent = require('./repeat-name-intent.js');


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


	console.log(jonsaysarray,'Persons Dddddrinking')
	});
};
var req = https.request(options, callback).end();
var languageStrings = {
    "en": {
        "translation": {
            "phrases": jonsaysarray,
            "SKILL_NAME" : 'Jon\'s Facts of Life & More',
            "JON_SAYS" : '<break time="5s"/>',
            "HELP_MESSAGE" : 'You can say What would Jon say, or not. It doesn\'t matter to Alexa',
            "HELP_REPROMPT" : '<emphasis level="strong">This is a simple skill , Do you really need help? If so consult a shrink</emphasis>',
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
    "en-US": {
        "translation": {
            "phrases": jonsaysarray,
            "SKILL_NAME" : "Jon's Facts of Life & More ",
									   "JON_SAYS" : '<break time="5s"/>',
            "HELP_MESSAGE" : "You can say What would Jon say, or not. It doesn't matter to Alexa",
            "HELP_REPROMPT" : '<emphasis level="strong">This is a simple skill , Do you really need help? If so consult a shrink</emphasis>',
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
    "en-GB": {
        "translation": {
            "phrases": jonsaysarray,
            "SKILL_NAME" : "Jon's Facts of Life & More",
									   "JON_SAYS" : '<break time="1s"/>',
            "HELP_MESSAGE" : "Top of the morning to you, got any kippers?",
            "HELP_REPROMPT" : '<emphasis level="strong">This is a simple skill , Do you really need help? If so consult a shrink</emphasis>',
            "STOP_MESSAGE" : "Stop, do you mean stop poking fun at Jon? NEVER!"
        }
    },
 };

var handlers = {
    'LaunchRequest': function () {
							this.emit(':ask', "Would you like to hear a Jon says phrase today?"); 
				},
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var phrasesArray = this.t('phrases');
        var index = Math.floor(Math.random() * phrasesArray.length);
        var randomFact = phrasesArray[index];
console.log(phrasesArray)
        // Create speech output
        var speechOutput = randomFact + this.t("JON_SAYS") + "Would you like to hear another?";
        this.emit(':ask', speechOutput)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_REPROMPT");
					
					
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
    },
    'AMAZON.YesIntent': function () {
                this.emit('GetFact');

    },'AMAZON.NoIntent': function() {
					  this.emit(':tell', 'Well you\'re no fun, but ALexa still loves you. Be sure to check back regularly for new Jon Says phrases')
				}
};


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context,callback);
    alexa.appId=APP_ID;
	// To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


