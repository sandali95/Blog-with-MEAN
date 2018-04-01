import { Component, OnInit ,Inject} from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PostService } from '../shared/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post={
    title:'',
    content:'',
    category:''
  };

  category=['News','Tech','Security'];
  
  constructor(public dialogRef: MatDialogRef<PostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private postService:PostService) { }

  ngOnInit() {}

  onClose(){
    this.dialogRef.close();
  }

  onPost(){
    let post={
      title:this.post.title,
      content:this.post.content,
      category:this.post.category,
      author : JSON.parse(localStorage.getItem('user')).name,
      date : new Date()
    } ;
    console.log(post);
    this.postService.addPost(post).subscribe(
      data=>{console.log(data.msg);},
      err=> {console.log(err);}
    );
    this.dialogRef.close();
  }

}
