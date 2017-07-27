import { TestBed, inject } from '@angular/core/testing';
import { BTDonutChartComponent } from './b-donut-chart.component';
import { BTImporterService } from './../../services/importer-service.js';
import { BTLoggerService } from './../../services/logger-service.js';

describe('Pie chart `bt-donut-chart` component', () => {
    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ BTImporterService, BTLoggerService ],
            declarations: [ BTDonutChartComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTDonutChartComponent);
        component = fixture.componentInstance;

        // must run ngOnChanges to initialize the component
        component.ngOnChanges({});
    });


    it('should have a defined component', (done) => {
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

    // it('Should define BTImporterService',
    //     inject([BTImporterService], (BTImporterService) => {
    //         expect(BTImporterService).toBeDefined();
    //     }));

});
