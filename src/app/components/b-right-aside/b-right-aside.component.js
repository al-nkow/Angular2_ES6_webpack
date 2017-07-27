import { Component, EventEmitter } from '@angular/core';
import template from './b-right-aside.template.pug';
import style from './b-right-aside.base.scss';

@Component({
    'selector': 'bt-right-aside',
    'template': template,
    'styles': [style],
    'inputs': ['open'],
    'outputs': ['close']
})
export class BTRightAsideComponent {
    constructor() {
        this.close = new EventEmitter();
    }

    closeAside() {
        this.close.emit();
    }
}
