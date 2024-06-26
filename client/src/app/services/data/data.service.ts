import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient, private userService:UserService) { }

  apiBase = 'http://localhost:3000/api/';

  getAuthHeaders() {
    const token = localStorage.getItem('token') || this.userService.user?.token;
    return token ? 
    {
      headers: new HttpHeaders().set('Authorization', `Token ${token}`)
    } : undefined;
  }

  makeEnpointGetRequest(endpoint:string){
    return this.http.get(this.apiBase + endpoint, this.getAuthHeaders());
  }

  makeEndpointPostRequest(endpoint:string, payload:Record<string, unknown>) {
    return this.http.post(this.apiBase + endpoint, payload, this.getAuthHeaders());
  }
}
