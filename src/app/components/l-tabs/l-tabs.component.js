import {Component, EventEmitter, Injectable, Inject, ElementRef} from '@angular/core';
import template from './l-tabs.template.pug';
import style from './l-tabs.base.scss';

@Component({
    'selector': 'bt-tabs',
    'template': template,
    'styles': [style],
    'inputs': ['tabsPosition'],
    'outputs': ['tabSelect'],
})
@Injectable()
export class BTTabsComponent {
    constructor(@Inject(ElementRef) elementRef) {
        this.elementRef = elementRef;

        this.tabs = [];
        this.tabSelect = new EventEmitter();
    }

    addTab(tab) {
        if (tab.active) {
            this.tabs.forEach(tab => tab.active = false);
        }
        if (!this.tabs.length) tab.active = true;
        this.tabs.push(tab);
    }

    onTabSelect(tab) {
        this.tabSelect.emit(this.elementRef.nativeElement.querySelector('.tabs > bt-tab > div:not([hidden="true"])'));

        this.tabs.forEach(tab => tab.active = false);
        tab.active = true;
    }
}
