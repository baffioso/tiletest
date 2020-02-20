import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new Subject<GeoJSON.Feature[]>();
  zoomToCoordinate = new Subject<[number, number]>();
  toggle500kPoints = new EventEmitter<boolean>();
  layers = [
    {name: 'Vejskilte', id: 'signs', visible: false},
    {name: '500K punkter', id: '500k_points', visible: false}
  ];
  // layerToggled = new EventEmitter<{name: string, id: string, visible: boolean}[]>();
}
