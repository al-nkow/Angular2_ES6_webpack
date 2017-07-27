import {Injectable} from '@angular/core';

@Injectable()
export class BTLoggerService {
    constructor() {
        if (appConfig && appConfig.dev) {
            this.log = console.log.bind(console);
            this.error = console.error.bind(console);
            this.info = console.info.bind(console);
        } else {
            this.log = this.error = this.info = () => null;
        }
    }
}
