import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { FooterComponent } from '../../components/footer/footer.component';
import { ViajesService } from '../../services/viajes.service';
import { Viajes } from '../../models/viajes';
import { forkJoin } from 'rxjs';
import { TomarViajeService } from '../../services/tomar-viaje.service';
import Swal from 'sweetalert2';
import { RenunciarViajeService } from '../../services/renunciar-viaje.service';




@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss']
})


export class ViajesComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, private viajes:ViajesService, private tomaViaje:TomarViajeService, private renunciaViaje:RenunciarViajeService) {}

  openBottomSheet(): void {
    this._bottomSheet.open(FooterComponent);
  }
  
  viajesDisponibles:Viajes[] = []
  viajesEnCurso:Viajes[] = []
  cadete:Viajes[] = []

  // Opcion Tomar viaje de CADETE
  // La función envia solo 2 parametros que toma directamente del renderizado de las cards, el service se encarga de poner los datos donde corresponde

    takeViaje(travel:number, statusTravel:number){
      if(this.cadete.length >= 4){
        Swal.fire(
          'Hubo un error',
          'No puedes tomar mas de 4 Viajes al mismo tiempo',
          'error'
        )
      } else
      {
      this.tomaViaje.postViaje(travel,statusTravel).subscribe(resp=>{
        Swal.fire(
          'Excelente, el pedido es tuyo!',
          'No olvide usar mascarilla y desinfectar tus manos',
          'success'
        );
        this.ngOnInit();
      })
      }
    }

// Opcion Renunciar Viaje

    deleteViaje(travel:number, statusTravel:number){
        Swal.fire({
          title: 'Deseas renunciar a este viaje?',
          text: "Una vez renunciado no podrás deshacer esta acción.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, renunciar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.renunciaViaje.deleteViaje(travel,statusTravel).subscribe(resp=>{
              Swal.fire(
                'Has renunciado a este viaje!',
                'Visita viajes disponibles para obtener uno nuevo',
                'success'
              );
              this.ngOnInit();
            })
          }
        })
    }


// Opcion Equipo Retirado (pick Viaje)

    pickViaje(travel:number, statusTravel:number){
    Swal.fire({
      title: 'Confirmar el Retiro del Equipo',
      text: "Una vez confirmado no podrás renunciar al mismo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tomaViaje.postViaje(travel,statusTravel).subscribe(resp=>{
          Swal.fire(
            'Has confirmado el retiro!',
            'Conduce con cuidado',
            'success'
          );
          this.ngOnInit();
        })
      }
    })
  }

// Opcion confirmar entrega (Finish Viaje)
    finishViaje(travel:number, statusTravel:number){
      Swal.fire({
        title: 'Has entregado el equipo a su destino?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tomaViaje.postViaje(travel,statusTravel).subscribe(resp=>{
            Swal.fire(
              'Excelente trabajo!',
              'Pronto podrás ver este viaje en tu historial',
              'success'
            );
            this.ngOnInit();
          })
        }
      })
    }

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
      this.cadete = [];
      this.viajesEnCurso = [...resp[0], ...resp[1],...resp[2],...resp[3]];
      for (let viaje of this.viajesEnCurso){
      if(viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete ) {
        if ((viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].cadete.id === Number(localStorage. getItem('id'))) && (viaje.travelEquipmentDTOs[viaje.travelEquipmentDTOs.length-1].statusTravel != 10)) {
          this.cadete.push(viaje)
          } 
        }
      }

    })
  }
}
