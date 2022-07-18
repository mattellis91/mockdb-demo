import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  makeEnpointGetRequest(url:string) {
    return this.http.get('http://localhost:3000/api/articles/feed');
  }

  makeEndpointPostRequest(url:string, payload:Record<string, unknown>) {}
}
