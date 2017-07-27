import {Directive, Inject, EventEmitter} from '@angular/core';

@Directive({
    'selector': 'focus',
    'host': {
        'blur': 'onBlur($event)'
    }
})
export class BTFocusDirective {
    constructor() {
        this.emitter = new EventEmitter();
    }

    onBlur($event) {
        this.emitter.next($event);
    }
}
