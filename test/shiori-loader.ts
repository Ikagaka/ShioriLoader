import 'mocha';
import * as assert from 'power-assert';
import {ShioriLoader, Shiori, FileSystemLike} from '../src/lib/shiori-loader';

class DummyShiori implements Shiori {
	constructor(_: FileSystemLike) { }
	load(_: string): Promise<number> { return Promise.resolve(1); }
	unload(): Promise<number> { return Promise.resolve(1); }
	request(_: string): Promise<string> { return Promise.resolve(""); }
}
class DummyShiori1 extends DummyShiori {
}
class DummyShiori2 extends DummyShiori {
}

const detector1 = (fs: any, dirpath: string) =>
	dirpath === '1' ? new DummyShiori1(fs) : null;
const detector2 = (fs: any, dirpath: string) =>
	dirpath === '2' ? new DummyShiori2(fs) : null;

ShioriLoader.shioriDetectors.push(detector1);
ShioriLoader.shioriDetectors.push(detector2);

describe('ShioriLoader', () => {
	it('shiori1', () => 
		ShioriLoader.detectShiori({}, '1').then(
			(shiori) => assert(shiori instanceof DummyShiori1),
			() => { throw new Error(); }
		)
	);
	it('shiori2', () => 
		ShioriLoader.detectShiori({}, '2').then(
			(shiori) => assert(shiori instanceof DummyShiori2),
			() => { throw new Error(); }
		)
	);
	it('no shiori', () => 
		ShioriLoader.detectShiori({}, 'no').then(
			() => { throw new Error(); },
			() => assert.ok(true)
		)
	);
});
