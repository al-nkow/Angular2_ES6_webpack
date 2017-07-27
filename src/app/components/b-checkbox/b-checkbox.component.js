import {Component, forwardRef, EventEmitter, Inject} from '@angular/core';
import template from './b-checkbox.template.pug';
import style from './b-checkbox.base.scss';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    'selector': 'bt-checkbox',
    'inputs': ['name', 'required', 'checked', 'disabled', 'middle'],
    'outputs': ['state', 'check', 'uncheck'],
    'template': template,
    'styles': [style],
    'providers': [{
        'provide': NG_VALUE_ACCESSOR,
        'useExisting': forwardRef(() => BTCheckboxComponent),
        'multi': true
    }]
})
export class BTCheckboxComponent implements DefaultValueAccessor {
    constructor() {
        this.check = new EventEmitter();
        this.uncheck = new EventEmitter();
    }

    writeValue(value) {
        if (value !== undefined) {
            this.checked = value;
        }
    }

    onValueChange(value) {
        this.checked = value;

        if (this.checked) {
            this.check.emit({name: 'test'});
        } else {
            this.uncheck.emit({name: 'test1'});
        }

        this.propagateChange(this.checked);
    }

    propagateChange = (_) => {
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {
    }
}
