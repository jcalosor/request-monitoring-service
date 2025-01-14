import dotenv from 'dotenv';
dotenv.config();

const env = process.env;

const notificationConfig = {
    channel: env.PUSH_CHANNEL,
    event: env.PUSH_EVENT,
    appId: env.PUSH_APP_ID,
    key: env.PUSH_APP_KEY,
    secret: env.PUSH_APP_SECRET,
    cluster: env.PUSH_APP_CLUSTER,
    useTLS: env.PUSH_APP_TLS,
}

export default notificationConfig;