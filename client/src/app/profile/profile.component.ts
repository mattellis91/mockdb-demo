import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Article } from '../types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService:DataService) { }

  articles:Article[] = []
  tags:string[] = []

  ngOnInit(): void {
    this.dataService.makeEnpointGetRequest('articles/feed').subscribe(
      (res:any) => {
        this.articles = res.articles
      }
    )

    this.dataService.makeEnpointGetRequest('tags').subscribe(
      (res:any) => {
        this.tags = res.tags.slice(0, 20)
      }
    )
  }

}
