import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { Profile } from 'src/app/shared/interfaces/profile.interface';

export const loadProfileSuccess = createAction(
  '[Configuration Component] Load Profile Successfully',
  props<{ profile: Profile }>()
);

export const loadPokemons = createAction('[Loader Component] Load pokemonms');

export const loadPokemonsSuccess = createAction(
  '[Loader Component] Load pokemonms Successfully',
  props<{ pokemons: Pokemon[] }>()
);
