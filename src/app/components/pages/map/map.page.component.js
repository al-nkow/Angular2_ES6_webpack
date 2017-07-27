import { Component, Inject } from '@angular/core';
// import { FormBuilder, Validators, ControlGroup } from '~/node_modules/@angular/forms';
import template from './map.page.template.pug';
import { BTImporterService } from '../../../services/importer-service';

@Component({
    'selector': 'map-page',
    'template': template,
    styles: [`
        .demo-map-wrap {
            width: 600px;
            height: 500px;
        }
    `]
})
export class MapPageComponent {

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
