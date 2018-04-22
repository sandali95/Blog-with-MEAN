import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders ,HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


export interface token{
    success:String;
    token:String;
    user:{
        id:String,
        name:String,
        username:String
    }
}

export interface Authorization{
    message:String;
    authData:any;
}

@Injectable()
export class AuthService {

  constructor(private http:HttpClient) { }

  loginUser(user) : Observable<token>{
    let headers = new HttpHeaders();
    headers =headers.set('content-type','application/json');
    return this.http.post<token>('http://localhost:3000/users/authenticate',user,{headers:headers});
  }

  //add new user
  registerUser(user){
    let headers = new HttpHeaders();
    headers = headers.set('content-type','application/json');
    return this.http.post<Authorization>('http://localhost:3000/users/register',user,{headers:headers});
  }


  //store the user token in the local storage
  storeUser(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));

  }

  //authenticate access to the profile
  getProfile() : Observable<Authorization>{
    let headers = new HttpHeaders();
    let authToken =this.getToken();

    headers =headers.set('content-type','application/json');
    headers =headers.set('authorization',authToken);
  
    //post request to the backend
    return this.http.get<Authorization>('http://localhost:3000/users/profile',{headers:headers});
  }

  //return the current auth token in the storage
  getToken(){
    return localStorage.getItem('id_token');
  }

  isLoggedIn(){
    if(this.getToken() == null){
      return false;
    }else{
      return true;
    }
  }
  //logout
  logout(){
    localStorage.clear();
  }
}
