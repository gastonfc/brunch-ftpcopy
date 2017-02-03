'use strict';

var ftpClient = require('ftp-client');
var fileUtils = require('./lib/file-utils');


// Receives the files and assets brunch's data structures
// and return a plain array of files
function filesToUpload(files, assets, baseDir) {
    var filesPaths = files.map(f => f.path);
    var all = filesPaths;

    if (assets) {
        let assetsPaths = assets.map(f => f.destinationPath);
        all = all.concat(assetsPaths);
    }

    all = fileUtils.addFolders(all);

    all = all.filter(f => (f.indexOf(baseDir) === 0) && (baseDir !== f));

    return all;
}

// Documentation for Brunch plugins:
// https://github.com/brunch/brunch/blob/master/docs/plugins.md

// Remove everything your plugin doesn't need.
class FtpcopyPlugin {
  constructor(config) {
    // Replace 'plugin' with your plugin's name;
    this.config = config && config.plugins && config.plugins.ftpcopy;
  }

  _ftpClient() {

    let cfg = this.config;

    if (cfg && cfg.host) {
        let ftpConfig = {
            host : cfg.host,
            port : cfg.port || 21,
            user : cfg.user,
            password : cfg.password
        };
        let options = {
            logging: cfg.debug || 'none' 
        };

        return new ftpClient(ftpConfig, options);
    }
  }

  _baseDir() {
      return this.config.basePath || '/';
  }


  // file: File => Promise[Boolean]
  // Called before every compilation. Stops it when the error is returned.
  // Examples: ESLint, JSHint, CSSCheck.
  // lint(file) { return Promise.resolve(true); }

  // file: File => Promise[File]
  // Transforms a file data to different data. Could change the source map etc.
  // Examples: JSX, CoffeeScript, Handlebars, SASS.
  // compile(file) { return Promise.resolve(file); }

  // file: File => Promise[Array: Path]
  // Allows Brunch to calculate dependants of the file and re-compile them too.
  // Examples: SASS '@import's, Jade 'include'-s.
  // getDependencies(file) { return Promise.resolve(['dep.js']); }

  // file: File => Promise[File]
  // Usually called to minify or optimize the end-result.
  // Examples: UglifyJS, CSSMin.
  // optimize(file) { return Promise.resolve({data: minify(file.data)}); }

  // files: [File] => null
  // Executed when each compilation is finished.
  // Examples: Hot-reload (send a websocket push).
  onCompile(files, assets) {
    
    var ftp = this._ftpClient();

    if (ftp) {
        var baseDir = this._baseDir();
        var remoteBaseDir = this.config.remoteBasePath || '/';

        ftp.connect(function() {
            ftp.upload(
                filesToUpload(files, assets, baseDir),
                remoteBaseDir,
                { overwrite: 'all', baseDir: baseDir },
                function () {
                    // console.log('upload finished', arguments);
                }
            );
        });
    }
  }

  // Allows to stop web-servers & other long-running entities.
  // Executed before Brunch process is closed.
  // teardown() {}
}

// Required for all Brunch plugins.
FtpcopyPlugin.prototype.brunchPlugin = true;

// Required for compilers, linters & optimizers.
// 'javascript', 'stylesheet' or 'template'
// BrunchPlugin.prototype.type = 'template';

// Required for compilers & linters.
// It would filter-out the list of files to operate on.
// BrunchPlugin.prototype.extension = 'js';
// BrunchPlugin.prototype.pattern = /.js$/;

// Indicates which environment a plugin should be applied to.
// The default value is '*' for usual plugins and
// 'production' for optimizers.
FtpcopyPlugin.prototype.defaultEnv = '*';

module.exports = FtpcopyPlugin;
