import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserManagementComponent } from '../admin/user-management/user-management.component';
import { Message } from '../_models/message';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection={}as HubConnection;
  private onlineUsersSrouce = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSrouce.asObservable();

  constructor(private toastr:ToastrService, private router:Router) { }

  createHubConnection(user:User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence',{
        accessTokenFactory:()=>user.token
      })
      .withAutomaticReconnect()
      .build();
      
    this.hubConnection
      .start()
      .catch(error=> console.log(error));
    this.hubConnection.on('UserIsOnline',username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames =>{
        this.onlineUsersSrouce.next([...usernames,username])
      })
      this.toastr.info(username + ' has connected');
    })

    this.hubConnection.on('UserIsOffline',username =>{
      this.onlineUsers$.pipe(take(1)).subscribe(usernames=>{
        this.onlineUsersSrouce.next([...usernames.filter(x=>x!==username)]);
      })
      this.toastr.warning(username + ' has disconnected');
    })

    this.hubConnection.on('GetOnlineUsers',(usernames:string[])=>{
      this.onlineUsersSrouce.next(usernames);
    })

    this.hubConnection.on('NewMessageReceived',({username, knownAs})=>{
      this.toastr.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(()=>this.router.navigateByUrl('/members/'+username+'?tab=3'));
    })

    this.hubConnection.on('UnreadMessages',(messages:Message[])=>{
      this.toastr.info('You got '+messages.length+' unread messages')
        .onTap
        .pipe(take(1))
        .subscribe(()=>this.router.navigateByUrl('/messages'))
    })
  }

  stopHubConnection() {
    this.hubConnection.stop().catch(error => console.log(error));
  }
}
