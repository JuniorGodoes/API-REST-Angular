import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './characters/character/character.component';

const routes: Routes = [
  {
    path:'', redirectTo: '/characters', pathMatch: 'full'
  },
  {
    path:'characters', component: CharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
