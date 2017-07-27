import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import template from './p-docs.component.pug';
import style from './p-docs.component.scss';

@Component({
    selector: 'bt-docs-page',
    template: template,
    styles: [style]
})
export class BTDocsPageComponent {
    constructor(@Inject(Router) router) {
        this.router = router;
        this.blockComponents = [
            {name: 'dropdown', url: '/dropdown', active: 'state-active'},
            {name: 'label', url: '/label', active: 'state-active'},
            {name: 'spinner', url: '/spinner', active: 'state-active'},
            {name: 'map', url: '/map', active: 'state-active'},
            {name: 'checkbox', url: '/checkbox', active: 'state-active'},
            {name: 'linechart', url: '/linechart', active: 'state-active'},
            {name: 'barchart', url: '/barchart', active: 'state-active'},
            {name: 'servertable', url: '/servertable', active: 'state-active'},
            {name: 'input', url: '/input', active: 'state-active'}
        ];
        this.layoutComponents = [
            {name: 'rightaside', url: '/rightaside', active: 'state-active'},
            {name: 'card', url: '/card', active: 'state-active'},
            {name: 'table', url: '/table', active: 'state-active'},
            {name: 'modal', url: '/modal', active: 'state-active'},
            {name: 'piechart', url: '/piechart', active: 'state-active'},
            {name: 'tabs', url: '/tabs', active: 'state-active'},
            {name: 'dashboard', url: '/dashboard', active: 'state-active'}
        ];

        this.router.navigate(['/dropdown']);

    }
}
