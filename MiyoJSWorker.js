// Generated by CoffeeScript 1.7.1
var shiori;

self.importScripts("node_modules/ikagaka.nar.js/node_modules/encoding-japanese/encoding.js");

self.importScripts("node_modules/shiorijk/lib/shiorijk.js");

self.importScripts("node_modules/miyojs-filter-autotalks/autotalks.js");

self.importScripts("node_modules/miyojs-filter-default_response_headers/default_response_headers.js");

self.importScripts("node_modules/miyojs-filter-property/property.js");

self.importScripts("node_modules/miyojs-filter-variables/variables.js");

self.importScripts("node_modules/miyojs-filter-value_filters/value_filters.js");

self.importScripts("node_modules/miyojs/node_modules/js-yaml/dist/js-yaml.min.js");

self.importScripts("node_modules/miyojs/lib/miyo.js");

shiori = null;

self.onmessage = function(_arg) {
  var data, dictionary, directory, event, paser, request, requestTxt, response, responseTxt, _ref;
  _ref = _arg.data, event = _ref.event, data = _ref.data;
  switch (event) {
    case "load":
      directory = data;
      dictionary = Object.keys(directory).filter(function(filepath) {
        return /^dictionaries\/[^/]+$/.test(filepath);
      }).reduce((function(dictionary, filepath) {
        var dic, tabIndentedYaml, uint8Arr, yaml;
        uint8Arr = new Uint8Array(directory[filepath]);
        tabIndentedYaml = Encoding.codeToString(Encoding.convert(uint8Arr, 'UNICODE', 'AUTO'));
        yaml = tabIndentedYaml.replace(/\t/g, ' ');
        dic = jsyaml.safeLoad(yaml);
        Miyo.DictionaryLoader.merge_dictionary(dic, dictionary);
        return dictionary;
      }), {});
      shiori = new Miyo(dictionary);
      shiori.load({});
      console.log(shiori);
      return self.postMessage({
        "event": "loaded",
        "error": null
      });
    case "request":
      requestTxt = data;
      paser = new ShioriJK.Shiori.Request.Parser();
      request = paser.parse(requestTxt);
      console.log(request);
      response = shiori.request(request);
      console.log(response);
      responseTxt = "" + response;
      return self.postMessage({
        event: "response",
        error: null,
        data: responseTxt
      });
    case "unload":
      shiori.unload();
      return self.postMessage({
        event: "unloaded",
        error: null
      });
    default:
      throw new Error(event + " event not support");
  }
};