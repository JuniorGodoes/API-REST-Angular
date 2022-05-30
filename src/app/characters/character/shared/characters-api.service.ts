import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  Public_key = '5c2c036b8e4e1cc3b24397ca6faba391';
  Hash = 'd7e1324a58b49ce25e7fcdc217531a16';
  Url_Api = `http://gateway.marvel.com/v1/public/characters?ts=1583370112&apikey=5c2c036b8e4e1cc3b24397ca6faba391&hash=d7e1324a58b49ce25e7fcdc217531a16`;

  constructor(private http: HttpClient) { }

    get () {
      return this.http.get(this.Url_Api)
    }
}
