'use strict';

var _fs = require('fs');

var _path = require('path');

(0, _fs.readdirSync)('../tasks').filter(function (file) {
  return file.matches(/.*\.js/);
}).map(function (file) {
  return require((0, _path.join)('../tasks', file));
});

//# sourceMappingURL=agent.js.map