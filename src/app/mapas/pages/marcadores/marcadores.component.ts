import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerFtColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`

  .list-group{
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 200;
  }
  li{
    cursor: pointer;    
  }
  
  .mapa-container{
    height: 100%;
    width: 100%;
  }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 13;
  center: [number, number] = [-99.12895202636719,19.657693053670027];  
  marcadores: MarkerFtColor[] = [];

  

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({      
      container: this.divMapa.nativeElement, // container ID,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel,        
      // projection: 'globe',      
    });

    this.getMarkers();
    
  }

  irMarcador( marcador: mapboxgl.Marker){
    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    
      const nuevoMarcador = new mapboxgl.Marker({
        draggable: true,
        color
      })
        .setLngLat( this.mapa.getCenter() )
        .addTo( this.mapa );
        
      this.marcadores.push({
        marker: nuevoMarcador,
        color
      });
      this.persistMarkers(); 
  }
  
  
  
  persistMarkers(){
    const lngLatArr: MarkerFtColor[] = [];
    
    this.marcadores.forEach( m => {
      
      const color = m.color;
      const { lng , lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [lng, lat]        
      });      
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr)); 

  }
  
  getMarkers(){
    
    if( !localStorage.getItem('marcadores')){
      return
    }
      const lngLatArr: MarkerFtColor[] = JSON.parse('marcadores')!;
      
      lngLatArr.forEach( m => {
        const renewMarker = new mapboxgl.Marker({
          draggable: true,
          color: m.color,
        })
          .setLngLat( m.center! )
          .addTo( this.mapa );          
      })
  }
  
}






//
// const markerHtml: HTMLElement = document.createElement('div');
// markerHtml.innerHTML = 'HolaMundo';
// const marker = new mapboxgl.Marker({
//   element: markerHtml;
// })
//     .setLngLat( this.center )
//     .addTo( this.mapa );