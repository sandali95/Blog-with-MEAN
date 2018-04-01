import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router , private authService:AuthService , public snackBar: MatSnackBar) { }
  isLogged:boolean
  ngOnInit() {
    
  }

  onLogin(){
    this.router.navigate(['/login']);
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

  onDashboard(){
    this.router.navigate(['/dashboard']);
  }

  onProfile(){
    this.router.navigate(['/profile']);
  }

  onLogout(){
    this.authService.logout();
    this.snackBar.open('Logged Out!');
    this.router.navigate(['/dashboard']);
  
  }
}
