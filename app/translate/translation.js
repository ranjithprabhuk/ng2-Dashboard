"use strict";
var core_1 = require('@angular/core');
// import translations
var lang_en_1 = require('./lang-en');
var lang_zh_1 = require('./lang-zh');
// translation token
exports.TRANSLATIONS = new core_1.OpaqueToken('translations');
// all translations
var dictionary = (_a = {},
    _a[lang_en_1.LANG_EN_NAME] = lang_en_1.LANG_EN_TRANS,
    _a[lang_zh_1.LANG_ZH_NAME] = lang_zh_1.LANG_ZH_TRANS,
    _a
);
// providers
exports.TRANSLATION_PROVIDERS = [
    { provide: exports.TRANSLATIONS, useValue: dictionary },
];
var _a;
//# sourceMappingURL=translation.js.map