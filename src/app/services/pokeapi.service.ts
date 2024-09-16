import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Pokemon, Result } from '../shared/interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  constructor(private httpClient: HttpClient) {}

  url = 'https://pokeapi.co/api/v2/pokemon';

  getAllPokemos(): Observable<any> {
    return this.httpClient.get<Result>(this.url).pipe(
      mergeMap((arr) =>
        forkJoin(
          arr.results.map((item: Pokemon) =>
            this.getPokemonByNameOrId(item['name']).pipe(
              map((pokemon: Pokemon) => {
                item.name = pokemon.name;
                item.id = pokemon.id;
                item.checked = false;
                item.stats = pokemon.stats;
                item.types = pokemon.types;
                item.image =
                  pokemon['sprites']['other']['dream_world']['front_default'];
                return item;
              })
            )
          )
        )
      )
    );
  }

  getPokemonByNameOrId(NameOrID: string): Observable<any> {
    return this.httpClient.get(`${this.url}/${NameOrID}`);
  }
}
