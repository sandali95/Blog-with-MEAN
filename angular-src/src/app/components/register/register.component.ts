import { Component, OnInit } from '@angular/core';
import { Form ,FormBuilder ,FormGroup , Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm : FormGroup;
  constructor(private fb : FormBuilder , private authService:AuthService) {
    this.regForm = fb.group({
      name:[null,Validators.required],
      username : [null , Validators.required],
      email : [null , Validators.compose([Validators.required , Validators.email]) ],
      password : [null , Validators.required]
    });

   }

  ngOnInit() {
  }

  onRegister(regForm){
    console.log(regForm.name);

    const user ={
      name:regForm.name,
      username:regForm.username,
      email : regForm.email,
      password : regForm.password
    };

    this.authService.registerUser(user).subscribe({
      data=>{console.log(data);},
      err=>{console.log(err);}
    });
  }
  

}
