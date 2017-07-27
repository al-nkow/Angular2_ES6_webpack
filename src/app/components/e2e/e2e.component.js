import { Component, Inject } from '@angular/core';
import template from './e2e.template.pug';

@Component({
    'selector': 'e2e',
    'template': template
})
export class E2EComponent {
    constructor() {
    }

    buttonLoading = true;
}
