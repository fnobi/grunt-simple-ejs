var expect = require('chai').expect,
    parseOptions = require('../lib/parseOptions');

describe('parse options', function () {
    it('load config options', function () {
        var options = parseOptions({
            options: {
                moge: 5
            }
        });

        expect(options.moge).to.equal(5);
    });

    it('load multi options', function () {
        var options = parseOptions({
            options: [
                { moge: 5 },
                { hoge: 8 }
            ]
        });

        expect(options.moge).to.equal(5);
        expect(options.hoge).to.equal(8);
    });

    it('parse json option file', function () {
        var options = parseOptions({
            options: 'test/option/option.json'
        });

        expect(options.moge).to.equal(5);
    });

    it('parse yaml option file', function () {
        var options = parseOptions({
            options: 'test/option/option.yaml'
        });

        expect(options.hoge).to.equal(8);
    });

    it('parse js option file', function () {
        var options = parseOptions({
            options: 'test/option/option.js'
        });

        expect(options.hogehoge).to.equal(10);
    });

    it('parse multi option file', function () {
        var options = parseOptions({
            options: [
                'test/option/option.json',
                'test/option/option.yaml',
                'test/option/option.js'
            ]
        });

        expect(options.moge).to.equal(5);
        expect(options.hoge).to.equal(8);
        expect(options.hogehoge).to.equal(10);
    });
});