'use strict';

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _props = require('../props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = _rx2.default.Observable.timer(0, 60000);
var oldState = void 0;

timer.map(function () {
    return _rx2.default.Observable.fromPromise(_props.api.lights());
});

timer.subscribe(function (state) {
    if ((0, _objectHash2.default)(state) !== oldState) {
        oldState = (0, _objectHash2.default)(state);
        (0, _props.push)('heartbeat', { state: state });
    }
});

//# sourceMappingURL=heartbeat.js.map