import { TestBed, inject } from '@angular/core/testing';
import { BTBarChartComponent } from './b-bar-chart.component';
import { BTImporterService } from './../../services/importer-service.js';
import { BTLoggerService } from './../../services/logger-service.js';

describe('Bar chart `bt-bar-chart` component', () => {
    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ BTImporterService, BTLoggerService ],
            declarations: [ BTBarChartComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTBarChartComponent);
        component = fixture.componentInstance;

        // must run ngOnChanges to initialize the component
        component.ngOnChanges({});
    });

    it('should have a defined component BTBarChartComponent', (done) => {
        // expect(true).toBe(true);
        component.chartistLoadingPromise.then(() => {
            expect(component).toBeDefined();
            done();
        });
    });

    it('Should define BTImporterService', (done) => {
        component.chartistLoadingPromise.then(() => {
            expect(component.importer).toBeDefined();
            done();
        });
    });

});
