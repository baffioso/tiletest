import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment';
import { MapService } from './map.service';
import { LAYERS } from './map-layers';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {
    map: mapboxgl.Map;
    style = 'mapbox://styles/mapbox/dark-v9';
    lat = 55.6669;
    lng = 12.5234;
    firstSymbolId: string;
    marker: mapboxgl.Marker;
    infoBox: { signId: string, image: string };
    showSignTools = false;
    private zoomToSub: Subscription;
    private layerControlSub: Subscription;
    private updateCurrentFeaturesSub: Subscription;
    private updateLayersSub: Subscription;

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.zoomToSub = this.mapService.zoomToCoordinate
            .subscribe(coordinate => {
                this.flyTo(coordinate);
                if (this.marker) {
                    this.marker.remove();
                }
                this.marker = new mapboxgl.Marker().setLngLat(coordinate).addTo(this.map);
            });

        this.layerControlSub = this.mapService.layersUpdated
            .subscribe(() => {
                this.renderMapLayers();
            });

        this.updateCurrentFeaturesSub = this.mapService.updateCurrentMapFeatures
            .subscribe(() => {
                const features: GeoJSON.Feature[] = this.map.queryRenderedFeatures(null, { layers: ['signs'] });

                if (features) {
                    const uniqueFeatures = this.getUniqueFeatures(features, 'gid');
                    // render max 1000 items
                    if (uniqueFeatures.length < 1000) {
                        this.mapService.currentMapFeatures.next(uniqueFeatures);
                    } else {
                        this.mapService.currentMapFeatures.next([]);
                    }
                }
            });

        this.updateLayersSub = this.mapService.layersUpdated
            .subscribe(() => {
                this.showSignTools = this.mapService.layers[0].visible;
            });
    }

    ngAfterViewInit() {

        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(environment.mapbox.accessToken);

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
            for (const layer of layers) {
                if (layer.type === 'symbol') {
                    this.firstSymbolId = layer.id;
                    break;
                }
            }

            this.map.addSource('signs', {
                type: 'vector',
                tiles: [
                    'https://tegola.baffioso.dk/maps/puma/{z}/{x}/{y}.pbf'
                ],
                minzoom: 7,
                maxzoom: 22
            });

            this.map.addSource('tiletest', {
                type: 'vector',
                tiles: [
                    'https://tegola.baffioso.dk/maps/test/{z}/{x}/{y}.pbf'
                ],
                minzoom: 7,
                maxzoom: 22
            });

            this.renderMapLayers();

            this.map.on('mouseenter', 'signs', e => {
                this.map.getCanvas().style.cursor = 'pointer';
                const renderedFeatures = this.map.queryRenderedFeatures(e.point);
                this.infoBox = {
                    signId: renderedFeatures[0].properties.hovedtavle_1,
                    image: renderedFeatures[0].properties.foto_id
                };
            });

            this.map.on('mouseleave', 'signs', () => {
                this.map.getCanvas().style.cursor = '';
                this.infoBox = null;
            });

            this.map.on('click', 'signs', e => {
                const renderedFeatures = this.map.queryRenderedFeatures(e.point);
                // this.currentProperties = renderedFeatures[0].properties
            });

        });
    }

    ngOnDestroy() {
        this.zoomToSub.unsubscribe();
        this.layerControlSub.unsubscribe();
        this.updateCurrentFeaturesSub.unsubscribe();
        this.updateLayersSub.unsubscribe();
    }

    renderMapLayers() {
        this.mapService.layers.forEach(layer => {
            if (layer.visible) {
                if (this.map.getLayer(layer.id)) {
                    this.map.setLayoutProperty(layer.id, 'visibility', 'visible');
                } else {
                    this.map.addLayer(LAYERS[layer.id].layer, this.firstSymbolId);
                }
            } else {
                if (this.map.getLayer(layer.id)) {
                    this.map.setLayoutProperty(layer.id, 'visibility', 'none');
                }
                if (this.marker) {
                    this.marker.remove();
                }
            }
        });
    }

    flyTo(coordinate: [number, number]) {
        this.map.flyTo({
            center: coordinate,
            zoom: 19
        });
    }

    filterFeatures(signId: string) {
        if (signId === 'Alle') {
            this.map.setFilter('signs', null);
        } else {
            this.map.setFilter('signs', ['==', 'hovedtavle_1', signId]);
        }
    }

    getUniqueFeatures(array: GeoJSON.Feature[], comparatorProperty: string) {
        const existingFeatureKeys = {};
        // Because features come from tiled vector data, feature geometries may be split
        // or duplicated across tile boundaries and, as a result, features may appear
        // multiple times in query results.
        const uniqueFeatures = array.filter(el => {
            if (existingFeatureKeys[el.properties[comparatorProperty]]) {
                return false;
            } else {
                existingFeatureKeys[el.properties[comparatorProperty]] = true;
                return true;
            }
        });

        return uniqueFeatures;
    }
}
