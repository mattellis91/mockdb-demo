import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.makeEnpointGetRequest('articles/feed').subscribe((res) => console.log(res))
  }

}
