import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/forms';
import template from './input.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'input-page',
    'template': template
})
export class InputPageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight, @Inject(FormBuilder) builder ) {
        
        this.CodeHighlight = CodeHighlight;

        this.builder = builder;
        this.form = this.builder.group({
            'email': ['', [Validators.required, Validators.pattern('[a-zA-Z0-9\.\_\%\+\-]+\@[a-zA-Z0-9\.\_\%\+\-]+')]],
            'password': ['', [Validators.required, Validators.minLength(8)]],
        });

    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

}