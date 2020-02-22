import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {
  showLayerControl = false;
  layers = [
    { name: 'Vejskilte', id: 'signs', visible: false },
    { name: '500K punkter', id: 'many_points', visible: false }
  ];

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  toggleLayerVisibility(layerId: string) {
    const idx = this.layers.findIndex(i => i.id === layerId);
    this.layers[idx].visible = !this.layers[idx].visible;
    this.mapService.layers.next(this.layers);
  }
}
