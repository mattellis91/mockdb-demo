import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: FeedComponent
      },
      { 
        path: "login",
        component: SignInComponent
      },
      { 
        path: "register",
        component: SignUpComponent
      },
      {
        path: "settings",
        component: SettingsComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "editor",
        component: EditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
