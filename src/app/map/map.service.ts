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
  changeBaselayer = new Subject<boolean>();
  layers = this.layerList(LAYERS);

  layerList(layers) {
    let ls = []
    for (const i of layers) {
      for (const l of i.layers) {
        ls.push({
             name: l.layer.name, 
             id: l.layer.id,
             visible: false,
             currentStyle: 'default',
             styles: l.styles.map(i => i.meta)
         })
      }
    }
    console.log(ls)
    return ls
  }
}

