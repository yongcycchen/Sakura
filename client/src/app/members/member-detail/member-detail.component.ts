import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { LikeService } from 'src/app/_services/like.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs',{static:true}) memberTabs: TabsetComponent={}as TabsetComponent;
  member:Member={}as Member;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] =[];
  activeTab:TabDirective={}as TabDirective;
  messages: Message[]=[];
  user:User={} as User;

  constructor(public presence:PresenceService,private route: ActivatedRoute,
      private messageService:MessageService,private accountService:AccountService,
      private router:Router,private confirmService:ConfirmService,private likeService:LikeService,
      private toastr:ToastrService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
        this.router.routeReuseStrategy.shouldReuseRoute = () =>false;
   }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member = data.member;
    })
    // this.loadMember();

    this.route.queryParams.subscribe(params =>{
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions=[
      {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns:4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
      }
    ]
    this.galleryImages = this.getImages();
    debugger;
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small:photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  // loadMember(){
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username')||"").subscribe(member=>{
  //     this.member = member;
  //     // this.galleryImages = this.getImages();
  //   });
  // }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages=>{
      this.messages = messages;
    })
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active = true;
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

  onTabActivated(data:TabDirective){
    this.activeTab = data;
    if (this.activeTab.heading ==='Messages' && this.messages.length === 0){
      //this.loadMessages();
      this.messageService.createHubConnection(this.user,this.member.username);
      this.presence.unreadCount=0;
    }
    else{
      this.messageService.stopHubConnection();
    }
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
