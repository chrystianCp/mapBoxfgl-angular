import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapa-container{
    height: 100%;
    width: 100%;
  }
  .row {
    background-color: white;
    border-radius: 6px;
    bottom: 60px;
    left: 32px;
    padding: 10px;
    position: fixed;
    z-indez:9999;
  }
`]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 11;

  constructor() {
    console.log('constructor',this.divMapa);
   }
  
   ngAfterViewInit(): void {

    console.log('AfterViewInit',this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-99.12895202636719,19.657693053670027], // starting position [lng, lat]
      zoom: this.zoomLevel,         
    });

  }

  zoomIn(){
    this.zoomLevel = this.mapa.getZoom();
    this.mapa.zoomIn();    
  }
  
  zoomOut(){
    this.zoomLevel = this.mapa.getZoom();
    this.mapa.zoomOut();    
  }

}
