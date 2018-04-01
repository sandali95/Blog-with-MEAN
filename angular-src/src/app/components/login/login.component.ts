import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user ={name: '' , password :''};
  constructor(private authService :AuthService , private router:Router , public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin(){
    const user = {
      username:this.user.name,
      password:this.user.password
    };
    console.log(user);
    this.authService.loginUser(user).subscribe(
      data=>{
       if(data.success){
        this.authService.storeUser(data.token , data.user);
        this.snackBar.open('Logged In!');
        this.router.navigate(['/profile']);
        this.authService.isLoggedIn();
       }else{
        this.snackBar.open('Invalid User!');
        this.router.navigate['/login']
       }
        
      },
      err=>{        
        console.log(err);
        
      }
    );
  }

  
  
}