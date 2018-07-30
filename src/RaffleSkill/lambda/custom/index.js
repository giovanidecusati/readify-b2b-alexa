/* eslint-disable  func-names */
/* eslint-disable  no-console */

const http = require('https');
const Alexa = require('ask-sdk-core');

function httpGet(callback) {
  var options = {
    host: 'rafflleb2b-app.azurewebsites.net',
    path: '/Home/Raffle',
    method: 'GET',
  };

  var req = http
    .request(options, res => {
      res.setEncoding('utf8');
      var responseString = '';

      //accept incoming data asynchronously
      res.on('data', chunk => {
        responseString = responseString + chunk;
      });

      //return the data when streaming is complete
      res.on('end', () => {
        console.log(responseString);
        callback(responseString);
      });
    })
    .on('error', err => {
      console.log('Error: ' + err.message);
    });

  req.end();
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText =
      'Welcome to the Raffle Skill, you can say raffle someone!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Raffle', speechText)
      .getResponse();
  },
};

const RaffleIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'RaffleIntent'
    );
  },
  handle(handlerInput) {
    var speechText = 'The winner is ';

    console.log('RaffleIntentHandler Begin: ' + JSON.stringify(handlerInput));

    httpGet(result => {      
      console.log('HttpGet End: ' + result);
      speechText = speechText + result.name;
    });    

    console.log('RaffleIntentHandler End: ' + speechText);

    return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard('Raffle', speechText)
    .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speechText = 'You can ask Raffle someone!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Raffle', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name ===
        'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name ===
          'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Raffle', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${
        handlerInput.requestEnvelope.request.reason
      }`
    );

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    RaffleIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
