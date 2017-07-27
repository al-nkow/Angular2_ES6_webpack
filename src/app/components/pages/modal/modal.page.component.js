import { Component, Inject } from '@angular/core';
import template from './modal.page.template.pug';

import { CodeHighlightService } from '../../../services/highlight-service';

@Component({
    'selector': 'modal-page',
    'template': template
})
export class ModalPageComponent {

    constructor( @Inject(CodeHighlightService) CodeHighlight ) {
        this.CodeHighlight = CodeHighlight;
        this.modalOpen = false;
    }

    ngAfterViewInit() {
        this.CodeHighlight.init();
    }

    showModal() {
        this.modalOpen = !this.modalOpen;
    }

    closeEdit() {
        this.modalOpen = false;
    }

}