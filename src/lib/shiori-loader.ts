export type ShioriDetector = (fs: any, dirpath: string, shiories: {[key: string]: any}) => any;

/** Ikagaka SHIORI loader class */
export class ShioriLoader {
  /** SHIORI detector function list */
  static shioriDetectors: ShioriDetector[] = [];

  /** SHIORI subsystem classes */
  static shiories: {[key: string]: any} = {};

  /** detect and initialize SHIORI subsystem
   * @param [node.js/BrowserFS Filesystem] fs the filesystem
   * @param dirpath the 'ghost/master' path string that ends with path separator ('/' or '\')
   * @return SHIORI subsystem instance if detected
   * @throws {UnknownShioriError} if detect failed
   */
  static async detectShiori(fs: any, dirpath: string) {
    for (const detector of ShioriLoader.shioriDetectors) {
      const shiori = await detector(fs, dirpath, ShioriLoader.shiories);
      if (shiori) return shiori;
    }
    throw new UnknownShioriError("unknown SHIORI subsystem");
  }

  /** initialize SHIORI subsystem by name
   * @param [node.js/BrowserFS Filesystem] fs the filesystem
   * @param [String] shiori_name the name of SHIORI subsystem
   * @return [Promise<Shiori|Error>] SHIORI subsystem instance
   */
  static async getShiori(fs: any, shiori_name: string) {
    return new ShioriLoader.shiories[shiori_name](fs);
  }
}

export class UnknownShioriError extends Error { }
