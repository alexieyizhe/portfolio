"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var style_value_types_1 = require("style-value-types");
var composite_1 = require("../compositors/composite");
var parallel_1 = require("../compositors/parallel");
var transformers_1 = require("../transformers");
var isColor = style_value_types_1.color.test;
var convertToColorAction = function (init, props) { return (typeof props.from === 'string' && isColor(props.from) &&
    typeof props.to === 'string' && isColor(props.to)) ? init(__assign({}, props, { from: 0, to: 1 })).pipe(transformers_1.blendColor(props.from, props.to), style_value_types_1.color.transform)
    : init(props); };
var createVectorTests = function (typeTests) {
    var testNames = Object.keys(typeTests);
    return {
        getVectorKeys: function (props) { return testNames.reduce(function (vectorKeys, key) {
            if (props[key] !== undefined && !typeTests[key](props[key])) {
                vectorKeys.push(key);
            }
            return vectorKeys;
        }, []); },
        test: function (props) { return props && testNames.reduce(function (isVector, key) {
            return isVector || (props[key] !== undefined && !typeTests[key](props[key]));
        }, false); }
    };
};
var reduceArrayValue = function (i) { return function (props, key) {
    props[key] = props[key][i];
    return props;
}; };
var createArrayVector = function (init, props, vectorKeys) {
    var firstVectorKey = vectorKeys[0];
    var actionList = props[firstVectorKey].map(function (v, i) {
        return convertToColorAction(init, vectorKeys.reduce(reduceArrayValue(i), __assign({}, props)));
    });
    return parallel_1.default.apply(void 0, actionList);
};
var reduceObjectValue = function (key) { return function (props, propKey) {
    props[propKey] = props[propKey][key];
    return props;
}; };
var createObjectVector = function (init, props, vectorKeys) {
    var firstVectorKey = vectorKeys[0];
    var actionMap = Object.keys(props[firstVectorKey]).reduce(function (map, key) {
        map[key] = convertToColorAction(init, vectorKeys.reduce(reduceObjectValue(key), __assign({}, props)));
        return map;
    }, {});
    return composite_1.default(actionMap);
};
var createColorVector = function (init, props) { return convertToColorAction(init, props); };
var vectorAction = function (init, typeTests) {
    var _a = createVectorTests(typeTests), test = _a.test, getVectorKeys = _a.getVectorKeys;
    return function (props) {
        var isVector = test(props);
        if (!isVector)
            return init(props);
        var vectorKeys = getVectorKeys(props);
        var testKey = vectorKeys[0];
        var testProp = props[testKey];
        if (Array.isArray(testProp)) {
            return createArrayVector(init, props, vectorKeys);
        }
        else if (typeof testProp === 'string' && isColor(testProp)) {
            return createColorVector(init, props, vectorKeys);
        }
        else {
            return createObjectVector(init, props, vectorKeys);
        }
    };
};
exports.default = vectorAction;
//# sourceMappingURL=vector.js.map