import { TestBed } from '@angular/core/testing';
import { BTRightAsideComponent } from './b-right-aside.component';

describe('Right aside component', () => {
    let component,
        fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BTRightAsideComponent ]
        });
        fixture = TestBed.createComponent(BTRightAsideComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should emit `close` event', (done) => {
        component.close.subscribe( () => {
            done();
        });
        component.closeAside();
    });

});
