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
  followingAuthor = false;

  ngOnInit(): void {

    const slug = this.router.url.split('/')[2];

    console.log(this.userService.user)

    this.dataService.makeEnpointGetRequest(`articles/${slug}`).subscribe(
      (res:any) => {
        this.article = res.article;
        if(this.article?.author.followers) {
          const foundFollower = this.article.author.followers.find((follower) => follower === this.userService.user?._id);
          console.log(foundFollower);
          console.log(this.userService.user)
          this.followingAuthor = this.article.author.followers.find((follower) => follower === this.userService.user?._id) ? true : false
        }
      }
    );
  }

  handleEdit() {
    this.router.navigate([`/editor/${this.article?.slug}`]);
  }

  checkUserIsAuthor() {
    return this.userService.user && this.article?.author && this.userService.user?._id === this.article.author?._id
  }

  handleDelete() {
    this.dataService.makeEndpointDeleteRequest(`articles/${this.article?.slug}`).subscribe(
      (res:any) => {
        console.log("sdf")
        this.router.navigate(['/']);
      }
    );
  }

  followAuthor() {
    this.dataService.makeEndpointPostRequest(`profiles/${this.article?.author._id}/follow`, {
      followerId: this.userService.user?._id
    }).subscribe()
    this.article?.author.followers?.push(this.userService.user?._id as string);
    this.followingAuthor = true;
  }

  unfollowAuthor() {
    this.dataService.makeEndpointPostRequest(`profiles/${this.article?.author._id}/unfollow`, {
      followerId: this.userService.user?._id
    }).subscribe()
    const index = this.article?.author.followers?.findIndex((follower) => follower === this.userService.user?._id as string);
    if(index !== undefined && index >= 0) {
      this.article?.author.followers?.splice(index, 1);
    }
    this.followingAuthor = false;
  }

  getFollowers() {
    return this.article?.author?.followers ? this.article.author.followers.length : 0; 
  }

}
