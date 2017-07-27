import {Component, forwardRef, EventEmitter, ElementRef, Inject} from '@angular/core';
import template from './b-switch.template.pug';
import style from './b-switch.base.scss';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    'selector': 'bt-switch',
    'inputs': [
        'name',
        'value',
        'title'
    ],
    'outputs': ['value'],
    'template': template,
    'styles': [style],
    'providers': [{
        'provide': NG_VALUE_ACCESSOR,
        'useExisting': forwardRef(() => BTSwitchComponent),
        'multi': true
    }]
})
export class BTSwitchComponent implements DefaultValueAccessor {
    constructor(@Inject(ElementRef) elementRef) {
        this.elementRef = elementRef;

        this.name = '';
        this.value = false;
        this.title = '';
    }

    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
        }
    }

    onValueChange(value) {
        this.value = value;
        this.propagateChange(this.value);
    }

    propagateChange(_) {}

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}
}
