import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MyElement } from './components/my-component/my-comp.component';
import { ScssPugComponent } from './components/scsspug-comp/scsspug-comp.component';
describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [AppComponent, MyElement, ScssPugComponent]});
    });
    it ('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });
});
