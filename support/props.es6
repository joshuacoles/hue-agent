import RMQ from './rmq'
import { HueApi } from 'node-hue-api'
import { user, ip } from '../private/hue.json'

const connection = new RMQ("amqp://localhost");
const topic = "lights";

export const pull = connection.declarePull("server2agents", topic);
export const push = connection.declarePush("agents2server");

export const api = new HueApi(ip, user);
