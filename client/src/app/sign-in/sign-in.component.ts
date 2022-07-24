import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  singnInForm:FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  handleSignIn() {
    this.dataService.makeEndpointPostRequest('users/login',{
      user: {
        email: this.singnInForm.value.email,
        password: this.singnInForm.value.password
      }
    }).subscribe((res) => console.log(res));    
  }

}
