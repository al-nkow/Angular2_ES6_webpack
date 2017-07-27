import {Component, ElementRef, Renderer, Inject, EventEmitter} from '@angular/core';
import template from './b-dropdown.template.pug';
import style from './b-dropdown.base.scss';

@Component({
    'selector': 'bt-dropdown',
    'inputs': ['name', 'color', 'disabled', 'items'],
    'outputs': ['select'],
    'template': template,
    'styles': [style]
})
export class BTDropdownComponent {
    constructor(@Inject(ElementRef) element, @Inject(Renderer) renderer) {
        this.element = element;
        this.renderer = renderer;
        this.type = 'button';
        this.color = 'default';
        this.name = '';
        this.disabled = '';
        this.isOpened = false;
        this.items = [];
        this.select = new EventEmitter();
    }

    toggle() {
        this.isOpened = !this.isOpened;

        if (this.isOpened) {
            this.clickListener = this.renderer.listenGlobal('document', 'click', this.closeDropdown.bind(this));
        } else {
            this.clickListener();
        }
    }

    closeDropdown(event) {
        if (!this.element.nativeElement.contains(event.target)) {
            this.isOpened = false;
            this.clickListener();
        }
    }

    onItemClick(item) {
        this.select.next(item);
        this.isOpened = false;
        this.clickListener();
    }

    ngOnDestroy() {
        if (this.clickListener) {
            this.clickListener();
        }
    }
}
