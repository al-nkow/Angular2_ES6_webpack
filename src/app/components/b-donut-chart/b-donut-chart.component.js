import { Component, Inject, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import template from './b-donut-chart.template.pug';
import style from './b-donut-chart.base.scss';

import { BTImporterService } from '../../services/importer-service';
import { BTLoggerService } from './../../services/logger-service';


@Component({
    'selector': 'bt-donut-chart',
    'template': template,
    'styles': [style]
})
export class BTDonutChartComponent {
    @Input() data;
    @Input() chartistSrc;
    @Input() options;
    @Input() labelsInterpolationPreset;
    @Input() showLegend;
    @Input() togglableToPercent;
    @Input() percentByDefault;
    @Input() sort;
    @Input() mergeSmall;

    constructor(@Inject(BTImporterService) importer,
                @Inject(ElementRef) element,
                @Inject(BTLoggerService) logger,) {
        this.importer = importer;
        this.element = element;
        this.logger = logger;

        this.defaultOptions = {
            startAngle: 45,
        };
    }

    ngOnChanges(changes) {
        // if ((changes.chartistSrc || {}).currentValue && !this.chartistLoaded) {
        //     this.chartistLoadingPromise = this.importer.prepareFiles(changes.chartistSrc.currentValue);
        //     this.chartistLoaded = true;
        // } else {
            this.chartistLoadingPromise = this.importer.prepareFiles({
                'js': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.js'],
                'css': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.css']
            });
            this.chartistLoaded = true;
        // }

        this.chartistLoadingPromise.then(() => {
            this.chartContainer = this.element.nativeElement.getElementsByClassName('ct-donut')[0];
            this.legendContainer = this.element.nativeElement.getElementsByClassName('legend')[0];
            this.mutatedData = this.generateDrawData(this.data);
            this.donut = new Chartist.Pie(this.chartContainer, this.mutatedData, Object.assign(this.defaultOptions, this.options));

            if (this.togglableToPercent) {
                const self = this;

                this.donut.on('created', () => {
                    if (!self.eventListenerAdded) {
                        self.eventListenerAdded = true;
                        self.chartContainer.addEventListener('click', () => self.togglePercent());
                    }
                });

                this.donut.on('draw', (data) => {
                    if (data.type === 'slice' && data.series.beacon) {
                        data.element.attr({ beacon: data.series.beacon });
                        if (this.legendContainer) {
                            const listItems = this.legendContainer.getElementsByTagName('li');

                            // give ngFor time to append li
                            setTimeout(() => {
                                listItems[data.index]
                                    .getElementsByTagName('svg')[0]
                                    .firstChild
                                    .setAttribute('beacon', data.series.beacon);
                            })
                        }
                    }
                })
            }
        });

        if (!this.donut) return;

        if ((changes.data || {}).currentValue ||
            (changes.labelsInterpolationPreset || {}).currentValue) {
            this.updateChart();
        }
    }

    ngOnInit() {
        if (this.percentByDefault) this.togglePercent();
    }

    updateChart() {
        if (!this.donut) return;

        this.mutatedData = this.generateDrawData(this.data);
        this.donut.update(this.mutatedData, Object.assign(this.defaultOptions, this.options), true);
    }

    generateDrawData(originalData) {
        if (!originalData) return;
        if (typeof originalData !== 'object') {
            this.logger.warn('Data provided for chart must be an object');
            return;
        }

        let data = JSON.parse(JSON.stringify(originalData));

        for (let i = 0; i < data.series.length; i++) {
            if (typeof data.series[i] !== 'object') data.series[i] = { value: data.series[i] };
        }

        let otherMerge = 0;
        if (this.mergeSmall && data.series.length > 3) {
            const total = data.series.reduce((a, b) => (a.value || a) + b.value);
            for (let i = 0; i < data.series.length; i++) {
                if (data.series[i].value / total < 0.04) {
                    otherMerge += data.series[i].value;
                    data.series.splice(i, 1);
                    data.labels.splice(i, 1);
                    i = -1;
                }
            }
        }

        if (this.sort) {
            const sortableData = [];
            data.series.forEach((series, i) => sortableData.push({ series, label: data.labels[i] }));

            sortableData.sort((a, b) => {
                if (this.sort === 'descending') return b.series.value - a.series.value;
                return a.series.value - b.series.value;
            });

            data = {
                series: sortableData.map(data => data.series),
                labels: sortableData.map(data => data.label),
            };
        }

        if (otherMerge) {
            data.series.push({ value: otherMerge });
            data.labels.push(__('bt-donut-other'));
        }

        this.legendLabels = [...data.labels];
        switch (this.labelsInterpolationPreset) {
            case 'percent':
                return {
                    labels: BTDonutChartComponent.toPercent(data.series).map(percentNumber => `${percentNumber}%`),
                    series: data.series,
                };
                break;
            case 'labels':
                return {
                    labels: data.labels,
                    series: data.series,
                };
                break;
            default:
                return {
                    labels: data.series.map(seriesObj => seriesObj.value),
                    series: data.series,
                };
                break;
        }
    }

    togglePercent() {
        if (this.labelsInterpolationPreset && this.labelsInterpolationPreset === this.oldLabelsInterpolationPreset) {
            return this.logger.warn('Using togglableToPercent input on initially percent interpolated labels, change labelsInterpolationPreset');
        }

        if (this.labelsInterpolationPreset === 'percent') {
            this.labelsInterpolationPreset = this.oldLabelsInterpolationPreset;
            this.oldLabelsInterpolationPreset = 'percent';
        } else {
            this.oldLabelsInterpolationPreset = this.labelsInterpolationPreset || 'default';
            this.labelsInterpolationPreset = 'percent';
        }

        this.updateChart();
    }

    static toPercent(data) {
        let total = 0;
        let percentData = [];

        data.forEach(item => total += item.value);
        if (total) percentData = data.map(item => Math.round(item.value / total * 100));

        return percentData;
    }

    getLabelClass(index) {
        if (this.donut) return `ct-series-${Chartist.alphaNumerate(index)}`;
        return '';
    }

    ngOnDestroy() {
        this.chartContainer.removeEventListener('click', this.togglePercent);
    }
}
