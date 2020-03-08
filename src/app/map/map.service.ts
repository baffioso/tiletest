import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LAYERS } from './map-layers';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  currentMapFeatures = new Subject<any>();
  updateCurrentMapFeatures = new Subject();
  zoomToCoordinate = new Subject<[number, number]>();
  updateLayerVisible = new Subject();
  updateLayerStyle = new Subject();
  changeBaselayer = new Subject<boolean>();
  layers = LAYERS;
  layerControl = this.layerList(this.layers);
  firstSymbolId: string;
  marker: mapboxgl.Marker;
  isAerial: boolean;

  constructor(private http: HttpClient) {
    // this.getLayers().subscribe( res => {
    //   console.log(res);
    //   this.layers = res;
    //   this.layerControl = this.layerList(this.layers);
    // });
   }

  getLayers() {
    return this.http.get('https://baffioso.github.io/config/layers.json');
  }

  layerList(layers) {
    const ls = [];
    for (const i of layers) {
      for (const l of i.layers) {
        ls.push({
          name: l.layer.name,
          id: l.layer.id,
          visible: false,
          currentStyle: l.styles[0].meta.id,
          styles: l.styles.map(p => p.meta )
        });
      }
    }
    return ls;
  }
}

