import { Component, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  isDevMode = isDevMode();
  homelink:string="";
  constructor(public accountService: AccountService, private router: Router, 
    private toastr:ToastrService,public presence:PresenceService) {}
  ngOnInit(): void {}
  login(){
    this.accountService.login(this.model).subscribe(response=>{
      //console.log(response);
      // this.router.resetConfig();
      this.router.navigateByUrl('/members');
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //this.router.resetConfig();
    // this.accountService.currentUser$.subscribe(user=>{
    //   console.log(user);
    // })
    // console.log()
  }
}
