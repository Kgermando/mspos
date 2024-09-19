import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map-area',
  templateUrl: './map-area.component.html',
  styleUrl: './map-area.component.scss'
})
export class MapAreaComponent {
  @Input() isLoading: boolean = false;
  @Input() sosPieLIst: any[] = [];

  @ViewChild('.map-container', { static: true }) mapContainer!: ElementRef;

  ngOnInit() {
    const mapMarkers = this.mapContainer.nativeElement.querySelectorAll('.kinshasa');
    // mapMarkers.forEach((marker: { style: { backgroundColor: string; top:  number, left: number}; }) => {
    //   // marker.style.backgroundColor = 'red';  
    //   marker.style.top = 52,
    //   marker.style.left = 20
    // });
  }
}
