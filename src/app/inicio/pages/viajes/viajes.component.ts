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
  
  dataSource:Viajes[] = []
  
  ngOnInit(): void {
    let status1 = this.viajes.fetchViajes(1);
    let status5 = this.viajes.fetchViajes(5);


    forkJoin([status1,status5]).subscribe(  resp => {
      this.dataSource = [...resp[0], ...resp[1]] 
    })
  }



}
