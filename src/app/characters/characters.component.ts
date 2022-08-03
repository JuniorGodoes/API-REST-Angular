import { CharactersApiService } from './character/shared/characters-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';


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
  values = '';
  data: any = []
  

  constructor(private CharacterSvc: CharactersApiService) { }
  

  ngOnInit() {
    this.CharacterSvc.get().pipe(map((data: any) => data.data.results
    )).subscribe(dados => {
      this.values = dados
      for(let i=0; i < dados.length; i++){
        this.data.push(dados[i])
      }
      this.update(this.data)
    })
  }

  onKey(event: any){ 
    this.allCharacters = []
    this.data = []
    this.values = event.target.value;
    this.page = 1

    this.CharacterSvc.get().pipe(map((data: any) => data.data.results
    )).subscribe(dados => {

      for(let i=0; i < dados.length; i++){
        let nome = dados[i].name
        if(nome.indexOf(this.values) >= 0){
          this.data.push(dados[i])
        }
      }
      this.update(this.data)
    })
  }

  update(array: any){
    this.allCharacters = []
    
    for(let i=0; i < array.length ; i++){
      if(i < this.page * 10 && i >= (this.page - 1) * 10){
        this.allCharacters.push(array[i])
      }
    }
    console.log(this.allCharacters)
  }

  nextpage(){
    this.page++ 
    this.update(this.data)
  }

  lastpage(){
    this.page--
    this.update(this.data)
  }
}