import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService:PokemonService) { }

  sum:number=0;
  pokemons:Pokemon[]=[];

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.sum).subscribe(res=>{this.pokemons=res.data});
  }


  onScroll(){
    if( this.sum < 151){
      this.sum+=10;
      this.pokemonService.getPokemons(this.sum).subscribe(res => {this.pokemons = this.pokemons.concat(res.data);});
    }
  }

}
