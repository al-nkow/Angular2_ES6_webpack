import {Component, Inject, EventEmitter, Output} from '@angular/core';
import template from './l-modal.template.pug';
import style from './l-modal.base.scss';

@Component({
    'selector': 'bt-modal',
    'template': template,
    'styles': [style],
    'inputs': ['open'],
    'outputs': ['close'],
    'host': {'(click)': 'checkClickOutside($event)'},
})
export class BTModalComponent {
    constructor() {
        this.close = new EventEmitter();
    };

    closeModal() {
        this.close.emit();
    }

    checkClickOutside(event) {
        let target = event.target || event.srcElement;
        if (target.id === 'overlay') {
            this.closeModal();
        }
    }
}
