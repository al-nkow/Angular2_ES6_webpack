import { Component, Inject, EventEmitter, Input, Output } from '@angular/core';
import template from './b-line-chart.template.pug';
import style from './b-line-chart.base.scss';

import { BTImporterService } from './../../services/importer-service.js';

@Component({
    'selector': 'bt-line-chart',
    'template': template,
    'styles': [style]
})
export class BTLineChartComponent {
    @Input() data;
    @Input() chartistSrc;
    @Input() options;

    constructor(@Inject(BTImporterService) importer) {
        this.importer = importer;
    }

    ngOnChanges(changes) {
        if (!this.chartistLoaded) {
            if ((changes.chartistSrc || {}).currentValue && !this.chartistLoaded) {
                this.chartistLoadingPromise = this.importer.prepareFiles(changes.chartistSrc.currentValue);
            } else {
                this.chartistLoadingPromise = this.importer.prepareFiles({
                    'js': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.js'],
                    'css': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.css']
                });
            }
        }

        this.chartistLoadingPromise.then(() => {
            if ((changes.data || {}).currentValue) {
                this.line = new Chartist.Line('.ct-line', {
                    series: changes.data.currentValue.series,
                    labels: changes.data.currentValue.labels,
                }, this.options);
            }
        });

        if ((changes.data || {}).currentValue && this.line) {
            this.line.update(changes.data.currentValue);
        }
    }
}
