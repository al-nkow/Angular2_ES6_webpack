import {Directive, ElementRef, Output, EventEmitter, HostListener, Inject} from '@angular/core';

@Directive({
    selector: '[clickOutside]'
})
export class BTClickOutsideDirective {
    constructor(@Inject(ElementRef) elementRef) {
        this._elementRef = elementRef;
    }

    @Output() clickOutside = new EventEmitter();
    @HostListener('document:click', ['$event.target'])

    onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
