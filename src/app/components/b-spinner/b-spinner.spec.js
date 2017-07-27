import { TestBed } from '@angular/core/testing';
import { BTSpinnerComponent } from './b-spinner.component'

describe('Spinner component', () => {

    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BTSpinnerComponent
            ],
        });
        fixture = TestBed.createComponent(BTSpinnerComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

});
