const dialogflow = require("@google-cloud/dialogflow");

const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
  projectId,
  sessionId,
  queryInput,
  contexts,
  audio64
) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  let request = {
    session: sessionPath,
    queryInput,
  };

  if (audio64) {
    request = {
      ...request,
      inputAudio: audio64,
      outputAudioConfig: {
        audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
        sampleRateHertz: 44100
      },
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

async function sendTextMessage(projectId, sessionId, text, languageCode) {
  let context;
  let intentResponse;

  const queryInput = {
    text: {
      text: text,
      languageCode,
    },
  };

  try {
    intentResponse = await detectIntent(
      projectId,
      sessionId,
      queryInput,
      context
    );
    // Use the context from this response for next queries
    context = intentResponse.queryResult.outputContexts;

    return intentResponse;
  } catch (error) {
    console.log(error);
  }
}

async function sendAudioMessage(projectId, sessionId, audio64, languageCode) {
  let context;
  let intentResponse;

  const queryInput = {
    audioConfig: {
      languageCode,
    },
  };

  try {
    intentResponse = await detectIntent(
      projectId,
      sessionId,
      queryInput,
      context,
      audio64
    );
    // Use the context from this response for next queries
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
