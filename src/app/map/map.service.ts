import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new EventEmitter<GeoJSON.Feature[]>();
  zoomToCoordinate = new EventEmitter<[number, number]>();
}
