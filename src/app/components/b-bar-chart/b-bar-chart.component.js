import { Component, Inject, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import template from './b-bar-chart.template.pug';
import style from './b-bar-chart.base.scss';

import { BTImporterService } from '../../services/importer-service';
import { BTLoggerService } from './../../services/logger-service';

@Component({
    'selector': 'bt-bar-chart',
    'template': template,
    'styles': [style]
})
export class BTBarChartComponent {
    @Input() data;
    @Input() chartistSrc;
    @Input() options;
    @Input() sort;

    constructor(@Inject(BTImporterService) importer,
                @Inject(ElementRef) element,
                @Inject(BTLoggerService) logger,) {
        this.importer = importer;
        this.element = element;
        this.logger = logger;

        this.defaultOptions = {};
        this.eventListeners = [];
    }

    ngOnChanges(changes) {
        if ((changes.chartistSrc || {}).currentValue && !this.chartistLoaded) {
            this.chartistLoadingPromise = this.importer.prepareFiles(changes.chartistSrc.currentValue);
            this.chartistLoaded = true;
        } else {
            this.chartistLoadingPromise = this.importer.prepareFiles({
                'js': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.js'],
                'css': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.css']
            });
            this.chartistLoaded = true;
        }

        this.chartistLoadingPromise.then(() => {
            this.chartContainer = this.element.nativeElement.getElementsByClassName('chart-container')[0];
            this.mutatedData = this.generateDrawData(this.data);
            this.bar = new Chartist.Bar(this.chartContainer, this.mutatedData, Object.assign(this.defaultOptions, this.options));

            this.bar.on('created', () => {
            });

            this.bar.on('draw', (data) => {
                if (data.type === 'bar' || (data.type === 'label' && (data.axis || {}).counterUnits.dir === 'vertical')) {
                    if (!this.tooltip) {
                        this.tooltip = document.createElement('div');
                        this.tooltip.className = 'ct-tooltip hidden';
                        document.getElementsByTagName('body')[0].appendChild(this.tooltip);
                        this.appendTooltipStyles();
                    }

                    const mouseenter = this.showTooltip.bind(this);
                    const mouseleave = this.hideTooltip.bind(this);
                    const mousemove = this.moveTooltip.bind(this);
                    const click = this.toggleTooltip.bind(this);

                    this.eventListeners.push({
                        element: data.element._node,
                        listeners: [mouseenter, mouseleave, mousemove, click],
                    });

                    data.element._node.addEventListener('mouseenter', mouseenter);
                    data.element._node.addEventListener('mouseleave', mouseleave);
                    data.element._node.addEventListener('mousemove', mousemove);
                    data.element._node.addEventListener('click', click);

                    if (data.type === 'bar' && data.series[data.index].beacon) {
                        data.element.attr({ beacon: data.series[data.index].beacon });
                    }
                }
            })
        });

        if (!this.bar) return;

        if ((changes.data || {}).currentValue) {
            this.updateChart();
        }
    }

    updateChart() {
        if (!this.bar) return;

        this.mutatedData = this.generateDrawData(this.data);

        this.bar.update(this.mutatedData, Object.assign(this.defaultOptions, this.options), true);
    }

    generateDrawData(originalData) {
        if (!originalData) return;
        if (typeof originalData !== 'object') {
            this.logger.warn('Data provided for chart must be an object');
            return;
        }

        const data = JSON.parse(JSON.stringify(originalData));
        const series = data.series[0];

        for (let i = 0; i < series.length; i++) {
            if (typeof series[i] !== 'object') series[i] = { value: series[i] };
        }

        if (this.sort) {
            let temp;
            for (let i = 0; i < series.length - 1; i++) {
                if (series[i].value > series[i + 1].value) {
                    temp = series[i];
                    series[i] = series[i + 1];
                    series[i + 1] = temp;
                    temp = data.labels[i];
                    data.labels[i] = data.labels[i + 1];
                    data.labels[i + 1] = temp;
                    i = -1;
                }
            }

            if (this.sort === 'descending') {
                series.reverse();
                data.labels.reverse();
            }
        }

        return {
            labels: data.labels,
            series: data.series,
        };
    }

    showTooltip(event) {
        this.tooltip.className = 'ct-tooltip';
        if (event.target.nodeName === 'foreignObject') {
            const labelIndex = this.mutatedData.labels.indexOf(event.target.firstChild.innerText);
            const tooltipText = this.mutatedData.series[0][labelIndex].meta;
            if (!tooltipText) return this.hideTooltip();
            this.tooltip.innerText = this.mutatedData.series[0][labelIndex].meta;
            return;
        }
        this.tooltip.innerText = event.target.getAttribute('ct:meta');
        this.tooltipShown = true;
    }

    hideTooltip() {
        this.tooltip.className = 'ct-tooltip hidden';
        this.tooltipShown = false;
    }

    moveTooltip(event) {
        this.tooltip.style.left = event.pageX - this.tooltip.offsetWidth / 2;
        this.tooltip.style.top = event.pageY - this.tooltip.offsetHeight - 10;
    }

    toggleTooltip() {
        if (this.tooltipShown) return this.hideTooltip();
        this.showTooltip();
    }

    removeEventListeners() {
        this.eventListeners.forEach((listeningElement) => {
            listeningElement.listeners.forEach((listener) => {
                listeningElement.element.removeEventListener('mouseenter', listener);
                listeningElement.element.removeEventListener('mouseleave', listener);
                listeningElement.element.removeEventListener('mousemove', listener);
                listeningElement.element.removeEventListener('click', listener);
            });
        });
    }

    ngOnDestroy() {
        this.removeEventListeners();
    }

    tooltipStyles = `.ct-tooltip {
        position: absolute;
        display: inline-block;
        min-width: 5em;
        padding: 8px 10px;
        background: #383838;
        color: #fff;
        text-align: center;
        pointer-events: none;
        z-index: 1000000;
        transition: opacity .2s linear;
    }`;

    tooltipHiddenStyles = ` .ct-tooltip.hidden {
        display: block;
        opacity: 0;
        visibility: hidden;
    }`;

    appendTooltipStyles() {
        const tooltipStyleElement = document.createElement('style');
        tooltipStyleElement.appendChild(document.createTextNode(this.tooltipStyles));
        document.getElementsByTagName('head')[0].appendChild(tooltipStyleElement);

        const tooltipHiddenStyleElement = document.createElement('style');
        tooltipStyleElement.appendChild(document.createTextNode(this.tooltipHiddenStyles));
        document.getElementsByTagName('head')[0].appendChild(tooltipHiddenStyleElement);
    }
}
