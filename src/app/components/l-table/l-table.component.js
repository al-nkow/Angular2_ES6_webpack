import { Component, EventEmitter, ElementRef, Inject, Input, Output } from '@angular/core';
import template from './l-table.template.pug';
import style from './l-table.base.scss';

@Component({
    'selector': 'bt-table',
    'template': template,
    'styles': [style],
    'host': {
        '[class.rowhover]': 'rowclickUsed'
    }
})
export class BTTableComponent {
    @Input() dataset;
    @Input() header;
    @Input() search;
    @Input() pag;
    @Input() sort;
    @Input() highlight = {};
    @Input() server;
    @Input() totalItems = 0;
    @Input() loading;
    @Input() resetPag;
    @Input() selectAllLoading;
    @Input() selectAllCrop;
    @Input() selectAllLimit;
    @Input() limitSelectAll;
    @Input() blockingSelectAllLimit;
    @Input() selectedItemsNumber;

    @Output() rowclick = new EventEmitter();
    @Output() rowdoubleclick = new EventEmitter();
    @Output() rowcheck = new EventEmitter();
    @Output() rowuncheck = new EventEmitter();
    @Output() outputclick = new EventEmitter();
    @Output() cellclick = new EventEmitter();
    @Output() requestData = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() selectAll = new EventEmitter();
    @Output() resetSelection = new EventEmitter();


    constructor(@Inject(ElementRef) element) {
        this.columns = [];
        this.query = '';
        this.showNum = 10;
        this.p = 1;
        this.Math = window.Math;
        this.element = element;
        this.timeout = null;
        this.clickTimeout = null;
        this.hideUnselectAllLimit = 9;
    }

    // decide to add .rowhover to host or not
    ngOnInit() {
        if (!this.pag) {
            this.showNum = 1000000;
        }

        this.rowclickUsed = this.rowclick.observers.length > 0 || this.rowdoubleclick.observers.length > 0;
    }

    ngOnChanges(changes) {
        if (changes.dataset && JSON.stringify(changes.dataset.currentValue) !== JSON.stringify(changes.dataset.previousValue || {})) {
            this.checkCheckness(changes.dataset.currentValue);
            this.doSort = true;
            this.filter();
        }

        if (changes.resetPag && changes.resetPag.currentValue) {
            this.p = 1;
            this.showNum = 10;
        }

        if (!changes.sort || (changes.sort && !changes.sort.currentValue.column)) return;

        this.serverRequest = {
            pagination: {
                pageNum: 1,
                itemsPerPage: 10
            },
            sort: {
                field: this.sort.column,
                descending: this.sort.descending
            }
        };

        setTimeout(() => this.ready.emit(this.serverRequest));
    }

    onRowClick(row) {
        this.clickTimeout = setTimeout(() => {
            this.rowclick.emit(row);
            this.clickTimeout = null;
        }, 200);
    }

    onRowDoubleClick(row) {
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
        this.rowdoubleclick.emit(row);
    }

    onRowCheck(row) {
        row.checked = true;
        this.rowcheck.emit(row);
        this.checkCheckness(this.getData());
    }

    onRowUncheck(row) {
        row.checked = false;
        this.rowuncheck.emit(row);
        this.checkCheckness(this.getData());
    }

    onAllCheck() {
        this.dataset.forEach((row) => {
            this.onRowCheck(row);
        });

        if (this.server && (this.totalItems > this.showNum)) {
            this.showSelectAll = true;
        }
    }

    onAllUncheck() {
        this.dataset.forEach((row) => {
            this.onRowUncheck(row);
        });
    }

    onOutputClick(value) {
        this.outputclick.emit(value);
    }

    onCellClick(clickable, row) {
        if (clickable) {
            this.cellclick.emit(row);
        }
    }

    _debouncedUpdateColumnsSort() {
        if (this.timeout && this.timeout.cancelFn) this.timeout.cancelFn(this.timeout);

        this.timeout = setTimeout(() => {
            this.columns.sort((one, two) => {
                let oneIndex = one.index || 0;
                let twoIndex = two.index || 0;

                if (oneIndex < twoIndex) return -1;
                if (oneIndex > twoIndex) return 1;
                return 0;
            });
        });
    }

    addColumn(column) {
        this.columns.push(column);
        this._debouncedUpdateColumnsSort();
    }

    deleteColumn(column) {
        this.columns.splice(this.columns.indexOf(column), 1);
        this._debouncedUpdateColumnsSort();
    }

    getData() {
        if (this.query !== '') {
            if (this.filteredList) {
                return this.filteredList;
            } else {
                return [];
            }
        } else {
            return this.dataset;
        }
    }

    checkCheckness(dataset) {
        this.showSelectAll = false;

        if (!dataset || !dataset.length) {
            this.showUnselectAll = false;
            return;
        }

        let checkedCount = 0;

        dataset.forEach((row) => {
            row.checked ? checkedCount++ : checkedCount--;
        });

        let datasetLength = dataset.length;
        this.allChecked = checkedCount === datasetLength;
        if (checkedCount !== datasetLength && checkedCount !== -datasetLength) {
            this.allChecked = 'middle';
        }
    }

    filter() {
        if (Array.isArray(this.dataset)) {
            this.filteredList = this.dataset.filter((el) => {
                let result = "";
                for (let key in el) {
                    result += el[key];
                }

                return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            });
        }
    }

    selectedClass(columnName, columnOrder) {
        let elementClass = 'false';

        if (this.sort) {
            elementClass = columnName == this.sort.orderColumn ? 'sort-' + this.sort.descending : false;
        }

        if (columnOrder) {
            elementClass += ' hide-sort';
        }

        return elementClass;
    }

    changeSorting(columnName, actualField) {
        this.doSort = true;
        if (this.sort) {
            let sort = this.sort;
            let sortField = actualField || columnName;
            if (sort.column == sortField) {
                sort.descending = !sort.descending;
            } else {
                sort.column = sortField;
                sort.orderColumn = columnName;
                sort.descending = false;
            }
        } else {
            this.sort = {};
            this.sort.descending = false;
        }

        if (this.server) {
            this.serverRequest.sort.field = this.sort.column;
            this.serverRequest.sort.descending = this.sort.descending;

            this.loading = true;
            this.requestData.emit(this.serverRequest);
        }
    }

    convertSorting() {
        if (!this.doSort) {
            return null;
        }
        if (this.sort) {
            this.doSort = false;
            return this.sort.descending ? '-' + this.sort.column : this.sort.column;
        }
    }

    onServerPag(pageNum = this.p) {
        this.p = pageNum;
        this.serverRequest.pagination.pageNum = pageNum;
        this.serverRequest.pagination.itemsPerPage = this.showNum;

        this.requestData.emit(this.serverRequest);
    }

    onServerSearch() {
        if (!this.serverQuery) {
            this.serverRequest.search = null;
        } else {
            this.serverRequest.search = this.serverQuery.toLowerCase();
        }

        this.resetSelection.emit();
        this.requestData.emit(this.serverRequest);
    }

    onSearchReset() {
        this.serverQuery = '';
        this.onServerSearch();
    }

    onSearchFocus(focus) {
        this.searchFocus = focus;
    }

    getSearchMargin() {
        return this.header ? 'auto' : 0;
    }

    onSelectAll() {
        this.showSelectAll = false;
        this.showUnselectAll = true;
        this.selectAll.emit({ makeSelected: true, sort: this.sort });
    }

    onUnselectAll() {
        this.showUnselectAll = false;
        this.showSelectAll = false;
        this.selectAll.emit({ makeSelected: false, sort: this.sort });
    }

    getNotificationRowState() {
        if (this.selectAllLoading) return 'selecting';
        if (this.showSelectAll && this.selectAllLimit) return 'select-all-limited';
        if (this.showUnselectAll && this.selectAllCrop) return 'unselect-all-cropped';
        if (this.showSelectAll) return 'select-all';
        if ((this.selectedItemsNumber > this.hideUnselectAllLimit) || (!this.allChecked && this.selectedItemsNumber)) return 'unselect-all';
    }
}

