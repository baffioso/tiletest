import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

import { environment } from '../../environments/environment';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/dark-v9';
    lat = 55.6669;
    lng = 12.5234;
    currentProperties = {};

    constructor() { }

    ngOnInit() {
        mapboxgl.accessToken = environment.mapbox.accessToken;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: this.style,
            zoom: 11.21,
            center: [this.lng, this.lat],
            hash: true
        });
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        this.map.on('load', () => {
            const layers = this.map.getStyle().layers;
            // Find the index of the first symbol layer in the map style
            let firstSymbolId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol') {
                    firstSymbolId = layers[i].id;
                    break;
                }
            }
            this.map.addLayer(
                {
                    id: 'signs',
                    type: 'circle',
                    source: {
                        type: 'vector',
                        tiles: [
                            'http://tegola.baffioso.dk/maps/puma/{z}/{x}/{y}.pbf'
                        ],
                        minzoom: 7,
                        maxzoom: 22
                    },
                    'source-layer': 'skilte',
                    paint: {
                        'circle-color': 'rgb(53, 175, 109)',
                        'circle-radius': 4
                    }
                }, firstSymbolId
            );

            this.map.on('mouseenter', 'signs', e => {
                this.map.getCanvas().style.cursor = 'pointer';
                const renderedFeatures = this.map.queryRenderedFeatures(e.point);
                this.currentProperties = renderedFeatures[0].properties;
            });

            this.map.on('mouseleave', 'signs', () => {
                this.map.getCanvas().style.cursor = '';
                this.currentProperties = {};
            });

            this.map.on('click', 'signs', e => {
                const renderedFeatures = this.map.queryRenderedFeatures(e.point);
                console.log(renderedFeatures);
                //this.currentProperties = renderedFeatures[0].properties
            });
        });
    }

}
