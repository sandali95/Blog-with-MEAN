import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Token{
  succes:boolean;
  msg:String;
}

export interface Blog{
  posts:[{
    _id:String,
    title:String,
    content:String,
    category:String,
    author:String,
    date:String,
    __v :number
  }];
}

@Injectable()
export class PostService {

  constructor(private http:HttpClient) { }

  //Add new Post to the Databse
  addPost(post):Observable<Token>{
    let headers = new HttpHeaders();
    headers =headers.set('content-type','application/json');
    return this.http.post<Token>('http://localhost:3000/posts/add',post,{headers:headers});
  }

  //Get all Posts
  getPosts(){
    let headers = new HttpHeaders();
    headers =headers.set('content-type','application/json');
    return this.http.get('http://localhost:3000/posts/blog',{headers:headers});
  }



}
