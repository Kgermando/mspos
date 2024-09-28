import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMapModel } from '../../models/summary-dashboard.model';

interface Marker {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.scss'
})
export class MapCardComponent implements OnChanges {
  @Input() isLoading!: boolean;
  @Input() googleMapList: GoogleMapModel[] = [];

  center: google.maps.LatLngLiteral = { lat: -4.350900786588518, lng: 15.32577513250754 };
  zoom = 12;
  markers: Marker[] = [];
  // markers: Marker[] = [
  //   { lat: -4.339385342431349, lng: 15.30431157910042 },  
  //   { lat: -4.3541650218015215, lng: 15.299808484333491 },
  //   { lat: -4.373157701888443, lng: 15.298692160563983 },
  //   { lat: -4.342099066851547, lng: 15.221011166145448 },
  //   { lat: -4.381524298452848, lng: 15.345097337706378 },  
  // ];

  Lat = 0;
  Lng = 0;

  ngOnChanges(changes: SimpleChanges): void {
    for (let index = 0; index < this.googleMapList.length; index++) {
      const element = this.googleMapList[index];
      this.markers.push({ lat: element.Lat, lng: element.Lng });
      // Lat = element.Lat;
      // Lng = element.Lng
    }

    // this.markers.push({ lat: Lat, lng: Lng });

    console.log("markers", this.markers);
  }

}
