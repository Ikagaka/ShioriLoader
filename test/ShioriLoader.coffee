if require?
	chai = require 'chai'
else
	chai = @chai
chai.should()
expect = chai.expect
if require?
	chaiAsPromised = require 'chai-as-promised'
else
	chaiAsPromised = @chaiAsPromised
chai.use chaiAsPromised
if require?
	sinon = require 'sinon'
	ShioriLoader = require '../lib/ShioriLoader.js'
else
	sinon = @sinon
	ShioriLoader = @ShioriLoader

class ShioriLoader.shiories.dummy
	constructor: (fs) ->

detector = (fs, dirpath) ->

ShioriLoader.shiori_detectors.push detector

detector_spy = sinon.spy detector

describe 'junk', ->
	it 'should ?', ->
		args = [{'descript.txt': 'Charset,UTF-8'}, '/dummy']
		ShioriLoader.detect_shiori(args...)
		detector_spy.calledWithExactly args
