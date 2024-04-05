# Project Name

This is a simple to-do application project that uses Firebase for authentication and Firestore for data management. The project is written in TypeScript and uses Zustand for state management.

## Requirements

To run this project on your local machine, you will need:

- Node.js and npm installed. You can download them from [here](https://nodejs.org/).
- A Firebase account and a project set up with Firestore. You can create one from [here](https://firebase.google.com/).

## Setup

1. Clone this repository on your local machine using `git clone <repository_url>`.

2. Navigate to the project directory using `cd <directory_name>`.

3. Install the project dependencies using `npm install`.

4. Create a `.env` file at the root of the project and add the following environment variables with your respective Firebase configuration values:

  ```
  REACT_APP_FIREBASE_API_KEY=<your_api_key>
  REACT_APP_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
  REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>
  REACT_APP_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_messaging_sender_id>
  REACT_APP_FIREBASE_APP_ID=<your_app_id>
  ```

## Running

To run the project on your local machine, use the following command:

```bash
npm start