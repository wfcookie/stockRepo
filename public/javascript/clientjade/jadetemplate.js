this["JST"] = this["JST"] || {};

this["JST"]["alert"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (info, label) {
buf.push("<div><p>" + (jade.escape((jade_interp = label.alert) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = info.message) == null ? '' : jade_interp)) + "</p></div>");}.call(this,"info" in locals_for_with?locals_for_with.info:typeof info!=="undefined"?info:undefined,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return buf.join("");
};

this["JST"]["warning"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (info, lable) {
buf.push("<div><p>" + (jade.escape((jade_interp = lable.warning) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = info.message) == null ? '' : jade_interp)) + "</p></div>");}.call(this,"info" in locals_for_with?locals_for_with.info:typeof info!=="undefined"?info:undefined,"lable" in locals_for_with?locals_for_with.lable:typeof lable!=="undefined"?lable:undefined));;return buf.join("");
};