import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})


export class SignUpComponent implements OnInit {

  singnUpForm:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  handleSignUp() {
    this.dataService.makeEndpointPostRequest('users/',{
      user: {
        username: this.singnUpForm.value.name,
        email: this.singnUpForm.value.email,
        password: this.singnUpForm.value.password
      }
    }).subscribe((res) => console.log(res));
  }

}
