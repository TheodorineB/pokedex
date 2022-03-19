import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from '../models/paged-data.model';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io";
  constructor(private Httpclient:HttpClient) {

   }

   searchPokemons(offset:number,nom?:string):Observable<PagedData<Pokemon>>{
    return this.Httpclient.get<PagedData<Pokemon>>(this.url+"/pokemons?limit="+offset+"&search="+nom);
   }

   getPokemons(offset?:number):Observable<PagedData<Pokemon>>{
     return this.Httpclient.get<PagedData<Pokemon>>(this.url+"/pokemons?offset="+offset);
   }

   getPokemonById(id:number):Observable<PokemonDetail>{
    return this.Httpclient.get<PokemonDetail>(this.url+"/pokemons/"+id);
   }


}
