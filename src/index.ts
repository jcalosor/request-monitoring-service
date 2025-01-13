import dotenv from 'dotenv';
import * as process from 'node:process';
import Pusher from "pusher";
import App from './app';

dotenv.config();

const PUSHER: Pusher = new Pusher({
    appId: process.env.PUSH_APP_ID || 'test',
    key: process.env.PUSH_APP_KEY || 'test',
    secret: process.env.PUSH_APP_SECRET || 'test',
    cluster: process.env.PUSH_APP_CLUSTER || 'test',
    useTLS: process.env.PUSH_APP_USER_TLS ? process.env.PUSH_APP_USER_TLS === "true" : false,
});

// Resolve the dependencies.
const PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 4000;
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 27017;
const DB_SCHEMA = process.env.DB_SCHEMA ? process.env.DB_SCHEMA.toString() : 'request-monitor';
const PING_INTERVAL = process.env.PING_INTERVAL ? parseInt(process.env.PING_INTERVAL, 10) : 1;

// Instantiate the main application.
const appInstance = new App(PUSHER, PORT, DB_PORT, DB_SCHEMA, PING_INTERVAL);

appInstance.start();
