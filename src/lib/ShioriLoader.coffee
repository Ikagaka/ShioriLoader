# Ikagaka SHIORI loader class
class ShioriLoader

  # SHIORI detector object list
  @shiori_detectors: []

  # SHIORI subsystems
  @shiories: {}

  # detect and initialize SHIORI subsystem
  # @param [node.js/BrowserFS Filesystem] fs the filesystem
  # @param [String] dirpath the 'ghost/master' path string that ends with path separator ('/' or '\')
  # @return [Promise<Shiori|Error>] SHIORI subsystem instance if detected
  @detect_shiori: (fs, dirpath)->
    iterate = (index) ->
      new Promise (resolve, reject) ->
        detector = ShioriLoader.shiori_detectors[index]
        if detector?
          resolve detector(fs, dirpath, ShioriLoader.shiories).then (shiori) ->
            if shiori?
              shiori
            else
              iterate(index + 1)
        else
          reject new Error("unknown SHIORI subsystem")
    iterate(0)

  # initialize SHIORI subsystem by name
  # @param [node.js/BrowserFS Filesystem] fs the filesystem
  # @param [String] shiori_name the name of SHIORI subsystem
  # @return [Promise<Shiori|Error>] SHIORI subsystem instance
  @get_shiori: (fs, shiori_name) ->
    new Promise (resolve, reject) ->
      resolve new ShioriLoader.shiories[shiori_name](fs)

if module?.exports?
  module.exports = ShioriLoader
else if window?
  window.ShioriLoader = ShioriLoader
