import { TestBed } from '@angular/core/testing';
import { BTDashboardLayoutComponent } from './l-dashboard.component';
import { BTDashboardLayoutService } from '../../services/dashboard-layout-service';

describe('Dashboard layout component', () => {

    let fixture,
        component;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ BTDashboardLayoutService ],
            declarations: [ BTDashboardLayoutComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTDashboardLayoutComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should open left aside', () => {
        component.openLeftAside();
        fixture.detectChanges();
        expect(component.leftAsideOpen).toBe(true);
    });

    it('should close left aside', () => {
        component.closeLeftAside();
        fixture.detectChanges();
        expect(component.leftAsideOpen).toBe(false);
    });

    it('should emit `exit` event', (done) => {
        component.exit.subscribe( () => {
            done();
        });
        component.onExit();
    });

});
