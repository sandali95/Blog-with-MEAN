import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PostComponent } from '../post/post.component';
import { PostService } from '../shared/post.service';
import { AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog:MatDialog , private postService :PostService , private authService:AuthService) { }
  posts :any;
  ngOnInit() {
    this.postService.getPosts().subscribe(
      data=>{ this.posts = data; },
      err=>{ console.log(err); }
    );
    
  }

  openDialog(){
    let dialogRef = this.dialog.open(PostComponent,{
      width: '600px',
      height: '600px',
      data:"Post"
    });
  }



}
