import { Injectable } from '@angular/core';

@Injectable()
export class BTImporterService {
    constructor() {
        this.jsFiles = {};
        this.cssFiles = [];
        this.provided = [];
        this.awaiting = {};
    }

    prepareFiles(files) {
        let promises = [];
        if (files.css) {
            files.css.forEach(file => promises.push(this.loadCSSFile(file)));
        }
        if (files.js) {
            files.js.forEach(file => promises.push(this.loadJSFile(file)));
        }

        return Promise.all(promises);
    }

    loadJSFile(file) {
        let self = this;
        let url = file;

        if (typeof(file) === 'object') {
            url = file.url;
        }
        if (!url) {
            return null;
        }
        if(this.jsFiles[url]){
            return this.jsFiles[url];
        }
        this.jsFiles[url] = new Promise((resolve, reject) => {
            let scriptElement = document.createElement('script');
            scriptElement.src = url;
            scriptElement.onload = function () {
                if (file.provides) {
                    self.provides(file.provides);
                }

                resolve(file);
            };
            scriptElement.onerror = function () {
                return resolve();
            };

            if (file.requires) {
                self.requires(file.requires, () => {
                    document.body.appendChild(scriptElement);
                });
            } else {
                document.body.appendChild(scriptElement);
            }

        });
        return this.jsFiles[url];

    };

    loadCSSFile(file) {
        let self = this;
        if (!file && -1 === this.jsFiles.indexOf(file)) {
            return null;
        }
        return new Promise((resolve, reject) => {
            let scriptElement = document.createElement('link');
            scriptElement.crossorigin = true;
            scriptElement.rel = 'stylesheet';
            scriptElement.href = file;
            scriptElement.onload = function () {
                self.cssFiles.push(file);
                resolve(file);
            };
            scriptElement.onerror = function () {
                return resolve();
            };
            document.head.appendChild(scriptElement);

        });
    };

    provides(key) {
        this.provided.push(key);
        if (this.awaiting[key]) {
            this.awaiting[key].forEach(callback => callback());
        }
        delete this.awaiting[key];
    }

    requires(key, cb) {
        let pool = this.awaiting[key] || [];
        pool.push(cb);

        this.awaiting[key] = pool;
    }

    loadJs(urls, onload) {
        let url = urls.shift();
        if (url && -1 === this.jsFiles.indexOf(url)) {
            let script = document.createElement('script');
            script.src = url;
            script.defer = true;

            script.onload = urls.length ? () => this.loadJs(urls, onload) : () => onload();
            document.body.appendChild(script);
            this.jsFiles.push(url);
        } else {
            if (!url) {
                (() => onload())();
            } else {
                (() => this.loadJs(urls, onload))();
            }
        }
    }

    loadCss(urls) {
        for (let i in urls) {
            let url = urls[i];
            if (urls.hasOwnProperty(i) && -1 === this.cssFiles.indexOf(url)) {
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                document.head.appendChild(link);
                this.cssFiles.push(url);
            }
        }
    }
}
