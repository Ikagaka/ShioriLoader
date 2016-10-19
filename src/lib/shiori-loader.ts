/**
 * 'fs' - node.js/BrowserFS のファイルシステム
 */
export type FileSystemLike = any;

/**
 * SHIORIサブシステム
 */
export interface Shiori {
  /**
   * SHIORI/2.x, SHIORI/3.x load()
   * @param dirpath 'ghost/master'へのフルパス 末尾は必ずパスセパレータ(環境依存で'/'または'\')
   * @return ステータスコード
   */
  load(dirpath: string): Promise<number>;
  /**
   * SHIORI/2.x, SHIORI/3.x unload()
   * @return ステータスコード
   */
  unload(): Promise<number>;
  /**
   * SHIORI/2.x, SHIORI/3.x request()
   * @param request SHIORI/2.x, SHIORI/3.x リクエスト
   * @return SHIORI/2.x, SHIORI/3.x レスポンス
   */
  request(request: string): Promise<string>;
}

/** SHIORI判定関数 */
export interface ShioriDetector {
  /**
   * @param fs 'fs' - node.js/BrowserFS のファイルシステム
   * @param dirpath 'ghost/master'へのフルパス 末尾は必ずパスセパレータ(環境依存で'/'または'\')
   * @return SHIORIサブシステム
   * @detail 栞が判定できなかった場合、nullを返してください。
             栞が判定できたがロードできなかった場合、例外を発生してください。
   */
  (fs: FileSystemLike, dirpath: string): Promise<Shiori | null> | Shiori | null;
}

/** SHIORIサブシステムをロードするSingletonクラス */
export class ShioriLoader {
  /** SHIORI判定関数の配列 */
  static shioriDetectors: ShioriDetector[] = [];

  /**
   * SHIORIサブシステムを判定し初期化して返す
   * @param fs 'fs' - node.js/BrowserFS のファイルシステム
   * @param dirpath 'ghost/master'へのフルパス 末尾は必ずパスセパレータ(環境依存で'/'または'\')
   * @return SHIORIサブシステム
   * @throws {UnknownShioriError} 判定が全て失敗した場合
   * @detail 登録された栞判定関数を順番に実行し、最初に返された栞インスタンスを返します。
   *         すべての栞判定関数が栞インスタンスを返さなければ例外を発生します。
   */
  static async detectShiori(fs: FileSystemLike, dirpath: string) {
    for (const detector of ShioriLoader.shioriDetectors) {
      const shiori = await detector(fs, dirpath);
      if (shiori) return shiori;
    }
    throw new UnknownShioriError("unknown SHIORI subsystem");
  }
}

export class UnknownShioriError extends Error { }
