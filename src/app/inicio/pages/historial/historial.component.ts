import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { ViajesService } from '../../services/viajes.service';
import { Viajes } from '../../models/viajes';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, private viajes:ViajesService) { }

  openBottomSheet(): void {
    this._bottomSheet.open(FooterComponent);
  }

  historialViajes:Viajes[] = []
  cadete:Viajes[] = []

  ngOnInit(): void {
    let status4 = this.viajes.fetchViajes(4);
    let status8 = this.viajes.fetchViajes(8);
    let status9 = this.viajes.fetchViajes(9);


    forkJoin([status8, status9, status4]).subscribe(  resp => {
      this.historialViajes = [...resp[0], ...resp[1], ...resp[2]];
      for (let viaje of this.historialViajes){
      if(viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete ) {
        if (viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete.id === Number(localStorage.getItem('id'))){
          this.cadete.push(viaje)
          } 
        }
      }

    })
  
  }
}
