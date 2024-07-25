# AI Bot

AI Bot is an Angular application that integrates with various npm packages to provide a set of features, including Google Cloud Speech-to-Text, translation services, and more.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features
- Integrates with Google Cloud Speech-to-Text.
- Uses Axios for HTTP requests.
- Manages environment variables with dotenv.
- Express.js server for backend support.
- Angular Material for UI components.

## Prerequisites
- Node.js and npm
- Angular CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MizNum/Frontend_AI-Bot.git
   cd ai-bot

## Install Angular CLI globally if not already installed:
npm install -g @angular/cli

## Install the project dependencies:
npm install

## Running on Local Server
ng serve

## Project Structure
ai-bot/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── ...
│   ├── assets/
│   ├── environments/
│   ├── main.ts
│   ├── styles.css
│   └── ...
├── .gitignore
├── angular.json
├── package.json
├── README.md
└── ...

## Dependencies
The project uses the following npm packages:

`@angular/animations`
`@angular/cdk`
`@angular/common`
`@angular/compiler`
`@angular/core`
`@angular/forms`
`@angular/material`
`@angular/platform-browser`
`@angular/platform-browser-dynamic`
`@angular/platform-server`
`@angular/router`
`@angular/ssr`
`@google-cloud/speech`
`axios`
`dotenv`
`express`
`rxjs`
`tslib`
`zone.js`




# Service

A service that provides OTP verification and translation functionalities using various npm packages like `nodemailer`, `express`, `axios`, and more.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Send OTP](#send-otp)
  - [Translate Text](#translate-text)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features
- Send OTP via email using Nodemailer.
- Translate text between different languages using an external translation service.
- RESTful API endpoints for sending OTP and translating text.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/service.git
   cd service

npm install
nodemon
Endpoint: /sendOtp

Method: POST
Description: Sends an OTP to the specified email.

Request Body:
{
  "email": "user@example.com"
}

Response:
{
  "OtpGenrated": true,
  "Otp": 123456
}



The following environment variables need to be set in a .env file:

GMAIL_ID=your-email@gmail.com
GMAIL_PASS=your-email-password
GS_KEY_URL=your-google-translate-api-url

`@google-cloud/speech`
`axios`
`cors`
`crypto`
`dotenv`
`express`
`form-data`
`fs-extra`
`moment`
`multer`
`nodemailer`
`nodemon`

For more details, refer to the package.json file.


Contributions are welcome! Please fork the repository and submit a pull request for review.


This `README.md` file provides a clear and concise overview of the project, including setup instructions, usage examples, and contribution guidelines.


