import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { BTTableServerComponent } from './b-table-server.component';
import { BTInputComponent } from './../b-input/b-input.component';
import { BTButtonComponent } from './../b-button/b-button.component';
import { BTSpinnerComponent } from './../b-spinner/b-spinner.component'
import { Ng2PaginationModule } from 'ng2-pagination';

describe('Server table component', () => {

    let component,
        fixture;
        // debugElement,
        // element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule, Ng2PaginationModule ],
            declarations: [
                BTTableServerComponent,
                BTInputComponent,
                BTButtonComponent,
                BTSpinnerComponent
            ] // declare the test component
        });
        fixture = TestBed.createComponent(BTTableServerComponent);
        component = fixture.componentInstance;
        // debugElement = fixture.debugElement.query(By.css('input[type=checkbox]'));
        // element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });


});
