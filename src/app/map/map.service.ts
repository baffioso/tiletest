import { Injectable, EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new Subject<any[]>();
  zoomToCoordinate = new Subject<[number, number]>();
  layers = new Subject<{name: string, id: string, visible: boolean}[]>();
}
