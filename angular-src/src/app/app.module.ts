import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule , Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Component } from '@angular/core/src/metadata/directives';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './components/shared/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { PostService } from './components/shared/post.service';

const appRoutes : Routes =[
  {path : '' , component: DashboardComponent},
  {path : 'dashboard' , component: DashboardComponent},
  {path : 'login' , component:LoginComponent},
  {path : 'register' , component:RegisterComponent},
  {path : 'profile' , component:ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [ AuthService , PostService  ],
  entryComponents: [PostComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
