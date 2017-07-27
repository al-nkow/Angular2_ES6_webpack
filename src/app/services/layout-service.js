import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BTLayoutService {

    subject = new BehaviorSubject();
    state = {};

    setState = (prop, state) => {
        this.state[prop] = state;
        this.subject.next(this.state);
    };

    getState = () => {
        return this.subject.asObservable();
    };

    getScreenWidth = () => {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };
}
