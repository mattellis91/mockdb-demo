import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Article } from '../types';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Tag {
  name: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})

export class EditorComponent implements OnInit {

  articleFg = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('',),
    body: new FormControl('',),
    tags: new FormControl([],)
  })

  tagsFc!: FormControl;

  constructor(private dataService:DataService, private router:Router) { }

  articles:Article[] = []
  tags:Tag[] = []
  article:Article | undefined = undefined;
  articleSlug:string = '';

  ngOnInit(): void {
    this.tagsFc = this.articleFg.get('tags') as FormControl;
    const slug = this.router.url.split('/')[2];
    if(slug) {
      this.articleSlug = slug;
      this.dataService.makeEnpointGetRequest(`articles/${slug}`).subscribe(
        (res:any) => {
          this.article = res.article;
          console.log(this.article);
          this.articleFg.patchValue({
            title: this.article?.title,
            description: this.article?.description,
            body: this.article?.body,
            tags: this.article?.tagList
          });
        }
      );
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag:Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  handlePublish() {
    const article = {
      ...this.articleFg.value,
      tagList: this.tags.map(tag => tag.name)
    }
    delete article.tags;
    console.log(article);

    if(this.articleSlug) {
      console.log(this.articleSlug)
      this.dataService.makeEndpointPutRequest(`articles/${this.articleSlug}`, {article:article}).subscribe((response) => {
        console.log(response)
        if((response as {article:Article}).article) {
          this.router.navigateByUrl(`/article/${(response as {article:Article}).article.slug}`)
        }
      })
      return
    } else {
      this.dataService.makeEndpointPostRequest('articles', {article:article}).subscribe((response) => {
        if((response as {article:Article}).article) {
          this.router.navigateByUrl(`/article/${(response as {article:Article}).article.slug}`)
        }
      })
    }
  }

}
