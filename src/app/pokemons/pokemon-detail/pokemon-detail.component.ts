import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from '../models/pokemon-detail.model';
import { PokemonService } from '../services/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  id=Number(this.route.snapshot.paramMap.get('id'));

  pokemon?:PokemonDetail;


  constructor(private pokemonService:PokemonService, private route:ActivatedRoute, private location:Location) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonById(this.id).subscribe(res=>{this.pokemon=res})
  }

  goBack(): void{
    this.location.back();
  }

}
