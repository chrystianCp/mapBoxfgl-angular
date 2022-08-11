import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    width: 400px;
    z-indez:9999;
  }
`]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 11;
  center: [number, number] = [-99.12895202636719,19.657693053670027];  

  constructor() {
    console.log('constructor',this.divMapa);
   }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }
  
   ngAfterViewInit(): void {    

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel,         
    });

    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();      
    });

    this.mapa.on('zoomend', (ev) => {
      if(this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);      
      }
    });

    // map movement
    this.mapa.on('move', (event) => {
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center= [lng, lat];
    })

  }

  zoomIn(){    
    this.mapa.zoomIn();        
  }

  zoomCambio( valor: string ){    
    this.mapa.zoomTo( Number(valor) );
  }
  
  zoomOut(){
    this.mapa.zoomOut();    
  }

}
