import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  users: any;
  constructor(private accountService:AccountService){

  }
  ngOnInit() {
    // this.getUsers();
    this.serCurrentUser();
  }

  serCurrentUser(){
    //JSON.parse(localStorage.getItem('user')||string);
    const user:User = JSON.parse(localStorage.getItem('user')||'{}');
    this.accountService.serCurrentUser(user);
  }

  // getUsers() {
  //   this.http.get('https://localhost:5001/api/users').subscribe(response =>{
  //     this.users = response;
  //   },error=>{
  //     console.log(error);
  //   })
  // }
}
