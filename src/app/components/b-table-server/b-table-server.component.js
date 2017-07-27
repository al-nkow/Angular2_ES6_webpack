import {Component, EventEmitter, Inject, Input, Output, ChangeDetectionStrategy, KeyValueDiffers} from '@angular/core';
import template from './b-table-server.template.pug';
import style from './b-table-server.base.scss';

@Component({
    'selector': 'bt-table-serverpag',
    'template': template,
    'styles': [style],
    'changeDetectionStrategy': ChangeDetectionStrategy.OnPush,
})
export class BTTableServerComponent {
    @Input() data;
    @Input() header;
    @Input() search;
    @Input() pag;
    @Input() sort;
    @Input() loading;

    @Output() requestData = new EventEmitter();

    @Output() searchRequested = new EventEmitter();
    @Output() sortRequested = new EventEmitter();
    @Output() pagRequested = new EventEmitter();

    @Output() cellClick = new EventEmitter();
    @Output() cellContentClick = new EventEmitter();

    constructor(@Inject(KeyValueDiffers) keyValueDiffers) {
        this.keyValueDiffers = keyValueDiffers;
        this.differ = this.keyValueDiffers.find({}).create(null);

        this.columns = [];
        this.pag = {
            show: true,
            showOnPage: 10,
            totalItems: 0,
            page: 1,
        };
        this.search = {
            show: true,
            query: '',
        };
        this.sort = {
            column: '',
            descending: false,
        };

        this.requestDataObj = {
            pag: this.pag,
            search: this.search,
            sort: this.sort,
        };

        this.Math = window.Math;
    }

    ngDoCheck() {
        let pagChange = this.differ.diff(this.pag);

        if (pagChange) {
            console.log(pagChange);
        } else {
            // console.log('nope');
        }
    }

    addColumn(column) {
        this.columns.push(column);
    }

    onSearch() {
        this.pagRequested.emit(this.requestDataObj);
    }

    onSearchReset() {
        this.pagRequested.emit(this.requestDataObj);
    }

    onSearchFocus(focusState) {
        this.searchFocus = focusState;
    }

    onPag(page) {
        this.pag.page = page;

        this.pagRequested.emit(this.requestDataObj);
    }

    onSort(column) {
        if (column.value !== this.sort.column) {
            this.sort.column = column.value;
            this.sort.descending = false;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        this.sortRequested.emit(this.requestDataObj);
    }

    checkSort(column) {
        if (column.value === this.sort.column) {
            if (this.sort.descending) return 'descending';
            return 'ascending';
        }
    }

    onCellClick(cellData) {
        this.cellClick.emit(cellData);
    }

    onCellContentClick(cellData, event) {
        this.cellContentClick.emit(cellData);
        event.stopPropagation();
    }
}

