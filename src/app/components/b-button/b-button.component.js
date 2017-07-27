import { Component, EventEmitter, Input, Output } from '@angular/core';
import template from './b-button.template.pug';
import style from './b-button.base.scss';

@Component({
    'selector': 'bt-button',
    'template': template,
    'styles': [style],
})
export class BTButtonComponent {
    @Input() type = 'button';
    @Input() size;
    @Input() color = 'default';
    @Input() disabled;
    @Input() loading;
    @Input() select;
    @Input() selectOptions;

    @Output() onClick = new EventEmitter();
    @Output() onSelect = new EventEmitter();

    click() {
        this.onClick.emit();
    }

    selectChange(option) {
        if (!option) return;

        this.onSelect.emit(option);
        this.selectModel = null;
    }
}
