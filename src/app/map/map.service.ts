import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LAYERS } from './map-layers';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new Subject<any>();
  updateCurrentMapFeatures = new Subject();
  zoomToCoordinate = new Subject<[number, number]>();
  layersUpdated = new Subject();
  layers = this.layerList(LAYERS);

  layerList(layers) {
    return layers.map(i => {
      for (const layer of i.layers) {
         return {
           name: layer.layerName, 
           id: layer.id,
           visible: false,
           currentStyle: 'default'
         }
      }
    });
  }

}

