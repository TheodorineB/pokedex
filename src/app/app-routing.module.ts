import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAuthentComponent } from './authentification/form-authent/form-authent.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { TeamComponent } from './team/team/team.component';

const routes: Routes = [
  { path : 'pokemon', component: PokedexComponent },
  { path : 'pokemon/:id', component: PokedexComponent },
  { path: '', redirectTo: '/team', pathMatch: 'full' },
  { path: 'team', component: TeamComponent,canActivate:[TeamComponent]},
  { path: 'login', component: FormAuthentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
