import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { BTDropdownComponent } from './b-dropdown.component';
import { BTButtonComponent } from './../b-button/b-button.component';
import { BTSpinnerComponent } from './../b-spinner/b-spinner.component'

describe('Dropdown component', () => {

    let component,
        fixture,
        debugElement,
        element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [
                BTDropdownComponent, // declare the test component
                BTButtonComponent,
                BTSpinnerComponent
            ],
        });
        fixture = TestBed.createComponent(BTDropdownComponent);
        component = fixture.componentInstance;
        // debugElement = fixture.debugElement.query(By.css('input[type=checkbox]'));
        // element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

});
