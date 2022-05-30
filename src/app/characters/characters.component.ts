import { Component, OnInit } from '@angular/core';
import { CharactersApiService } from './character/shared/characters-api.service';
import { map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit {

  allCharacters: any = [];
  personagem: any;
  page: number = 1;
  queryField = new FormControl();
  results: any = 0;
  

  constructor(private CharacterSvc: CharactersApiService) { }
  

  ngOnInit() {
    this.atualizar()

    this.CharacterSvc.get().pipe(map((data: any) => data.data.results
    )).subscribe(dados => console.log(dados))

  }

  atualizar(){
    this.allCharacters = [];
    for(let i=0; i < this.page * 10 ; i++){
      if(i >= (this.page * 10) - 10){
        this.CharacterSvc.get().pipe(map((data: any) => data.data.results[i]
        )).subscribe(dados => this.allCharacters.push(dados))
      }
    }
  }

  nextpage(){
    this.page++ 
    this.atualizar()
  }

  lastpage(){
    this.page--
    this.atualizar()
  }
}