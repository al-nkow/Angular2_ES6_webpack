import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BTModalComponent } from './l-modal.component';

describe('Modal component', () => {
    let component,
        fixture,
        debugElement,
        element;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BTModalComponent ]
        });
        fixture = TestBed.createComponent(BTModalComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should emit `close` event by click outside', (done) => {

        component.open = true;
        fixture.detectChanges();

        debugElement = fixture.debugElement.query(By.css('#overlay'));
        element = debugElement.nativeElement;

        component.close.subscribe( () => {
            fixture.detectChanges();
            done();
        });

        element.click();
        fixture.detectChanges();

    });

});
