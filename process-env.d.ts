declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            PUSH_CHANNEL: string
            PUSH_EVENT: string
            PUSH_APP_ID: string
            PUSH_APP_KEY: string
            PUSH_APP_SECRET: string
            PUSH_APP_CLUSTER: string
            PUSH_APP_TLS: boolean
            // add more environment variables and their types here
        }
    }
}