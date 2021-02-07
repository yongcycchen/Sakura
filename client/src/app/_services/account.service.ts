import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  
  constructor(private http:HttpClient) { }
  login(model:any){
    return this.http.post(this.baseUrl+'account/login',model).pipe(
      map((user:any)=>{
        if (user)
        {
          this.serCurrentUser(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user:any)=>{
        if (user){
          this.serCurrentUser(user);
        }
        return user;
      })
    )
  }

  serCurrentUser(user:User){
    user.roles = [];
    let roles : string | string[]= this.getDecodedToken(user.token);
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  getDecodedToken(token:string){
    let role : string | string[] = jwtDecode<Role>(token).role;
    return role;
  }
}