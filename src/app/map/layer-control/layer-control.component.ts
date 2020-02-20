import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})
export class LayerControlComponent implements OnInit {
  layers = [
    {name: 'Vejskilte', id: 'signs', visible: false},
    {name: '500K punkter', id: '500k_points', visible: false}
  ];

  constructor( private mapService: MapService) { }

  ngOnInit() {
  }

  toggleLayerVisibility(layerId: string) {
    const idx = this.layers.findIndex( i => i.id === layerId);
    this.layers[idx].visible = !this.layers[idx].visible;
  }
}
