import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BTMapComponent } from './l-map.component';

import { BTLayoutService } from '../../services/layout-service';
import { BTImporterService } from '../../services/importer-service';

describe('Map `bt-map` gmaps component', () => {
    let component,
        fixture,
        debugElement,
        element;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BTLayoutService,
                BTImporterService
            ],
            declarations: [
                BTMapComponent
            ],
        });
        fixture = TestBed.createComponent(BTMapComponent);
        component = fixture.componentInstance;

        debugElement = fixture.debugElement.query(By.css('#map'));
        element = debugElement.nativeElement;

    });

    it('should have a defined `bt-map` component', () => {
        expect(component).toBeDefined();
    });

    it('should have a defined #map element', () => {
        expect(element).toBeDefined();   
    });

    it('should add markers and set center', (done) => {
        component.data = [{lat: 59.954030, lng: 30.355425}];
        component.provider = 'gmaps';
        
        component.ready.subscribe( () => { 

            // check set center
            component.decorator.map.setCenter(new google.maps.LatLng(59.962171, 30.361873));
            let lat = component.decorator.map.getCenter().lat();
            let lng = component.decorator.map.getCenter().lng()
            let coords = {};
            coords.lat = Math.round(lat*1000000)/1000000;
            coords.lng = Math.round(lng*1000000)/1000000;
            expect({lat: 59.962171, lng: 30.361873}).toEqual(coords);

            // check the addition of markers
            component.decorator.addMarker({lat: 59.954030, lng: 30.355425}, false);
            component.decorator.addMarker({lat: 61.638195, lng: 32.883530}, false);
            let markers = component.decorator.markerClusters.getMarkers();
            expect(markers.length).toBe(2);

            done();
        });

        component.ngAfterViewInit();   
    });

});
