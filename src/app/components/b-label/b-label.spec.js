import { TestBed } from '@angular/core/testing';
import { BTLabelComponent } from './b-label.component';

describe('Label component', () => {

    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BTLabelComponent
            ],
        });
        fixture = TestBed.createComponent(BTLabelComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

});
