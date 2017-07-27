import { Component, Inject, Input } from '@angular/core';
import { BTTableServerComponent } from './b-table-server.component';

@Component({
    'selector': 'bt-table-server-column',
    'template': ''
})
export class BTServerColumnComponent {
    @Input() value;
    @Input() header;
    @Input() cssClass;

    constructor(@Inject(BTTableServerComponent) table) {
        table.addColumn(this);
    }
}
