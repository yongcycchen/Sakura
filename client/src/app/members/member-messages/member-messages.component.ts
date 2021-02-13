import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm:NgForm={}as NgForm;
  @Input()messages: Message[]=[];
  @Input()username: string={}as string;
  messageContent:string="";
  loading:boolean = false;

  constructor(public messageService:MessageService,private confirmService:ConfirmService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.loading = true;
    this.messageService.sendMessage(this.username,this.messageContent).then(()=>{
      this.messageForm.reset();
    }).finally(()=>this.loading = false);
    // this.confirmService.confirm('Confirm send message','This cannot be undone').then(result=>{
    //   if (result){
        
    //   }
    // });
    // .subscribe(message=>{
    //   this.messages.push(message);
    //   this.messageForm.reset();
    // })
  }

}
