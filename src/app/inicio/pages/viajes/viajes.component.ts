import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { FooterComponent } from '../../components/footer/footer.component';
import { ViajesService } from '../../services/viajes.service';
import { Viajes } from '../../models/viajes';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss']
})


export class ViajesComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, private viajes:ViajesService) {}

  openBottomSheet(): void {
    this._bottomSheet.open(FooterComponent);
  }
  
  viajesDisponibles:Viajes[] = []
  viajesEnCurso:Viajes[] = []
  cadete:Viajes[] = []
  
  ngOnInit(): void {

// Viajes Disponibles
    let status1 = this.viajes.fetchViajes(1);
    let status5 = this.viajes.fetchViajes(5);

//Viajes en Curso
    let status2 = this.viajes.fetchViajes(2);
    let status3 = this.viajes.fetchViajes(3);
    let status6 = this.viajes.fetchViajes(6);
    let status7 = this.viajes.fetchViajes(7);


// Viajes Disponibles
    forkJoin([status1,status5]).subscribe(  resp => {
      this.viajesDisponibles = [...resp[0], ...resp[1]] 
    })


// Viajes En Curso
    forkJoin([status2, status3, status6, status7]).subscribe(  resp => {
      this.viajesEnCurso = [...resp[0], ...resp[1],...resp[2],...resp[3]];
      for (let viaje of this.viajesEnCurso){
      if(viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete ) {
        if ((viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete.id === Number(localStorage.getItem('id'))) && (viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].statusTravel != 10)){
          this.cadete.push(viaje)
          } 
        }
      }

    })

  }



}
