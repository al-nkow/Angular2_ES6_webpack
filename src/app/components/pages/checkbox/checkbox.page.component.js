import { Component, Inject } from '@angular/core';
import template from './checkbox.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'checkbox-page',
    'template': template
})
export class CheckboxPageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight ) {
        this.CodeHighlight = CodeHighlight;
        this.modalOpen = false;
    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

}