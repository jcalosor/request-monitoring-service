import {App} from './app';
import {PingService} from "./services/pingService";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const MONGODB_PORT = process.env.MONGODB_PORT ? parseInt(process.env.MONGODB_PORT) : 27017;

const appInstance = new App(PORT, MONGODB_PORT);

new PingService(appInstance.io);
appInstance.start();