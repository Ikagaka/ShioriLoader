import 'mocha';
import * as assert from 'power-assert';
import {ShioriLoader} from '../src/lib/shiori-loader';

class DummyShiori1 {
	constructor(_: any) { }
}
class DummyShiori2 {
	constructor(_: any) { }
}

ShioriLoader.shiories['dummy1'] = DummyShiori1;
ShioriLoader.shiories['dummy2'] = DummyShiori2;

const detector1 = (fs: any, dirpath: string, shiories: {[key: string]: any}) =>
	dirpath === '1' ? new shiories['dummy1'](fs) : null;
const detector2 = (fs: any, dirpath: string, shiories: {[key: string]: any}) =>
	dirpath === '2' ? new shiories['dummy2'](fs) : null;

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
