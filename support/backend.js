'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.put = exports.fetch = undefined;
//fixme implement reference

var fetch = exports.fetch = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return native2graphql((0, _graphql.graphql)(schema, query));

                    case 2:
                        return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function fetch(_x) {
        return ref.apply(this, arguments);
    };
}();

var put = exports.put = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(data) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _props.api.setLightState(state.id, graphql2native(state)).then(function () {
                            return true;
                        }, function (err) {
                            return err;
                        }).done();

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function put(_x2) {
        return ref.apply(this, arguments);
    };
}();

var native2graphql = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
        var status, graphql;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _props.api.lightStatus(1);

                    case 2:
                        status = _context3.sent;
                        graphql = {
                            id: id,
                            name: status.name,

                            state: status.state.on,
                            brightness: Math.floor(status.state.bri / 255 * 100),

                            colourMode: colourMode2ID(status.colormode)
                        };


                        if (status.colormode === 'ct') graphql.ct = status.ct;else if (status.colormode === 'xy') graphql.xy = status.xy;

                        return _context3.abrupt('return', graphql);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function native2graphql(_x3) {
        return ref.apply(this, arguments);
    };
}();

var _graphql = require('graphql');

var _props = require('./props');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var ColourMode = new GraphQLEnumType({
    name: 'ColorMode',
    values: {
        CT: { value: 0 },
        XY: { value: 1 }
    }
});

var Bulb = new _graphql.graphql.GraphQLObjectType({
    name: 'Bulb',
    fields: {
        id: { type: new _graphql.graphql.GraphQLNonNull(_graphql.graphql.GraphQLString) },
        name: { type: new _graphql.graphql.GraphQLNonNull(_graphql.graphql.GraphQLString) },

        state: { type: new _graphql.graphql.GraphQLNonNull(_graphql.graphql.GraphQLBoolean) },
        brightness: { type: new _graphql.graphql.GraphQLNonNull(_graphql.graphql.GraphQLInt) },

        colourMode: { type: ColourMode },
        xy: { type: new _graphql.graphql.GraphQLList(_graphql.graphql.GraphQLInt) },
        ct: { type: _graphql.graphql.GraphQLInt }
    }
});

var schema = new _graphql.graphql.GraphQLSchema({
    query: new _graphql.graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            bulb: {
                type: Bulb,
                args: {
                    id: { type: _graphql.graphql.GraphQLString }
                },
                resolve: function resolve(_, args) {
                    return native2graphql(args.id);
                } }
        }
    })
});

function graphql2native(state) {
    var out = lightState.create().on(state.state).brightness(state.brightness);

    if (state.colormode === 0) out.ct(state.ct);else if (state.colormode === 1) out.rgb(state.rgb);

    return out;
}

function colourMode2ID(colourMode) {
    if (colourMode === 'ct') return 0;else if (colourMode === 'xy') return 1;else return -1;
}

//# sourceMappingURL=backend.js.map