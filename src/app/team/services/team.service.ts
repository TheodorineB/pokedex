import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/authentification/services/user.service';
import { PokemonDetail } from 'src/app/pokemons/models/pokemon-detail.model';
import { PokemonService } from 'src/app/pokemons/services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private Httpclient:HttpClient, private pokemonService:PokemonService, private userService:UserService) { }

  url="http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";

  getMyTeam(){
    let headers = new HttpHeaders();
    const pokemons:Observable<PokemonDetail>[]=[];
    let token=this.userService.getToken();

    headers = headers.set('Authorization', 'Bearer '+token.access_token);
    return this.Httpclient.get<number[]>(this.url+"/trainers/me/team",{headers: headers}).pipe(
      // modifie resultat
      switchMap(ids=>{
        const obsPok= ids.map(id=>this.pokemonService.getPokemonById(id));
        // remplacant par entité pokemon
        return forkJoin(obsPok);
      })
    )
  }

  updateMyTeam(body:number[]){
    let headers = new HttpHeaders();
    let token=this.userService.getToken();
    headers = headers.set('Authorization', 'Bearer '+token.access_token);
    return this.Httpclient.put(this.url+"/trainers/me/team",body,{headers: headers});
  }
}
