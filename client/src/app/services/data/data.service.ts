import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  apiBase = 'http://localhost:3000/api/';

  makeEnpointGetRequest(endpoint:string) {
    return this.http.get(this.apiBase + endpoint);
  }

  makeEndpointPostRequest(endpoint:string, payload:Record<string, unknown>) {
    return this.http.post(this.apiBase + endpoint, payload);
  }
}
