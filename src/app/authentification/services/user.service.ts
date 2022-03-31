import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { refresh_token } from '../models/refresh-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  Url="http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";
  token?:refresh_token=undefined;

  login(username:string,password:string){
    return this.getRefreshToken(username,password);
  }

  getAccessToken(refresh_token:string){
    let body = {
      "refresh_token" : refresh_token
    }
    return this.http.post<refresh_token>(this.Url+"/auth/refresh",body);
  }

  getWithExpiry(key:any) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr);

    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {


      // If the item is expired, delete the item from storage
      // and return null
      if (now.getTime() > item.expiry_day) {
        localStorage.removeItem("token");
      }else{
        this.getAccessToken(item.value.refresh_token)?.subscribe(res=>{this.setWithExpiry("token",res,res.expires_in)})
      }
    }
    return item.value
  }

  setWithExpiry(key:string, value:any, ttl:number) {
    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire

    const item = {
      value: value,
      expiry: now.getTime() +1000*3600,
      expiry_day: now.getTime() + 3600*1000*24
    }

    localStorage.setItem(key, JSON.stringify(item))
  }

  getRefreshToken(email:string,pass:string){
    let body = {
      "email" : email,
      "password" : pass
    }
    return this.http.post<refresh_token>(this.Url+"/auth/login",body);
  }

  ifIsLogged(){
    return this.getWithExpiry("token") != null
  }

  getToken(){
    return this.getWithExpiry("token");
  }

  logout() {
    localStorage.removeItem("token");
  }
}
