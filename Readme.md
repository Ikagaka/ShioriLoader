# [ShioriLoader](https://github.com/Ikagaka/ShioriLoader)

伺かの栞サブシステムをロードします。

## 使用方法

    <script src="ShioriLoader.js"></script>
    <script src="shioridetector-common_names.js"></script>
    <script src="kawariworker.js"></script>

    var ShioriLoader = shioriLoader.ShioriLoader;
    ShioriLoader.shioriDetectors.push(function(){...}); // 追加の栞判定関数登録
    ShioriLoader.shioriDetectors.push(function(){...});
    // shioridetector-common_names.jsなど栞判定関数ライブラリを読み込めば自動的に登録されている。
    
    ShioriLoader.detectShiori().then(function(shiori){
      shiori.load(dirpath).then(...);
    }, function(error){
      throw error;
    });

## API ドキュメント

[API ドキュメント](https://ikagaka.github.io/ShioriLoader)

## References

- 栞判定関数 [shioridetector-common_names](https://github.com/Ikagaka/shioridetector-common_names)
- 栞クラス [kawariworker.js](https://github.com/Narazaka/kawariworker.js)

## License

This is released under [MIT License](http://narazaka.net/license/MIT?2016).
