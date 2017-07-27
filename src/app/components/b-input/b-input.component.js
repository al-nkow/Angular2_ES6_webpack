import {Component, forwardRef, EventEmitter, ElementRef, Inject} from '@angular/core';
import template from './b-input.template.pug';
import style from './b-input.base.scss';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    'selector': 'bt-input',
    'inputs': [
        'name',
        'type',
        'title',
        'placeholder',
        'required',
        'value',
        'errors',
        'dirty',
        'minlength',
        'autocomplete',
        'form',
        'clear',
        'height'
    ],
    'outputs': ['value', 'focus', 'cleared', 'onChange'],
    'template': template,
    'styles': [style],
    'providers': [{
        'provide': NG_VALUE_ACCESSOR,
        'useExisting': forwardRef(() => BTInputComponent),
        'multi': true
    }]
})
export class BTInputComponent implements DefaultValueAccessor {
    constructor(@Inject(ElementRef) elementRef) {
        this.elementRef = elementRef;

        this.name = '';
        this.type = 'text';
        this.title = '';
        this.value = '';
        this.placeholder = '';
        this.required = false;
        this.errors = null;
        this.dirty = false;
        this.showError = false;

        this.focus = new EventEmitter();
        this.cleared = new EventEmitter();
        this.onChange = new EventEmitter();
    }

    ngOnInit() {
        this.initialType = this.type;
    }

    isPassword() {
        return this.initialType === 'password';
    }

    isType(type) {
        return this.type === type;
    }

    togglePassword() {
        this.elementRef.nativeElement.querySelector('input').focus();
        this.type = this.type === 'password' ? 'text' : 'password';
    }

    writeValue(value) {
        if (value !== undefined) {
            this.value = value;
            this.onChange.emit(value);
        }
    }

    onValueChange(value) {
        this.value = value;
        this.onChange.emit(value);
        this.propagateChange(this.value);
    }

    propagateChange(_) {}

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    onFocus() {
        this.focus.emit(true);
    }

    onBlur() {
        this.showError = this.dirty && this.errors;
        this.focus.emit(false);
    }

    registerOnTouched() {}

    onClear() {
        if (this.value) {
            this.value = '';
            this.cleared.emit();
        }
    }
}
