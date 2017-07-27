import { Component, ElementRef, Inject } from '@angular/core';
import style from './l-pie-chart.base.scss';
import template from './l-pie-chart.template.pug';
import { BTChartistDecorator } from './chartist.decorator';
import { BTImporterService } from './../../services/importer-service.js';

@Component({
    'selector': 'bt-pie',
    'template': template,
    'styles': [style],
    'inputs': ['data', 'percent']
})
export class BTPieChartController {
    constructor(@Inject(ElementRef) element, @Inject(BTImporterService) importer) {
        this.importer = importer;
        this.element = element;
        this.labels = [];
        this.values = [];
        this.pie = null;
        this.percent = false;

        this.importer.prepareFiles({
            'js': ['/js/chartist.min.js'],
            'css': ['/js/chartist.min.css']
        }).then(() => {
            this.pie = new BTChartistDecorator(this.element.nativeElement.getElementsByClassName('svg')[0]);
        });
    }

    ngDoCheck() {
        if (JSON.stringify(this.data) !== JSON.stringify(this.oldData || {}) && this.pie) {
            // copy object
            this.oldData = JSON.parse(JSON.stringify(this.data));

            let currentValue = this.data;
            this.labels = Object.keys(currentValue);
            this.values = Object.values(currentValue);

            if (this.percent) {
                this.values = BTPieChartController.toPercent(this.values);
            }

            this.pie.draw({
                'labels': this.labels,
                'series': this.values
            }, this.percent);
        }
    }

    static toPercent(data) {
        let total = 0;
        let percentData = [];

        data.forEach((item) => {
            total += item;
        });

        if (total) {
            percentData = data.map((item) => {
                return Math.round(item / total * 100);
            });
        }

        return percentData;
    }

    getLabelClass(index) {
        return this.pie.getLabelClass(index);
    }
}
