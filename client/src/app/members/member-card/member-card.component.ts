import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member:Member={}as Member;
  liked:boolean=false;

  constructor(private memberService: MembersService, 
    private toastr:ToastrService, public presence:PresenceService,
    private confirmService:ConfirmService) { }

  ngOnInit(): void {
    this.getLike();
  }

  addLike(member:Member){
    if (this.liked===false){
      this.confirmService.confirm("Confirmation","Like "+member.username+"?").then(result=>{
        if (result){
          this.memberService.addLike(member.username).subscribe(()=>{
            this.toastr.success('You have liked '+ member.knownAs);
          });
          this.liked = true;
        }
      })
    }
  }

  deleteLike(member:Member){
    if (this.liked){
      this.confirmService.confirm("Confirmation","Unlike "+member.username+"?").then(result=>{
        if (result){
          this.memberService.deleteLike(member.username).subscribe(()=>{
            this.toastr.success('You have unliked '+ member.knownAs);
          });
          this.liked = false;
        }
      })
    }
  }

  getLike(){
    this.memberService.getLike(this.member.username).subscribe(result=>{
      this.liked = result;
    })
  }

}
