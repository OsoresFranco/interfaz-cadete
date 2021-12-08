import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/user';
import { LoginService } from './services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginform = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  }) 

  constructor(private loginservice:LoginService, private route:Router) { }

  user:User = {
    email: '',
    password: '',
    rol:{ id:0
    }
  }

  login(){
    this.user = this.loginform.value
    console.log(this.user.email)
    this.loginservice.login (String(this.user.email), String(this.user.password)).subscribe(  resp => {
      
    if(resp.rol.id === 2){
      Swal.fire(
        `Bienvenido ${resp.fullName}`,
        '',
        'success')
      this.route.navigate(['/inicio'])
    } else {
      Swal.fire(
        'Error al intentar ingresar',
        'Usuario o contraseña inválido',
        'error')
    }

    })
  }

}
