import {Component, Inject} from '@angular/core';
import {BTTableComponent} from '../l-table.component';

@Component({
    'selector': 'bt-tcolumn',
    'inputs': [
        'value',
        'header',
        'order',
        'orderField',
        'width',
        'control',
        'title',
        'altTitle',
        'class',
        'index',
        'style',
        'wordWrap',
        'indicateByField',
        'indicatorText',
        'indicatorStyle',
    ],
    'template': ''
})
export class BTTColumnComponent {
    constructor(@Inject(BTTableComponent) table) {
        this.table = table;
        this.table.addColumn(this);
    }
    ngOnDestroy() {
        this.table.deleteColumn(this);
    }
}
