export class BTLeafletDecorator {
    constructor() {
        this.isInit = false;
        const mapSettings = (uiSettings || {}).map || {};
        this.defaultZoom = mapSettings.defaultZoom || 3;
        this.minZoom = mapSettings.minZoom || 2;
        this.focusZoom = mapSettings.focusZoom || 8;
    }

    initMap(data, callback, ready) {
        this.ready = ready;
        this.constructMap(data);

        if (callback) callback();
    }

    constructMap(data) {
        this.data = data;

        // bounds to not let user pan out of map vertically
        // horizontal repeat is handled by 'worldCopyJump: true'
        const bigEnoughToMakeHorizontalScrollInfinite = 1000000000;

        const bounds = [
            [-90, -bigEnoughToMakeHorizontalScrollInfinite], // SW
            [90, bigEnoughToMakeHorizontalScrollInfinite],   // NE
        ];

        this.map = L.map('map', {
            minZoom: this.minZoom,
            worldCopyJump: true,
            scrollWheelZoom: false,
            maxBounds: bounds,
            maxBoundsViscosity: 0.5,
            detectRetina: true,
        }).setView([this.data[0] ? this.data[0].lat : 0, this.data[0] ? this.data[0].lng : 0], this.defaultZoom);

        this.attribution = this.map.attributionControl;
        this.attribution.setPrefix('<a target="_blank" href="http://leafletjs.com">Leaflet</a>');

        // OSM
        this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: ['a', 'b', 'c'],
        }).addTo(this.map);

        const markerSize = 60;
        this.torqIcon = L.icon({
            iconUrl: './static/m_torq.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });
        this.yellowIcon = L.icon({
            iconUrl: './static/m_yellow.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });
        this.blueIcon = L.icon({
            iconUrl: './static/m_blue.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });
        this.greenIcon = L.icon({
            iconUrl: './static/m_green.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });
        this.darkIcon = L.icon({
            iconUrl: './static/m_dark.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });
        this.brownIcon = L.icon({
            iconUrl: './static/m_brown.svg',
            iconSize: [markerSize, markerSize],
            iconAnchor: [markerSize / 2, markerSize],
            popupAnchor: [0, -markerSize],
        });

        this.markerClusters = L.markerClusterGroup({
            animateAddingMarkers: true,
        });
        this.isInit = true;
        this.map.addLayer(this.markerClusters);

        this.data.forEach((marker) => {
            this.addMarker(marker, false);
        });

        this.ready.emit();
    }

    addMarker(marker, toCenter) {
        if (!this.isInit) {
            return;
        }

        const preparedMarker = this.prepareMarker(marker);
        this.markerClusters.addLayer(preparedMarker);

        if (toCenter) {
            this.map.setView([marker.lat, marker.lng], this.focusZoom);
        }
    }

    prepareMarker(marker) {
        const icon = this.torqIcon;

        return L
            .marker([marker.lat, marker.lng], { icon })
            .bindPopup(`<strong>Marker</strong><br>
                        <span>Latitude: ${marker.lat}</span><br>
                        <span>Longitude: ${marker.lng}</span><br>`);
    }

    removeMarkers() {
        this.map.removeLayer(this.markerClusters);
        this.markerClusters = L.markerClusterGroup({
            animateAddingMarkers: true,
            spiderLegPolylineOptions: { weight: 0, color: '#222', opacity: 0 },
            chunkedLoading: true,
            disableClusteringAtZoom: this.focusZoom - 1,
        });
        this.map.addLayer(this.markerClusters);
    }

    focusMap(coords) {
        this.map.setView([coords.lat, coords.lng], this.focusZoom, { animate: true });
    }

    setWheelZoom(value) {
        if (value) {
            this.map.scrollWheelZoom.enable();
        } else {
            this.map.scrollWheelZoom.disable();
        }
    }

    setTouchEvents(value) {
        if (value) {
            this.map.scrollWheelZoom.enable();
            this.map.dragging.enable();
            this.map.touchZoom.enable();
            this.map.doubleClickZoom.enable();
            this.map.boxZoom.enable();
            this.map.keyboard.enable();
            if (this.map.tap) this.map.tap.enable();
        } else {
            this.map.scrollWheelZoom.disable();
            this.map.dragging.disable();
            this.map.touchZoom.disable();
            this.map.doubleClickZoom.disable();
            this.map.boxZoom.disable();
            this.map.keyboard.disable();
            if (this.map.tap) this.map.tap.disable();
        }
    }

    destructMap() {
        delete this.markerClusters;
        delete this.map;
    }
}
