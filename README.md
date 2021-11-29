# BVISION REST API

Api to connect de BVISION app with dialogflow and a ddbb

## Install

    npm install

## Run the app

    npm start
    

## Request & Response Examples

### POST /device

Example: `http://localhost:3000/api/device`

Request body

    {
        "bot": "{bot-id}",
        "model": "{device-model}"
    }

Response body

    {
        "device": {
            "users": [],
            "bot": "{bot-id}",
            "model": "{device-model}",
            "_id": "{device-id}",
            "active_tuppers": [],
        }
    }


### POST /user

Example: `http://localhost:3000/api/user`

Request body

    {
        "name": "{name}",
        "phone": "{phone-number}",
        "email": "{email}",
        "device": "{device-id}"
    }

Response body

    {
        "user": {
            "name": "{name}",
            "phone": "{phone-number}",
            "email": "{email}",
            "device": "{device-id}",
            "_id": "{user-id}",
        }
    }


### POST /message

Example: `http://localhost:3000/api/message`

Request body

    {
        "message": {
            "message": "{text-message}",
            "type": "text"
        },
        "user": "{user-id}",
        "language": "es-ES",
        "saveInDb": true
    }

Response body

    {
        "request": {
            "message": {
                "audio": null,
                "text": "{text-message}"
            }
        },
        "response": {
            "message": {
                "text": "{text-response}"
            },
            "payload": {}
        }
    }
