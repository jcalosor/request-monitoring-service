import * as process from "node:process";

const env = process.env;

const notificationConfig = {
    channel: env.PUSH_CHANNEL || 'request_monitor',
    event: env.PUSH_EVENT || 'new_request',
}

export default notificationConfig;