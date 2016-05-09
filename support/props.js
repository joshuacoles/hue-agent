'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.push = exports.pull = undefined;

var _rmq = require('./rmq');

var _rmq2 = _interopRequireDefault(_rmq);

var _nodeHueApi = require('node-hue-api');

var _hue = require('../private/hue.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = new _rmq2.default("amqp://localhost");
var topic = "lights";

var pull = exports.pull = connection.declarePull("server2agents", topic);
var push = exports.push = connection.declarePush("agents2server");

var api = exports.api = new _nodeHueApi.HueApi(_hue.ip, _hue.user);

//# sourceMappingURL=props.js.map