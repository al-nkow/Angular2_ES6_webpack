import { Component, Inject, EventEmitter, Input, Output } from '@angular/core';
import template from './l-map.template.pug';
import style from './l-map.base.scss';

import { BTLayoutService } from '../../services/layout-service';
import { BTImporterService } from '../../services/importer-service';

import { BTGmapsDecorator } from './gmaps.decorator';
import { BTLeafletDecorator } from './leaflet.decorator';

@Component({
    'selector': 'bt-map',
    'template': template,
    'styles': [style],
})
export class BTMapComponent {
    @Input() data;
    @Input() provider;
    @Input() center;
    @Input() wheelZoom;
    @Input() blockTouch;

    @Output() ready = new EventEmitter();

    constructor(@Inject(BTLayoutService) layoutService, @Inject(BTImporterService) importer) {
        this.layout = layoutService;
        this.importer = importer;
    };

    ngAfterViewInit() {
        let jsUrls = [];
        let cssUrls = [];
        const callback = () => {
            this.layout.setState('maplibs', 'loaded');
            this.mapInitted = true;
        };

        switch (this.provider) {
            case 'gmaps':
                if (!this.decorator) {
                    this.decorator = new BTGmapsDecorator();
                }
                jsUrls = [
                    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXNVN85vUfmXKUSJNQGVipBsZBpR6OOhg',
                    'https://cdnjs.cloudflare.com/ajax/libs/js-marker-clusterer/1.0.0/markerclusterer_compiled.js'
                ];
                break;

            case 'leaflet':
                if (!this.decorator) {
                    this.decorator = new BTLeafletDecorator();
                }
                jsUrls = [
                    { url: 'https://unpkg.com/leaflet@1.0.1/dist/leaflet.js', provides: 'L' },
                    {
                        url: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.0.0/leaflet.markercluster.js',
                        requires: 'L',
                    },
                ];
                cssUrls = [
                    'https://unpkg.com/leaflet@1.0.1/dist/leaflet.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.0.0/MarkerCluster.css',
                    'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.0.0/MarkerCluster.Default.css',
                ];
                break;
        }

        this.importer.prepareFiles({
            'css': cssUrls,
            'js': jsUrls,
        }).then(() => {
            this.decorator.initMap(this.data, callback, this.ready);
            if (this.data) this.addMarkersOnMap(this.data, false);
        });
    }

    ngDoCheck() {
        if ((this.wheelZoom !== this.oldWheelZoom) && this.mapInitted) {
            this.oldWheelZoom = this.wheelZoom;
            this.decorator.setWheelZoom(this.wheelZoom);
        }

        if ((this.blockTouch !== this.oldBlockTouch) && this.mapInitted) {
            this.oldBlockTouch = this.blockTouch;
            this.decorator.setTouchEvents(!this.blockTouch);
        }
    }

    ngOnChanges(changes) {
        if (!this.mapInitted) return;
        if (changes.center && changes.center.currentValue) {
            this.decorator.focusMap(changes.center.currentValue);
        }
        if (changes.data) {
            if (changes.data.previousValue instanceof Array) {
                this.addMarkersOnMap(changes.data.currentValue, !changes.data.previousValue.length);
            }
        }
    }

    /**
     * Add markers on the map, using the decorator
     * @param {array} arrayMarkers
     * @param {boolean} toCenter
     */
    addMarkersOnMap (arrayMarkers, toCenter) {
        this.decorator.removeMarkers();
        if (!arrayMarkers.length) return;
        arrayMarkers.forEach((marker) => {
            this.decorator.addMarker(marker, toCenter);
        });
    }

    ngOnDestroy() {
        if (this.mapInitted) this.decorator.destructMap();
    }
}

