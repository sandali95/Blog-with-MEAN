import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService) { }

  valid:boolean;
  user:any;

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(
      data=>{
        if(data.message=='Authorized'){
          this.valid=true;
          this.user = data.authData;
          
        }
      },
      err=>{console.log(err);}
    );

  }



}
