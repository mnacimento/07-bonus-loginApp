import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel
  recordarme=false;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.usuario= new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme=true;
    }
  }


  login(form:NgForm){
    if(form.invalid){return;};

    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Espere por favor...',
      confirmButtonText:'OK'
    });

    this.auth.logIn(this.usuario).subscribe(resp =>{
      console.log(resp);

      if(this.recordarme){
        localStorage.setItem('email',this.usuario.email);
      }
    },(err) =>{
      console.log(err.error.error.message);
    });
  }
}
