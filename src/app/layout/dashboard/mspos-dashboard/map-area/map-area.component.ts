import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
export class MapAreaComponent implements OnChanges {

  @Input() isLoading: boolean = false;
  @Input() sosMapList: SOSPieModel[] = [];

  @ViewChild('.map-container', { static: true }) mapContainer!: ElementRef;

  @ViewChild('mapImage', { static: true }) mapImage!: ElementRef;
 


  scale = 2; 

  scaleKongoCentral = 2;
  scaleKinshasa = 2;
  scaleMaiNdombe = 2;
  scaleKwango = 2;
  scaleKwilu = 2;
  scaleKasai = 2;
  scaleKasaiCentral = 2;
  scaleKasaiOriental = 2;
  scaleLomami = 2;
  scaleLualaba = 2;
  scaleHautLomami = 2;
  scaleHautKatanaga = 2;
  scaleTanganyka = 2;
  scaleSudKivu = 2;
  scaleManiema = 2;
  scaleNordKivu = 2;
  scaleIturi = 2;
  scaleHautUele = 2;
  scaleTshiopo = 2;
  scaleTshuapa = 2;
  scaleSunkuru = 2;
  scaleEquateur = 2;
  scaleMongala = 2;
  scaleNordUbungi = 2;
  scaleSudUbangi = 2;
  scaleBasUele = 20;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("sosMapList 1", this.sosMapList);

    for (let index = 0; index < this.sosMapList.length; index++) {
      const element = this.sosMapList[index];
      if (element.Province == '') {
        
      } else {
        
      }
    }
  } 
}
