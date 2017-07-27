import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BTCheckboxComponent } from './b-checkbox.component';

describe('Checkbox component', () => {
    let component,
        fixture,
        debugElement,
        element;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ BTCheckboxComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTCheckboxComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('input[type=checkbox]'));
        element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should have `name` attribute', () => {
        expect(element.getAttribute('name')).not.toBeNull();
    });

    it('should have `type` attribute', () => {
        expect(element.getAttribute('type')).toBe('checkbox');
    });

    it('should be `required` when `required` @input is `true`', () => {
        expect(element.getAttribute('required')).toBeNull(); // in the initial state item has no required attribute
        component.required = true;
        fixture.detectChanges();
        expect(element.getAttribute('required')).not.toBeNull();
        component.required = false;
        fixture.detectChanges();
    });

    it('should be `checked` when `checked` @input is `true`', () => {
        expect(element.getAttribute('checked')).toBeNull();
        component.checked = true;
        fixture.detectChanges();
        expect(element.getAttribute('checked')).not.toBeNull();
        component.checked = false;
        fixture.detectChanges();
    });

    it('should be `disabled` when `disabled` @input is `true`', () => {
        expect(element.getAttribute('disabled')).toBeNull();
        component.disabled = true;
        fixture.detectChanges();
        expect(element.getAttribute('disabled')).not.toBeNull();
        component.disabled = false;
        fixture.detectChanges();
    });

    it('should have class `middle` when `middle` @input is `true`', () => {
        expect(element.getAttribute('class')).not.toMatch('middle');
        component.middle = true;
        fixture.detectChanges();
        expect(element.getAttribute('class')).toMatch('middle');
        component.middle = false;
        fixture.detectChanges();
    });

    it('should change value when `checked` @input changes', () => {
        let init = element.checked;
        component.checked = !component.checked;
        fixture.detectChanges();
        expect(element.checked).toBe(!init);
        component.checked = !component.checked;
        fixture.detectChanges();
    });

    // Unit Testing EventEmitter
    it('should emit `check` event', (done) => {
        component.check.subscribe(g => { // subscribe on 'check' event
            // expect(g).toEqual(_);
            done();
        });
        component.onValueChange(true);
    });

    it('should emit `uncheck` event', (done) => {
        component.uncheck.subscribe(g => {
            // expect(g).toEqual(_);
            done();
        });
        component.onValueChange(false);
    });


});
