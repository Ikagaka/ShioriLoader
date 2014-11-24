// Generated by CoffeeScript 1.8.0
var FS, Module, shiori;

self.importScripts("node_modules/ikagaka.nar.js/node_modules/encoding-japanese/encoding.js");

self.importScripts("node_modules/shiorijk/lib/shiorijk.js");

self.importScripts("vender/libsatori.js");

self.importScripts("vender/satorishiori.js");

shiori = new SatoriShiori();

Module = shiori.Module;

FS = shiori.FS;

Module['logReadFiles'] = true;

self.onmessage = function(_arg) {
  var data, directory, dirname, error, event, filepath, filestr, request, response, uint8arr, _i, _len, _ref, _ref1;
  _ref = _arg.data, event = _ref.event, data = _ref.data;
  switch (event) {
    case "load":
      directory = data;
      _ref1 = Object.keys(directory);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        filepath = _ref1[_i];
        dirname = filepath.replace(/[^\/]*$/, '');
        try {
          FS.stat("/home/web_user/" + dirname);
        } catch (_error) {
          error = _error;
          console.log('mkdir ' + "/home/web_user/" + dirname);
          FS.mkdir("/home/web_user/" + dirname.replace(/\/$/, ""));
        }
        if (!/\/$/.test(filepath)) {
          uint8arr = new Uint8Array(directory[filepath]);
          console.log("/home/web_user/" + filepath, uint8arr.length);
          if (/\bsatori_conf\.txt$/.test(filepath)) {
            filestr = Encoding.codeToString(Encoding.convert(uint8arr, 'UNICODE', 'SJIS'));
            filestr = filestr.replace(/＠SAORI/, '＠NO__SAORI');
            uint8arr = Encoding.convert(Encoding.stringToCode(filestr), 'SJIS', 'UNICODE');
          }
          FS.writeFile("/home/web_user/" + filepath, uint8arr, {
            encoding: 'binary'
          });
        }
      }
      FS.chdir('/home/web_user');
      console.log(shiori.load("/home/web_user/"));
      return self.postMessage({
        "event": "loaded",
        "error": null
      });
    case "request":
      request = data;
      console.log(request);
      response = shiori.request(request);
      console.log(response);
      return self.postMessage({
        event: "response",
        error: null,
        data: response
      });
    case "unload":
      console.log(shiori.unload());
      return self.postMessage({
        event: "unloaded",
        error: null
      });
    default:
      throw new Error(event + " event not support");
  }
};
