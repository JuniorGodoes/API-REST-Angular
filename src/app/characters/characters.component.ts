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
  personagens: any = []
  page: number = 1;
  maxpage:number = 0
  queryField = new FormControl();
  results: any = 0;
  values = '';
  data: any = []
  

  constructor(private CharacterSvc: CharactersApiService) { }
  

  ngOnInit() {
    this.CharacterSvc.get().pipe(map((data: any) => data.data.results
    )).subscribe(dados => {
      this.personagens = dados
      this.data = this.personagens

      this.maxpage = this.personagens.length/10
      this.update(this.personagens)
    })
  }


  onKey(event: any){ 
    this.allCharacters = []
    this.data = []
    this.values = event.target.value;
    this.page = 1

    this.personagens.forEach((element:any) => {
      let nome = element.name

      if(nome.indexOf(this.values) >= 0){
        this.data.push(element)
      }

      this.maxpage = this.data.length/10
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