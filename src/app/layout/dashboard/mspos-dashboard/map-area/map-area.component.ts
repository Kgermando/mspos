import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SOSPieModel } from '../../models/summary-dashboard.model';

interface Province {
  name: string;
  capital: string;
  coordonates: { lat: number, lng: number }
}

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrl: './map-area.component.scss'
})
export class MapAreaComponent {
  @Input() isLoading: boolean = false;
  @Input() sosMapList: SOSPieModel[] = [];

  @ViewChild('.map-container', { static: true }) mapContainer!: ElementRef;

  @ViewChild('mapImage', { static: true }) mapImage!: ElementRef;

  scale = 0;

  ngOnInit() {
   
    const imageWidth = this.mapImage.nativeElement.width;
    const imageHeight = this.mapImage.nativeElement.height;
    this.scale = imageWidth / 360;

    console.log("imageWidth", imageWidth)
    

    // const mapMarkers = this.mapContainer.nativeElement.querySelectorAll('.kinshasa');
    // mapMarkers.forEach((marker: { style: { backgroundColor: string; top:  number, left: number}; }) => {
    //   // marker.style.backgroundColor = 'red';  
    //   marker.style.top = 52,
    //   marker.style.left = 20
    // });
  }
}
