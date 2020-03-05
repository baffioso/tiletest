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
    isAerial: boolean;
    private zoomToSub: Subscription;
    private layerControlSub: Subscription;
    private updateCurrentFeaturesSub: Subscription;
    private updateLayersSub: Subscription;
    private changeBaselayerSub: Subscription;

    constructor(private mapService: MapService) { }
    s
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
                this.renderActivatedMapLayers();
            });

        this.updateCurrentFeaturesSub = this.mapService.updateCurrentMapFeatures
            .subscribe(() => {
                const features: GeoJSON.Feature[] = this.map.queryRenderedFeatures(null, { layers: ['signs'] });

                if (features) {
                    const uniqueFeatures = this.getUniqueFeatures(features, 'gid');
                    const cnt = uniqueFeatures.length;
                    // render max 1000 items
                    if (cnt < 1000) {
                        this.mapService.currentMapFeatures.next({ count: cnt, features: uniqueFeatures });
                    } else {
                        this.mapService.currentMapFeatures.next({ count: cnt, features: [] });
                    }
                }
            });


        this.changeBaselayerSub = this.mapService.changeBaselayer.subscribe(isAerial => {
            if (isAerial) {
                this.isAerial = isAerial;
                this.map.setStyle('mapbox://styles/mapbox/satellite-v9')
                // this.map.on('styledata', () => {
                //     this.addSources();
                //     this.renderActivatedMapLayers();
                //     console.log(this.map.getStyle().layers)
                // });
            } else {
                this.isAerial = isAerial;
                this.map.setStyle('mapbox://styles/mapbox/light-v10')
                // this.map.on('styledata', () => {
                //     this.addSources();
                //     this.renderActivatedMapLayers();
                // });
            }
        })

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

            this.addSources();
            this.renderActivatedMapLayers();

            // add map sources and render acivated layers
            this.map.on('styledata', () => {
                this.addSources();
                this.renderActivatedMapLayers();
            });


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
            });

        });
    }

    ngOnDestroy() {
        this.zoomToSub.unsubscribe();
        this.layerControlSub.unsubscribe();
        this.updateCurrentFeaturesSub.unsubscribe();
        this.updateLayersSub.unsubscribe();
        this.changeBaselayerSub.unsubscribe();
    }

    addSources() {
        for (const layer of LAYERS) {
            if (!this.map.getSource(layer.sourceId)) {
                this.map.addSource(layer.sourceId, layer.source as mapboxgl.VectorSource);
            }
        }
    }

    renderActivatedMapLayers() {
        this.mapService.layers.forEach(layer => {
            if (layer.visible) {
                if (this.map.getLayer(layer.id)) {
                    this.map.setLayoutProperty(layer.id, 'visibility', 'visible');
                } else {
                    if (this.isAerial) {
                        this.map.addLayer(this.getLayerStyle(LAYERS, layer.id, layer.currentStyle));
                    }
                    this.map.addLayer(this.getLayerStyle(LAYERS, layer.id, layer.currentStyle), this.firstSymbolId);
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

    getLayerStyle(layers, layerId, styleId) {
        let layer;
        let style;
        for (const i of layers) {
            for (const l of i.layers) {
                if (l.layer.id === layerId) {
                    layer = l
                }
            }
        }
        for (const s of layer.styles) {
            if (s.meta.id === styleId) {
                style = s.style
            }
        }
        return Object.assign({}, layer.layer, style)
    }

}
