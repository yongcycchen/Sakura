import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getLikes(predicate:string, pageNumber:number, pageSize:number){
    //if (pageNumber!==undefined && pageSize!=undefined){
      let params = getPaginationHeaders(pageNumber,pageSize);
      params = params.append('predicate',predicate);
      return getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
    //}
    // else {
    //   let params = new HttpParams();
    //   params.append('predicate','');
    //   return this.http.get(this.baseUrl + 'likes');
    // }
  }

  addLike(username:string):any{
    // this.likeCache.set(username,true);
    return this.http.post(this.baseUrl+'likes/'+username,{}).pipe();
    // this.getLike(username).subscribe(liked=>{
    //   if (liked === false){
    //     this.likeCache.set(username,of(true));
    //     return this.http.post(this.baseUrl+'likes/'+username,{}).pipe();
    //   }
    //   return of(false);
    // });
  }

  deleteLike(username:string):any{
    // this.likeCache.set(username,false);
    return this.http.delete(this.baseUrl+'likes/'+username,{}).pipe();
    // return this.getLike(username).subscribe(liked=>{
    //   if (liked){
    //       this.likeCache.set(username,of(false));
    //       return this.http.delete(this.baseUrl+'likes/'+username,{}).pipe();
    //   }
    //   return of(false);
    // });
  }

}
