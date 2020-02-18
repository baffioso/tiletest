import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GeoJSON } from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new EventEmitter();
  zoomToCoordinate = new EventEmitter();
}

