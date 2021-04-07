import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey= 'AIzaSyA_ZePx5E38RIWXJlCmXQUEkaQjgFzq7XE';
  userToken:string;

  //crear nuevos usuarios
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


 //login
 //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  
 
 constructor(private htpp:HttpClient) { 
   this.leerToken();
 }


logOut(){
  localStorage.removeItem('token');
}

logIn(usuario:UsuarioModel){
  const authData ={
    email: usuario.email,
    password: usuario.password,
    returnSecureToken: true,
  };
  return this.htpp.post(
    `${this.url}signInWithPassword?key=${this.apiKey}`,
    authData
  ).pipe(
    map(resp =>{
      this.guardarToken(resp['idToken']);
      return resp;
    })
  )
  ;

}

nuevoUsuario(usuario:UsuarioModel){
  const authData ={
    email: usuario.email,
    password: usuario.password,
    returnSecureToken: true,
  };
  return this.htpp.post(
    `${this.url}signUp?key=${this.apiKey}`,
    authData
  ).pipe(
    map(resp =>{
      this.guardarToken(resp['idToken']);
      return resp;
    })
  );
}


private guardarToken(idToken:string){
  this.userToken=idToken;
  localStorage.setItem('token',idToken);
}

leerToken(){
  if(localStorage.getItem('item')){
    this.userToken = localStorage.getItem('token');
  }else{
    this.userToken='';
  }
  return this.userToken;
}

estaAutenticado(): boolean{
  return this.userToken.length > 2 ;
}

}
