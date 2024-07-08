import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Article } from '../types';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';


interface Tag {
  name: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnInit {

  constructor(private dataService:DataService, public userService:UserService, private router: Router) { }

  article:Article | undefined = undefined;

  ngOnInit(): void {

    const slug = this.router.url.split('/')[2];

    this.dataService.makeEnpointGetRequest(`articles/${slug}`).subscribe(
      (res:any) => {
        this.article = res.article;
        console.log(this.article);
      }
    );
  }

  handleEdit() {
    this.router.navigate([`/editor/${this.article?.slug}`]);
  }

}
