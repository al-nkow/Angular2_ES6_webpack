import {Component, EventEmitter} from '@angular/core';
import template from './b-spinner.template.pug';
import style from './b-spinner.base.scss';

@Component({
    'selector': 'bt-spinner',
    'inputs': ['type'],
    'template': template,
    'styles': [style]
})
export class BTSpinnerComponent {
    constructor() {
    }
}
