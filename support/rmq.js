'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RMQ = function () {
    function RMQ(url) {
        _classCallCheck(this, RMQ);

        this.connection = _amqplib2.default.connect(url);
    }

    _createClass(RMQ, [{
        key: 'declarePush',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(id) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.connection.then(function (connection) {
                                    connection.createChannel().then(function (channel) {
                                        channel.assertExchange(id, 'topic', { durable: false }).then(function (_ref) {
                                            var exchange = _ref.exchange;

                                            return function (_ref2) {
                                                var topic = _ref2.topic;
                                                var data = _ref2.data;

                                                channel.publish(exchange, topic, new Buffer(JSON.stringify(data)));
                                            };
                                        });
                                    });
                                });

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function declarePush(_x) {
                return ref.apply(this, arguments);
            }

            return declarePush;
        }()
    }, {
        key: 'declarePull',
        value: function declarePull(id, key) {
            var _this = this;

            return _rx2.default.Observable.create(function (observer) {
                _this.connection.createChannel().then(function (channel) {
                    channel.assertExchange('server2agents', 'topic', { durable: false }).then(function () {
                        return channel.assertQueue('');
                    }).then(function (_ref3) {
                        var queue = _ref3.queue;

                        channel.bindQueue(queue, id, key);
                        return queue;
                    }).then(function (queue) {
                        return channel.consume(queue, function (msg) {
                            return observer.onNext(msg);
                        }, { noAck: true });
                    });
                });
            });
        }
    }]);

    return RMQ;
}();

exports.default = RMQ;

//# sourceMappingURL=rmq.js.map