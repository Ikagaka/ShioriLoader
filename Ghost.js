// Generated by CoffeeScript 1.8.0
var Ghost;

Ghost = (function() {
  var Nar, Worker, _;

  _ = window["_"];

  Nar = window["Nar"];

  Worker = window["Worker"];

  function Ghost(directory) {
    var buffer, descriptTxt;
    console.log(directory);
    if (!directory["descript.txt"]) {
      throw new Error("descript.txt not found");
    }
    this.directory = directory;
    buffer = this.directory["descript.txt"].asArrayBuffer();
    descriptTxt = Nar.convert(buffer);
    this.descript = Nar.parseDescript(descriptTxt);
    this.worker = null;
  }

  Ghost.prototype.load = function(callback) {
    var buffers, directory, _ref;
    if (!this.directory[this.descript["shiori"]] && !this.directory["shiori.dll"]) {
      return callback(new Error("shiori not found"));
    }
    switch (Ghost.detectShiori(this.directory)) {
      case "satori":
        this.worker = new Worker("./SatoriWorker.js");
        break;
      case "yaya":
        this.worker = new Worker("./YAYAWorker.js");
        break;
      case "aya5":
        this.worker = new Worker("./AYA5Worker.js");
        break;
      case "kawari":
        this.worker = new Worker("./KawariWorker.js");
        break;
      case "miyojs":
        this.worker = new Worker("./MiyoJSWorker.js");
        break;
      default:
        return callback(new Error("cannot detect shiori type: " + this.descript["shiori"]));
    }
    _ref = Ghost.createTransferable(this.directory), directory = _ref.directory, buffers = _ref.buffers;
    this.worker.postMessage({
      event: "load",
      data: directory
    }, buffers);
    this.worker.onmessage = function(_arg) {
      var error, event, _ref1;
      _ref1 = _arg.data, event = _ref1.event, error = _ref1.error;
      if (event === "loaded") {
        return callback(error);
      }
    };
    return void 0;
  };

  Ghost.prototype.request = function(request, callback) {
    this.worker.postMessage({
      event: "request",
      data: request
    });
    this.worker.onmessage = function(_arg) {
      var error, event, response, _ref;
      _ref = _arg.data, event = _ref.event, error = _ref.error, response = _ref.data;
      if (event === "response") {
        return callback(error, response);
      }
    };
    return void 0;
  };

  Ghost.prototype.unload = function(callback) {
    this.worker.postMessage({
      event: "unload"
    });
    this.worker.onmessage = function(_arg) {
      var error, event, _ref;
      _ref = _arg.data, event = _ref.event, error = _ref.error;
      if (event === "unloaded") {
        return callback(error);
      }
    };
    return void 0;
  };

  Ghost.detectShiori = function(directory) {
    if (!!directory["kawarirc.kis"]) {
      return "kawari";
    }
    if (!!directory["satori_conf.txt"]) {
      return "satori";
    }
    if (!!directory["yaya.dll"]) {
      return "yaya";
    }
    if (!!directory["aya5.dll"]) {
      return "aya5";
    }
    if (!!directory["node.exe"]) {
      return "miyojs";
    }
    return "";
  };

  Ghost.createTransferable = function(_directory) {
    return Object.keys(_directory).filter(function(filepath) {
      return !!filepath;
    }).reduce((function(_arg, filepath) {
      var buffer, buffers, directory;
      directory = _arg.directory, buffers = _arg.buffers;
      buffer = _directory[filepath].asArrayBuffer();
      directory[filepath] = buffer;
      buffers.push(buffer);
      return {
        directory: directory,
        buffers: buffers
      };
    }), {
      directory: {},
      buffers: []
    });
  };

  return Ghost;

})();
