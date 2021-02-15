import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { LikeService } from 'src/app/_services/like.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member:Member={}as Member;
  liked:boolean = false;
  constructor(public likeService: LikeService,
    private toastr:ToastrService, public presence:PresenceService,
    private confirmService:ConfirmService) { }

  ngOnInit(): void {
  }
  
  addLike(member:Member){
    this.confirmService.confirm("Confirmation","Like "+member.username+"?").then(result=>{
      if (result){
        this.likeService.addLike(member.username).subscribe(()=>{
          this.toastr.success('You have liked '+ member.knownAs);
          this.member.likedUser = true;
        })
      }
    })
  }

  deleteLike(member:Member){
    this.confirmService.confirm("Confirmation","Unlike "+member.username+"?").then(result=>{
      if (result){
        this.likeService.deleteLike(member.username).subscribe(()=>{
          this.toastr.success('You have unliked '+ member.knownAs);
          this.member.likedUser = false;
        });
      }
    })
  }

}
