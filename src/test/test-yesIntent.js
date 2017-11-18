/* jslint node: true */
/* jshint esnext: true */
/* eslint-env es6 */
require('commander');
var shoulditest = true
var expect = require('chai').expect;  
var lambdaToTest = require('../index');
var assert = require('chai').assert;
var context = require('aws-lambda-mock-context');
var ctx = context();

//Starts off making sure we can hang with Alexa, as she is a bad ass
describe("Tests for Jon Says, YESINTENTIntent", function() {  

var speechResponse = null ;
var speechError =  null;
    // Fires once for the group of tests, done is mocha's callback to 
    // let it know that an   async operation has completed before running the rest 
    // of the tests, 2000ms is the default timeout though
  
        //This fires the event to make ambda call as if alexa had iniated it
	before(function(done){
	        lambdaToTest.handler(
										{
												"session": {
														"new": false,
														"sessionId": "SessionId.a77f057c-94fb-4bcb-abee-c58acba11f8a",
														"application": {
																"applicationId": "amzn1.ask.skill.f578b6d9-bea2-4454-8a0c-89bd3b358ca4"
														},
														"attributes": {
															"userPromptedToContinue": true
														},
														"user": {
																"userId": 			"amzn1.ask.account.AETUVRBEUZJC57A44724CLQ6JKH3PBTE6BBEQZW2AYUZRNBDI3ZGLVLIU6TLXJV57FSIM5PZ2LTRUKHKEIWDGGATZDZVJFTO73AW44DU5I7BMZ6VTKV3LO5LSK7QEAUMCGAMSRH5Q42TCNEFM6U4VCSVMXMAZIYDCVKN5DVBRZXVGU3TXUAC7QP7K4XDYJ6NSJ6XAWDVITC6SUY"
														}
												},
												"request": {
														"type": "IntentRequest",
														"requestId": "EdwRequestId.1754fa3f-86a2-4a13-9dca-071d922f38a9",
														"intent": {
																"name": "AMAZON.YesIntent",
																"slots": {}
														},
														"locale": "en-US",
														"timestamp": "2017-11-17T01:17:54Z"
												},
												"context": {
														"AudioPlayer": {
																"playerActivity": "IDLE"
														},
														"System": {
																"application": {
																		"applicationId": "amzn1.ask.skill.f578b6d9-bea2-4454-8a0c-89bd3b358ca4"
																},
																"user": {
																		"userId": 	"amzn1.ask.account.AETUVRBEUZJC57A44724CLQ6JKH3PBTE6BBEQZW2AYUZRNBDI3ZGLVLIU6TLXJV57FSIM5PZ2LTRUKHKEIWDGGATZDZVJFTO73AW44DU5I7BMZ6VTKV3LO5LSK7QEAUMCGAMSRH5Q42TCNEFM6U4VCSVMXMAZIYDCVKN5DVBRZXVGU3TXUAC7QP7K4XDYJ6NSJ6XAWDVITC6SUY"
																},
																"device": {
																		"supportedInterfaces": {}
																}	
														}
												},
												"version": "1.0"
										},
										ctx
								);
    //Captures the response and/or errors
		ctx.Promise
				.then(resp => { speechResponse = resp; done(); })
				.catch(err => { speechError = err; done(); });
 })
// The initial launch of our Alexa app
    describe('Should give a prompt with our YESINTENTmessage', function() {
        //console.log(intentName,intentType,isIntentNew);
								it('Jon still says it SHOULD BE TESTED', function() {
												if (shoulditest == true){
													console.log("Jon Says Test Test Test");
												};
											 expect(shoulditest).to.be.true;
								});
        it('should not have errored (Whole Intent)',function() {
            expect(speechError).to.be.a('null');
        });
        it('should have a version (Whole Intent)', function() {
            expect(speechResponse.version).not.to.be.a('null');
        });
        it('should have session attributes (Whole Intent)', function() {
            expect(speechResponse.response.sessionAttributes).not.to.be.a('null');
        });
        it('should tell us that in came back a SSML message type. (First YESINTENTMessage)', function() {
            assert.equal(speechResponse.response.outputSpeech.type, 'SSML');
        });
        it('should have a speechlet response ready to speak. (First YESINTENTMessage)', function() {
            expect(speechResponse.response).not.to.be.a('null');
        });
					   it('should have a spoken response. (First YESINTENTMessage)', function() {
            expect(speechResponse.response.outputSpeech).not.to.be.a('null');
        });
					   it('should give a jon says phrase that is not null. (First YESINTENTMessage)', function() {
            expect(speechResponse.response.outputSpeech.ssml).not.to.be.a('null');
								});
        it('should not close the Alexa session. (Whole Intent)', function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null,
            expect(speechResponse.response.shouldEndSession).to.be.true;
        }); 
					   
          //We have now successfully launched our skill, with everything coming back correctly in all formats
    });
 });