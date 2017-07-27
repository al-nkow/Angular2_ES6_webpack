import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BTDashboardLayoutService {
    constructor() {
        this.leftAside = new Subject();
        this.leftAsideObs = this.leftAside.asObservable();
    }

    openLeftAside() {
        this.leftAside.next(true);
    }

    closeLeftAside() {
        this.leftAside.next(false);
    }
}
