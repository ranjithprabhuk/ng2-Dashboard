"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// main modules
__export(require('./directives'));
__export(require('./services'));
// Google Maps types
// core module
// we explicitly export the module here to prevent this Ionic 2 bug:
// http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/
var core_module_1 = require('./core-module');
exports.AgmCoreModule = core_module_1.AgmCoreModule;
//# sourceMappingURL=index.js.map