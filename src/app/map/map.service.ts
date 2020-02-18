import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeoJSON } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new EventEmitter();
  zoomToCoordinate = new EventEmitter();

  constructor() { }

  // setCurrentMapFeatures(mapFeatures) {
  //   console.log(mapFeatures);
  //   this.currentMapFeatures = mapFeatures;
  // }

  // getCurrentMapFeatures(): Observable<GeoJSON[]> {
  //   return of(this.currentMapFeatures);
  // }
}
