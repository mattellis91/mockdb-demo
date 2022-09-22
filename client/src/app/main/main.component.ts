import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public userService:UserService, private dataService:DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.dataService.makeEnpointGetRequest('users/').subscribe((res:any) => this.userService.setUserProperties(res.user));
    }
  }

}
