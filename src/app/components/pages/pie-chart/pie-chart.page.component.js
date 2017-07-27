import { Component, Inject } from '@angular/core';
import template from './pie-chart.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'pie-chart-page',
    'template': template
})
export class PieChartPageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight ) {
        this.CodeHighlight = CodeHighlight;
        this.modalOpen = false;

        setInterval(this.donutChartDataChange.bind(this), 3000);
    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

    donutChartDataChange = () => {
        if (!this.donutChartData1Chosen) {
            this.donutChartData = this.donutChartData2;
            this.donutChartData1Chosen = true;
        } else {
            this.donutChartData = this.donutChartData1;
            this.donutChartData1Chosen = false;
        }
    };

    chartistLibSrc = {
        'js': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.js'],
        'css': ['https://cdnjs.cloudflare.com/ajax/libs/chartist/0.10.1/chartist.min.css']
    };

    donutChartData1 = {
        series: [20, 20, 30, 20, 20, 30],
        labels: ['A', 'B', 'C', 'A', 'B', 'C'],
    };

    donutChartData2 = {
        series: [210, 20, 30, 20, 20, 30],
        labels: ['AMN', 'ASD', 'QWE', 'KJH', 'BSA', 'POI'],
    };

    donutChartData = this.donutChartData1;

    donutChartOptions = {
        width: '300px',
        height: '300px',
        chartPadding: 40,
        donut: true,
        donutWidth: '50%',
        labelOffset: 50,
        ignoreEmptyValues: true,
    };

}