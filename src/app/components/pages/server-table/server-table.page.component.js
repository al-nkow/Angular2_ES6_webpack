import { Component, Inject } from '@angular/core';
import template from './server-table.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'server-table-page',
    'template': template
})
export class ServerTablePageComponent {

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

    tableData = [
        { name: 'a', surname: 'a', age: 1 },
        { name: 'b', surname: 'b', age: 2 },
        { name: 'c', surname: 'c', age: 3 },
        { name: 'd', surname: 'd', age: 4 },
        { name: 'e', surname: 'e', age: 5 },
    ];

}