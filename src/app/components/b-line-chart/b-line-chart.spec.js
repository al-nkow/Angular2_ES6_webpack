import { TestBed, inject } from '@angular/core/testing';
import { BTLineChartComponent } from './b-line-chart.component';
import { BTImporterService } from './../../services/importer-service.js';

describe('Line chart `bt-line-chart` component', () => {
    let component,
        fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ BTImporterService ],
            declarations: [ BTLineChartComponent ], // declare the test component
        });
        fixture = TestBed.createComponent(BTLineChartComponent);
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

});
