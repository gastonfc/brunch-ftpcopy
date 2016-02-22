'use strict';
var fileUtils = require('../lib/file-utils');

describe('getFolders', function () {
    var getFolders = fileUtils.getFolders;

    it('should return an array with the folder if there is just one folder', function () {
        expect(getFolders('test')).to.have.members(['test']);
    });

    it('should return an array with 2 folders if there is a separator', function () {
        expect(getFolders('test/demo')).to.have.members(['test', 'test/demo']);
    });

    it('should return an array with 3 folders if there is two separators', function () {
        expect(getFolders('test/demo/tree')).to.have.members(['test', 'test/demo', 'test/demo/tree']);
    });
});


describe('addFolders', function () {
    var addFolders = fileUtils.addFolders;

    it('should not add nothing if there is no folders in the files', function () {
        var files = ['abc.txt', 'xyz.doc'];
        expect(addFolders(files)).to.have.members(files);
    });

    it('should add a folder if there a subfolder in the files', function () {
        var files = ['abc.txt', 'demo/xyz.doc'];
        expect(addFolders(files)).to.have.members(['demo', 'abc.txt', 'demo/xyz.doc']);
    });

    it('should add 3 folders if there three subfolder in the files', function () {
        var files = ['abc.txt', 'demo/xyz.doc', 'one/two/file.txt'];
        expect(addFolders(files)).to.have.members(['demo', 'one', 'one/two', 'abc.txt', 'demo/xyz.doc', 'one/two/file.txt']);
    });

    it('should include a folder just one time', function () {
        var files = ['demo/abc.txt', 'demo/xyz.doc'];
        expect(addFolders(files)).to.have.length(3);
    });
});

describe('moveFile', function () {
    var moveFile = fileUtils.moveFile

    it('should do nothing if no rules are provided', function () {
        expect(moveFile('folder/file.txt')).to.be.equals('folder/file.txt');
    });

    it('should do nothing if an empty object is provided', function () {
        expect(moveFile('folder/file.txt', {})).to.be.equals('folder/file.txt');
    });

    it('should do nothing if the key of the rule doesn\'t match the file', function () {
        var result = moveFile('folder/file.txt', {
            'old/': 'new/'
        });
        expect(result).to.be.equals('folder/file.txt');
    });

    it('should replace text if two string are provided as rule', function () {
        var result = moveFile('folder/file.txt', {
            'folder/': 'new/'
        });
        expect(result).to.be.equals('new/file.txt');
    });

    it('should replace text just one time', function () {
        var result = moveFile('folder/a/folder/file.txt', {
            'folder/': 'new/'
        });
        expect(result).to.be.equals('new/a/folder/file.txt');
    });

    it('should apply just one rule', function () {
        var result = moveFile('folder/a/folder/file.txt', {
            'folder/': 'new/',
            'new/a/': 'b/'
        });
        expect(result).to.be.equals('new/a/folder/file.txt');
    });

    it('should interpret the strings as folders', function () {
        var result = moveFile('folder1/a/folder/file.txt', {
            'folder': 'new'
        });
        expect(result).to.be.equals('folder1/a/folder/file.txt');
    });
});
