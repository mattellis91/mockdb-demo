import { Injectable } from '@angular/core';

interface User {
    token:string,
    email:string,
    username:string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

    user:User | undefined;

  constructor() { }

  setUserProperties(user:User) {
    this.user = user;
    localStorage.setItem('token',user.token);
  }

}
