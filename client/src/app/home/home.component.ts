import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor(public accountService:AccountService, private router:Router) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user=>{
      if (user){
        this.router.navigateByUrl('/members');
      }
    })
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event:boolean){    
    this.registerMode = event;
  }
}