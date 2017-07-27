import { Component, Inject } from '@angular/core';
import template from './l-tab.template.pug';

import { BTTabsComponent } from '../l-tabs.component';

@Component({
    'selector': 'bt-tab',
    'template': template,
    'inputs': ['title', 'active'],
})
export class BTTabComponent {
    constructor(@Inject(BTTabsComponent) tabs) {
        this.tabs = tabs;
    }

    ngOnInit() {
        this.tabs.addTab(this);
    }
}
