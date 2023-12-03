'use strict';

/**
 * google-classroom.js controller
 *
 * @description: A set of functions called "actions" of the `google-classroom` plugin.
 */

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const process = require('process');

const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];
const TOKEN_PATH = path.join(__dirname, 'token.json'); // Adjusted path for token.json
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json'); // Adjusted path for credentials.json


async function loadSavedCredentialsIfExist() {
  try {
    console.log('Loading saved credentials...');
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    console.log('Saved credentials loaded successfully.');
    return google.auth.fromJSON(credentials);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('token.json file not found. A new token will be created upon successful authorization.');
      return null;
    }
    console.log('Error loading saved credentials:', err);
    return null;
  }
}

async function saveCredentials(client) {
  try {
    console.log('Saving credentials...');
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
    console.log('Credentials saved successfully.');
  } catch (err) {
    console.log('Error saving credentials:', err);
  }
}

async function authorize() {
  console.log('Authorizing...');
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    console.log('Authorization successful with saved credentials.');
    return client;
  }
  const { authenticate } = require('@google-cloud/local-auth');
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  console.log('Authorization successful with new credentials.');
  return client;
}

async function listCourses(auth) {
  try {
    console.log('Listing courses...');
    const classroom = google.classroom({ version: 'v1', auth });
    const res = await classroom.courses.list({
      pageSize: 10,
    });
    const courses = res.data.courses || [];
    console.log(`Found ${courses.length} courses.`);
    return courses;
  } catch (err) {
    console.log('Error listing courses:', err);
    throw err; // Rethrow the error to be handled in getCourses
  }
}

module.exports = {
  async getCourses(ctx) {
    try {
      console.log('Processing request to get courses...');
      const auth = await authorize();
      const courses = await listCourses(auth);
      if (!courses.length) {
        console.log('No courses found.');
        return ctx.send({ message: 'No courses found.' }, 404);
      }
      console.log('Sending courses data.');
      ctx.send(courses);
    } catch (error) {
      console.log('Error in getCourses:', error.message);
      ctx.send({ message: error.message }, 500);
    }
  }
};
