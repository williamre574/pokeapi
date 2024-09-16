import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadPokemons,
  loadPokemonsSuccess,
} from '../actions/my-configuration.action';
import { map, switchMap } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Injectable()
export class MyConfigurationEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      switchMap(() =>
        this.pokeapiService.getAllPokemos().pipe(
          map((pokemons) => {
            return loadPokemonsSuccess({ pokemons });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokeapiService: PokeapiService
  ) {}
}
