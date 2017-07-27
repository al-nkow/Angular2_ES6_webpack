import { TestBed } from '@angular/core/testing';
import { BTTabsComponent } from './l-tabs.component';

describe('Tabs component', () => {

    let fixture,
        component,
        debugElement,
        element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ BTTabsComponent ]
        });
        fixture = TestBed.createComponent(BTTabsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should add tabs', (done) => {
        let tabsBefore = element.querySelectorAll('.header li');
        expect(tabsBefore.length).toBe(0);
        component.addTab({title: 'test1'});
        component.addTab({title: 'test2'});
        fixture.detectChanges();
        let tabsAfter = element.querySelectorAll('.header li');
        expect(tabsAfter.length).toBe(2);
        done();
    });

    it('should emit `tabSelect` event', (done) => {
        component.tabSelect.subscribe( () => {
            done();
        });
        component.onTabSelect({});
    });

});
