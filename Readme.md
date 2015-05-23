# ShioriLoader

伺かの栞サブシステムをロードします。

## 使用方法

    <script src="ShioriLoader.js"></script>
    <script src="shioridetector-common_names.js"></script>
    <script src="kawariworker.js"></script>

    ShioriLoader.shiori_detectors.push(function(){...}); // 追加の栞判定関数登録
    ShioriLoader.shiori_detectors.push(function(){...});
    // shioridetector-common_names.jsなど栞判定関数ライブラリを読み込めば自動的に登録されている。
    
    ShioriLoader.shiories.myshiori = function(){...}; // 追加の栞クラス登録
    ShioriLoader.shiories.satori = function(){...};
    // など栞ライブラリを読み込めば自動的に登録されている。
    
    ShioriLoader.detect_shiori().then(function(shiori){
      shiori.load(dirpath).then(...);
    }, function(error){
      throw error;
    });

やりとりをすべて非同期で行うため、すべてのメソッドは`Promise`を返します。

## class ShioriLoader

栞サブシステムをロードするSingletonクラスです。

### `Array<ShioriDetector>` shiori_detectors *static*

    ShioriLoader.shiori_detectors.push(function(){...});

栞判定関数の配列です。

### `Object<string, class Shiori>` shiories *static*

    ShioriLoader.shiories.myshiori = myshiori_class;

栞名と栞クラスの連想配列です。

### `Promise<Shiori>` detect_shiori(`FileSystemLike` fs, `string` dirpath) *static*

    var dirpath = './ikagaka/ghost/myghost/ghost/master/';
    ShioriLoader.detect_shiori(fs, dirpath).then(function(shiori){
      shiori.load(dirpath).then(...);
    }, function(error){
      throw error;
    });

- fs: node.jsのFile Systemか、BrowserFSのファイルシステム。
- dirpath: SHIORI/2.x, SHIORI/3.x `load()`に渡されるものと同じ`ghost/master`へのフルパス。末尾は必ずパスセパレータ(`\`,`/`等 環境依存)。

登録された栞判定関数を順番に実行します。

栞判定関数が返した栞インスタンスを返します。

栞判定関数が`null`を返せば次の栞判定関数を実行します。

すべての栞判定関数が栞インスタンスを返さなければ例外を発生します。

### `Promise<Shiori>` get_shiori(`FileSystemLike` fs, `string` shiori_name) *static*

    var dirpath = './ikagaka/ghost/myghost/ghost/master/';
    ShioriLoader.get_shiori(fs, 'kawari').then(function(shiori){
      shiori.load(dirpath).then(...);
    }, function(error){
      throw error;
    });

- fs: node.jsのFile Systemか、BrowserFSのファイルシステム。
- shiori_name: shioriesに登録された栞名

指定された栞のインスタンスを返します。

失敗すれば例外を発生します。

## interface Shiori

SHIORI/2.x, SHIORI/3.x規格に準拠した栞サブシステムのインターフェースです。

登録される栞は以下のAPIに準拠するべきです。

### constructor(`FileSystemLike` fs)

- fs: node.jsのFile Systemか、BrowserFSのファイルシステム。

ゴーストのファイルを扱うインターフェースとしてfsが渡されます。

node.jsである場合とbrowserfsである場合があります。

### `Promise<int>` load(`string` dirpath)

- dirpath: SHIORI/2.x, SHIORI/3.x `load()`に渡されるものと同じ`ghost/master`へのフルパス。末尾は必ずパスセパレータ(`\`,`/`等 環境依存)。

SHIORI/2.x, SHIORI/3.x `load()`です。

`load()`の戻り値を返してください。

### `Promise<string>` request(`string` request)

- dirpath: SHIORI/2.x, SHIORI/3.x `request()`に渡されるものと同じSHIORI/2.x, SHIORI/3.x Request。

SHIORI/2.x, SHIORI/3.x `request()`です。

SHIORI/2.x, SHIORI/3.x Responseを返してください。

### `Promise<int>` unload()

SHIORI/2.x, SHIORI/3.x `unload()`です。

`unload()`の戻り値を返してください。

## interface ShioriDetector

栞を判定し、ロードする関数のインターフェースです。

登録される栞判定関数は以下のAPIに準拠するべきです。

### `Promise<Shiori|null>` (function)(`FileSystemLike` fs, `string` dirpath, `Object<string, class Shiori>` shiories)

- fs: node.jsのFile Systemか、BrowserFSのファイルシステム。
- dirpath: SHIORI/2.x, SHIORI/3.x `load()`に渡されるものと同じ`ghost/master`へのフルパス。末尾は必ずパスセパレータ(`\`,`/`等 環境依存)。
- shiories: 栞名と対応する栞クラスの連想配列。

fsとdirpathの情報から栞を判定し、shioriesから該当する栞クラスを選んでそのインスタンスを返してください。

栞が判定できなかった場合、nullを返してください。

栞が判定できたがロードできなかった場合、例外を発生してください。

## References

- 栞判定関数 [shioridetector-common_names](https://github.com/Ikagaka/shioridetector-common_names)
- 栞クラス [kawariworker.js](https://github.com/Narazaka/kawariworker.js)

## License

This is released under [MIT License](http://narazaka.net/license/MIT?2015).
