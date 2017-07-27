import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BTInputComponent } from './b-input.component';

describe('Input `bt-input` component', () => {

    let component,
        fixture,
        debugElement,
        element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ BTInputComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTInputComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('.input > input'));
        element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should have `type` attribute', () => {
        fixture.detectChanges(); // init attributes
        expect(element.getAttribute('type')).not.toBeNull();
    });

    it('should be `required` when `required` @input is `true`', () => {
        expect(element.getAttribute('required')).toBeNull();
        component.required = true;
        fixture.detectChanges();
        expect(element.getAttribute('required')).not.toBeNull();
        component.required = false;
        fixture.detectChanges();
    });

    it('should have `placeholder` when `placeholder` @input is `true`', () => {
        expect(element.getAttribute('placeholder')).toBeNull();
        component.placeholder = true;
        fixture.detectChanges();
        expect(element.getAttribute('placeholder')).not.toBeNull();
        component.placeholder = false;
        fixture.detectChanges();
    });

    // Unit Testing EventEmitter
    it('should emit `focus` event', (done) => {
        component.focus.subscribe(g => { // subscribe on 'focus' event
            expect(g).toBe(true);
            done();
        });
        component.onFocus();
    });

    it('should emit `focus` event', (done) => {
        component.focus.subscribe(g => { // subscribe on 'focus' event
            expect(g).toBe(false);
            done();
        });
        component.onBlur();
    });

    it('should emit `cleared` event', (done) => {
        component.value = true;
        fixture.detectChanges();
        component.cleared.subscribe( () => { // subscribe on 'cleared' event
            // no data is transmitted in the event
            done();
        });
        component.onClear();
    });

});
