import { Component, Inject } from '@angular/core';
import template from './dashboard.page.template.pug';
import style from './dashboard.page.style.scss';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'dashboard-page',
    'template': template,
    'styles': [style]
})
export class DashboardPageComponent {

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