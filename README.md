## ftpcopy-brunch

[brunch](http://brunch.io) plugin to upload the modified files after a build to a ftp server.

## Usage

**This plugin is in development and it is not ready to use!**

* Add `"ftpcopy-brunch": "gastonfc/ftpcopy-brunch"` to `package.json` of your brunch app.

## Options

    plugins:
        ftpcopy:
            host: '192.168.23.24',
            port: 50021,
            user: 'ubuntu',
            password: 'mypassword123',
            basePath: 'public/',
            remoteBasePath: '/home/ubuntu/.www/myapp'

* **host**: ftp server domain or IP.
* **port**: ftp server port. If omitted the default port is used.
* **user**: user to authenticate.
* **password**: password to authenticate.
* **basePath**: root of the files to be uploaded.
* **remoteBasePath**: destination path

With this example config if `public/index.html` and `public/js/app.js`
are built, they are uploaded as `/home/ubuntu/.www/myapp/index.html` and
`/home/ubuntu/.www/myapp/js/app.js`.

## License

The MIT License (MIT)

Copyright (c) 2016 Gastón Fernández

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

## TODO

Read configuration from external file instead of brunch's config.
