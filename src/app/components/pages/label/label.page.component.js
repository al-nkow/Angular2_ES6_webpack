import { Component, Inject } from '@angular/core';
// import { FormBuilder, Validators, ControlGroup } from '~/node_modules/@angular/forms';
import template from './label.page.template.pug';

import { BTImporterService } from '../../../services/importer-service';

@Component({
    'selector': 'label-page',
    'template': template
})
export class LabelPageComponent {

    constructor( @Inject(BTImporterService) importer ) {
        this.importer = importer;
    }

    ngAfterViewInit() {

        this.importer.prepareFiles({
            'js': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js'],
            'css': ['//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/dracula.min.css'],
        }).then(() => {
            try {
                hljs.initHighlightingOnLoad();
            } catch (err) {
                this.logger.warn('Unable to load highlight.js');
            }
        });

    }


}
