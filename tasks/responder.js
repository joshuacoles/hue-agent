'use strict';

var _backend = require('../support/backend');

var _props = require('../support/props');

_props.pull.subscribe(function (message) {
    var topic = msg.fields.routingKey;
    var data = JSON.parse(msg.content.toString());
    var method = topic.slice(data.meta.realm.length);

    if (method === 'fetch') {
        (0, _props.push)(topic, {
            data: (0, _backend.fetch)(data.query),
            meta: data.meta
        });
    } else if (method === 'put') {
        (0, _props.push)(topic, {
            ok: (0, _backend.put)(data.data),
            meta: data.meta
        });
    }
});

//# sourceMappingURL=responder.js.map