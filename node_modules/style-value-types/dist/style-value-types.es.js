/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var clamp = function (min, max) { return function (v) { return Math.max(Math.min(v, max), min); }; };
var contains = function (term) { return function (v) { return (typeof v === 'string' && v.indexOf(term) !== -1); }; };
var createUnitType = function (unit) { return ({
    test: contains(unit),
    parse: parseFloat,
    transform: function (v) { return "" + v + unit; }
}); };
var isFirstChars = function (term) { return function (v) { return (typeof v === 'string' && v.indexOf(term) === 0); }; };
var getValueFromFunctionString = function (value) { return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')')); };
var splitCommaDelimited = function (value) { return typeof value === 'string' ? value.split(/,\s*/) : [value]; };
function splitColorValues(terms) {
    var numTerms = terms.length;
    return function (v) {
        var values = {};
        var valuesArray = splitCommaDelimited(getValueFromFunctionString(v));
        for (var i = 0; i < numTerms; i++) {
            values[terms[i]] = (valuesArray[i] !== undefined) ? parseFloat(valuesArray[i]) : 1;
        }
        return values;
    };
}
var number = {
    test: function (v) { return typeof v === 'number'; },
    parse: parseFloat,
    transform: function (v) { return v; }
};
var alpha = __assign({}, number, { transform: clamp(0, 1) });
var degrees = createUnitType('deg');
var percent = createUnitType('%');
var px = createUnitType('px');
var scale = __assign({}, number, { default: 1 });
var FLOAT_REGEX = /(-)?(\d[\d\.]*)/g;
var generateToken = function (token) { return '${' + token + '}'; };
var complex = {
    test: function (v) {
        var matches = v.match && v.match(FLOAT_REGEX);
        return (matches !== undefined && matches.constructor === Array && matches.length > 1);
    },
    parse: function (v) {
        var parsedValue = {};
        v.match(FLOAT_REGEX).forEach(function (value, i) { return parsedValue[i] = parseFloat(value); });
        return parsedValue;
    },
    createTransformer: function (prop) {
        var counter = 0;
        var template = prop.replace(FLOAT_REGEX, function () { return generateToken("" + counter++); });
        return function (v) {
            var output = template;
            for (var key in v) {
                if (v.hasOwnProperty(key)) {
                    output = output.replace(generateToken(key), v[key].toString());
                }
            }
            return output;
        };
    }
};
var clampRgbUnit = clamp(0, 255);
var rgbUnit = __assign({}, number, { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
var rgbaTemplate = function (_a) {
    var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
    return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
};
var rgba = {
    test: isFirstChars('rgb'),
    parse: splitColorValues(['red', 'green', 'blue', 'alpha']),
    transform: function (_a) {
        var red = _a.red, green = _a.green, blue = _a.blue, alpha = _a.alpha;
        return rgbaTemplate({
            red: rgbUnit.transform(red),
            green: rgbUnit.transform(green),
            blue: rgbUnit.transform(blue),
            alpha: alpha
        });
    }
};
var hslaTemplate = function (_a) {
    var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
    return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " + alpha + ")";
};
var hsla = {
    test: isFirstChars('hsl'),
    parse: splitColorValues(['hue', 'saturation', 'lightness', 'alpha']),
    transform: function (_a) {
        var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, alpha = _a.alpha;
        return hslaTemplate({
            hue: Math.round(hue),
            saturation: percent.transform(saturation),
            lightness: percent.transform(lightness),
            alpha: alpha
        });
    }
};
var hex = __assign({}, rgba, { test: isFirstChars('#'), parse: function (v) {
        var r, g, b;
        if (v.length > 4) {
            r = v.substr(1, 2);
            g = v.substr(3, 2);
            b = v.substr(5, 2);
        }
        else {
            r = v.substr(1, 1);
            g = v.substr(2, 1);
            b = v.substr(3, 1);
            r += r;
            g += g;
            b += b;
        }
        return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: 1
        };
    } });
var isRgba = function (v) { return v.red !== undefined; };
var isHsla = function (v) { return v.hue !== undefined; };
var color = {
    test: function (v) { return rgba.test(v) || hsla.test(v) || hex.test(v); },
    parse: function (v) {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else if (hex.test(v)) {
            return hex.parse(v);
        }
        return v;
    },
    transform: function (v) {
        if (isRgba(v)) {
            return rgba.transform(v);
        }
        else if (isHsla(v)) {
            return hsla.transform(v);
        }
        return v;
    },
};

export { getValueFromFunctionString, splitCommaDelimited, splitColorValues, number, alpha, degrees, percent, px, scale, complex, rgbUnit, rgba, hsla, hex, color };
