import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/authentification/services/user.service';
import { PokemonDetail } from 'src/app/pokemons/models/pokemon-detail.model';
import { Pokemon } from 'src/app/pokemons/models/pokemon.model';
import { PokemonService } from 'src/app/pokemons/services/pokemon.service';
import { TeamService } from '../services/team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private pokemonService:PokemonService, private teamService:TeamService,private userService:UserService, private router:Router) { }

  sum:number=0;
  pokemons:Pokemon[]=[];
  tabPokemons:PokemonDetail[]=[];

  ngOnInit( ): void {
    this.pokemonService.getPokemons(this.sum).subscribe(res=>{this.pokemons=res.data});
    this.teamService.getMyTeam().subscribe(res=>{this.tabPokemons=res});
  }

  onScroll():void{
    if( this.sum < 151){
      this.sum+=10;
      this.pokemonService.getPokemons(this.sum).subscribe(res => {this.pokemons = this.pokemons.concat(res.data);});
    }
  }

  searchPok(terme:string):void{
   if(terme == '') {
      this.pokemonService.getPokemons(this.sum).subscribe(res=>{this.pokemons=res.data});
    }else {
      this.pokemonService.searchPokemons(151,terme).subscribe(res=>{this.pokemons=res.data});
    }
  }

  addPokemonToTeam(id:number):void{
    // parcourir liste pokemon detail
    // recuperer id des pokemons
    // mettre dans un tab de number
    // add id en param
    // appelle service ou j'update la team
    // passe en param le tab contenant le pokemon que je viens de cliquer + le tab poekmons de ma team
    var tabNumber:number[]=[];
    var exist:Boolean=false;
    this.tabPokemons.forEach(element => {
      if(element.id!=id)
        tabNumber.push(element.id);
      else
        exist=false;
    });
    if(tabNumber.length < 6 && !exist){
      tabNumber.push(id);
      this.teamService.updateMyTeam(tabNumber).subscribe(res=>{
        this.teamService.getMyTeam().subscribe(ress=>{
          this.tabPokemons=ress;
        });
      });
   }
  }

  deletePokemonFromTeam(id:number):void{
    var tabNumber:number[]=[];
    // recuperer id de la team
    this.tabPokemons.forEach(element => {
      if(element.id!=id){
      tabNumber.push(element.id);
      }
    });
    this.teamService.updateMyTeam(tabNumber).subscribe(res=>{
      this.teamService.getMyTeam().subscribe(ress=>{
        this.tabPokemons=ress;
      });
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    if (this.userService.ifIsLogged()) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
}


}
