import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BTButtonComponent } from './b-button.component';
import { BTSpinnerComponent } from '../b-spinner/b-spinner.component';

describe('Button component', () => {
    let component,
        fixture,
        debugElement,
        element;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ BTButtonComponent, BTSpinnerComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTButtonComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.css('button'));
        element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should change `type` attribute', () => {
        component.type = 'submit';
        fixture.detectChanges();
        expect(element.getAttribute('type')).toEqual('submit');
    });

    it('should add spinner when `loading` is set to true', () => {
        let children = element.children;
        expect(children[0].children.length).toEqual(0);

        component.loading = true;
        fixture.detectChanges();

        expect(children[0].children.length).toEqual(1);
        expect(children[0].nodeName.toLowerCase()).toEqual('bt-spinner');
    });

    it('should add `disabled` when `loading` is `true`', () => {
        expect(element.getAttribute('disabled')).toBeNull();
        component.loading = true;
        fixture.detectChanges();
        expect(element.getAttribute('disabled')).not.toBeNull();
        component.loading = false;
        fixture.detectChanges();
    });

    it('should change `color` attribute', () => {
        component.color = 'secondary';
        fixture.detectChanges();
        expect(element.getAttribute('color')).toEqual('secondary');
    });
});
