import { Component, Inject } from '@angular/core';
import template from './line-chart.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'line-chart-page',
    'template': template
})
export class LineChartPageComponent {

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

    lineChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            [5, 2, 4, 2, 15]
        ]
    };

    lineChartOptions = {
        height: '500px',
    };

}