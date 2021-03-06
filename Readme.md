# [ShioriLoader](https://github.com/Ikagaka/ShioriLoader)

[![npm](https://img.shields.io/npm/v/shioriloader.svg)](https://www.npmjs.com/package/shioriloader)
[![npm license](https://img.shields.io/npm/l/shioriloader.svg)](https://www.npmjs.com/package/shioriloader)
[![npm download total](https://img.shields.io/npm/dt/shioriloader.svg)](https://www.npmjs.com/package/shioriloader)
[![npm download by month](https://img.shields.io/npm/dm/shioriloader.svg)](https://www.npmjs.com/package/shioriloader)

[![Dependency Status](https://david-dm.org/Ikagaka/ShioriLoader/status.svg)](https://david-dm.org/Ikagaka/ShioriLoader)
[![devDependency Status](https://david-dm.org/Ikagaka/ShioriLoader/dev-status.svg)](https://david-dm.org/Ikagaka/ShioriLoader?type=dev)
[![Travis Build Status](https://travis-ci.org/Ikagaka/ShioriLoader.svg?branch=master)](https://travis-ci.org/Ikagaka/ShioriLoader)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/Ikagaka/ShioriLoader?svg=true&branch=master)](https://ci.appveyor.com/project/Narazaka/ShioriLoader)
[![codecov.io](https://codecov.io/github/Ikagaka/ShioriLoader/coverage.svg?branch=master)](https://codecov.io/github/Ikagaka/ShioriLoader?branch=master)
[![Code Climate](https://codeclimate.com/github/Ikagaka/ShioriLoader/badges/gpa.svg)](https://codeclimate.com/github/Ikagaka/ShioriLoader)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e5dc7c833396442798f8c255580dfb27)](https://www.codacy.com/app/narazaka/ShioriLoader?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Ikagaka/ShioriLoader&amp;utm_campaign=Badge_Grade)
[![Greenkeeper badge](https://badges.greenkeeper.io/Ikagaka/ShioriLoader.svg)](https://greenkeeper.io/)

伺かの栞サブシステムをロードします。

## Usage

```html
<script src="ShioriLoader.js"></script>
<script src="shioridetector-common_names.js"></script>
<script src="kawariworker.js"></script>

<script>
var ShioriLoader = shioriLoader.ShioriLoader;
ShioriLoader.shioriDetectors.push(function(){...}); // 追加の栞判定関数登録
ShioriLoader.shioriDetectors.push(function(){...});
// shioridetector-common_names.jsなど栞判定関数ライブラリを読み込めば自動的に登録されている。

ShioriLoader.detectShiori().then(function(shiori){
  shiori.load(dirpath).then(...);
}, function(error){
  throw error;
});
</script>
```

## API Documents

[API Documents](https://ikagaka.github.io/ShioriLoader)

## References

- 栞判定関数 [shioridetector-common_names](https://github.com/Ikagaka/shioridetector-common_names)
- 栞クラス [kawariworker.js](https://github.com/Narazaka/kawariworker.js)

## License

This is released under [MIT License](http://narazaka.net/license/MIT?2016).
