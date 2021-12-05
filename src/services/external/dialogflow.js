"use strict";

const dialogflow = require("@google-cloud/dialogflow");

async function detectIntent(bot, sessionId, queryInput, contexts, audio64) {
  const projectId = bot.project_id;
  const credentials = {
    client_email: bot.client_email,
    private_key: bot.private_key,
  };

  const sessionClient = new dialogflow.SessionsClient({
    projectId,
    credentials,
  });

  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  let request = {
    session: sessionPath,
    queryInput,
    outputAudioConfig: {
      audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
      sampleRateHertz: 44100,
    },
  };

  if (audio64) {
    request = {
      ...request,
      inputAudio: audio64,
    };
  }

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);

  return responses[0];
}

async function sendTextMessage(bot, sessionId, text, languageCode) {
  let context;
  let intentResponse;

  const queryInput = {
    text: {
      text: text,
      languageCode,
    },
  };

  try {
    intentResponse = await detectIntent(bot, sessionId, queryInput, context);
    context = intentResponse.queryResult.outputContexts;

    return intentResponse;
  } catch (error) {
    console.log(error);
  }
}

async function sendAudioMessage(bot, sessionId, audio64, languageCode) {
  let context;
  let intentResponse;

  const queryInput = {
    audioConfig: {
      languageCode,
    },
  };

  try {
    intentResponse = await detectIntent(
      bot,
      sessionId,
      queryInput,
      context,
      audio64
    );
    context = intentResponse.queryResult.outputContexts;

    return intentResponse;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendTextMessage,
  sendAudioMessage,
};
