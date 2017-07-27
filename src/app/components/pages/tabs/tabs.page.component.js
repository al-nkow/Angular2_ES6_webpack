import { Component, Inject } from '@angular/core';
import template from './tabs.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'tabs-page',
    'template': template
})
export class TabsPageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight ) {
        this.CodeHighlight = CodeHighlight;
    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

    wrappedConsoleLog(event) {
        console.log(event);
    }

}