import { Component, Inject } from '@angular/core';
import template from './bar-chart.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'bar-chart-page',
    'template': template
})
export class BarChartPageComponent {

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

    barChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            [5, 2, 4, 2, 10]
        ]
    };

    barChartOptions = {
        height: '500px',
    };

}