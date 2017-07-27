export class BTGmapsDecorator {
    constructor() {
        const mapSettings = (uiSettings || {}).map || {};
        this.defaultZoom = mapSettings.defaultZoom || 5;
        this.minZoom = mapSettings.minZoom || 2;
        this.focusZoom = mapSettings.focusZoom || 10;
    }

    initMap(data, callback, ready) {
        this.ready = ready;
        this.data = data;
        const lastDataElementIndex = this.data.length - 1;

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: (this.data[lastDataElementIndex] && this.data[lastDataElementIndex].lat) || 0,
                lng: (this.data[lastDataElementIndex] && this.data[lastDataElementIndex].lng) || 0,
            },
            zoom: this.defaultZoom,
            minZoom: this.minZoom,
            fullscreenControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false,
        });

        this.clustersOptions = {
            zoomOnClick: true,
            minimumClusterSize: 5,
            imagePath: 'static/m',
            maxZoom: this.focusZoom - 1,
            averageCenter: true,
        };
        this.markerClusters = new MarkerClusterer(this.map, null, this.clustersOptions);

        let lastValidCenter = this.map.getCenter();
        google.maps.event.addListener(this.map, 'center_changed', () => {
            const currentCenter = this.map.getCenter();
            if (Math.abs(currentCenter.lat()) < 85) {
                lastValidCenter = currentCenter;
                return;
            }
            this.map.panTo(lastValidCenter);
        });

        const iconSize = 60;
        this.torqIcon = {
            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
            fillColor: '#378A83',
            fillOpacity: 1.0,
            scale: 2,
            strokeColor: 'transparent',
            strokeWeight: 0,
            // marker offset:
            anchor: new google.maps.Point(12, 23)
        };
        this.yellowIcon = {
            url: './static/m_yellow.svg',
            scaledSize: new google.maps.Size(iconSize, iconSize),
        };
        this.blueIcon = {
            url: './static/m_blue.svg',
            scaledSize: new google.maps.Size(iconSize, iconSize),
        };
        this.greenIcon = {
            url: './static/m_green.svg',
            scaledSize: new google.maps.Size(iconSize, iconSize),
        };
        this.darkIcon = {
            url: './static/m_dark.svg',
            scaledSize: new google.maps.Size(iconSize, iconSize),
        };
        this.brownIcon = {
            url: './static/m_brown.svg',
            scaledSize: new google.maps.Size(iconSize, iconSize),
        };

        this.ready.emit();
        if (callback) callback();
    }

    addMarker(markerData, toCenter) {
        this.markerClusters.addMarker(this.prepareMarker(markerData));

        if (toCenter) {
            this.focusMap({ lat: markerData.lat, lng: markerData.lng });
        }
    }

    prepareMarker(markerData) {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(markerData.lat, markerData.lng),
            map: this.map,
            icon: this.torqIcon
        });

        marker.addListener('click', () => this.openPopup(markerData, marker));

        return marker;
    }

    openPopup(markerData, marker) {
        if (this.popup) this.popup.close();

        const popupContent = `<strong>Marker</strong><br>
                              <span>Latitude: ${markerData.lat}</span><br>
                              <span>Longitude: ${markerData.lng}</span><br>`;

        this.popup = new google.maps.InfoWindow({
            content: popupContent,
        });
        this.popup.open(this.map, marker);
    }

    removeMarkers() {
        this.markerClusters.clearMarkers();
    }

    focusMap(coords) {
        this.map.panTo({ lat: coords.lat, lng: coords.lng });
        this.map.setZoom(this.focusZoom);
    }

    setWheelZoom(value) {
        if (value) {
            this.map.setOptions({ scrollwheel: true });
        } else {
            this.map.setOptions({ scrollwheel: false });
        }
    }

    setTouchEvents(value) {
        const options = {
            disableDoubleClickZoom: false,
            draggable: false,
            gestureHandling: 'auto',
        };

        if (!value) {
            options.disableDoubleClickZoom = true;
            options.draggable = true;
            options.gestureHandling = 'none';
        }

        this.map.setOptions(options);
    }

    destructMap() {
        if (this.markerClusters) this.markerClusters.clearMarkers();
        delete this.map;
    }
}
