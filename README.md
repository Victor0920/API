# BVISION REST API

Api to connect de BVISION app with dialogflow and a ddbb

## Install

    npm install

## Run the app

    npm start
    

# REST API

The REST API to the example app is described below.


## Send a message

### Request

`POST /api/message`

    curl --request POST 'http://localhost:3000/api/message' \
         --header 'Content-Type: application/json' 'Authorization: {your-key}' \
         --data-raw '{
             "message": "{your-text}",
             "type": "text",
             "language": "es"
         }'

### Response

    {"message": "¡Hola! ¿Qué tal?"}
