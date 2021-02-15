import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { LikeService } from '../_services/like.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>=[]as Partial<Member[]>;
  // members: Member[]=[];
  predicate = 'liked';
  pageNumber = 1;
  pageSie = 5;
  pagination: Pagination={}as Pagination;
  constructor(private likeService:LikeService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.likeService.getLikes(this.predicate,this.pageNumber,this.pageSie).subscribe(response =>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
