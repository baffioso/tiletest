import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  currentMapFeatures = new Subject<any>();
  updateCurrentMapFeatures = new Subject();
  zoomToCoordinate = new Subject<[number, number]>();
  layersUpdated = new Subject();
  layers = [
    { name: 'Vejskilte', id: 'signs', visible: false },
    { name: '500K punkter', id: 'many_points', visible: false },
    { name: 'Matrikel', id: 'matrikel', visible: false }
  ];
}
