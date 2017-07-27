import { TestBed } from '@angular/core/testing';
import { BTCardComponent } from './l-card.component'

describe('Card component', () => {

    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BTCardComponent
            ],
        });
        fixture = TestBed.createComponent(BTCardComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

});
