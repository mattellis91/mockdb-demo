import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Article } from '../types';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

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
