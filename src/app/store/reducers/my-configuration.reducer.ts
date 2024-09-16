import { createReducer, on, props } from '@ngrx/store';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import {
  loadPokemonsSuccess,
  loadProfileSuccess,
} from '../actions/my-configuration.action';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';

export interface InitialState {
  profile: Profile;
  pokemons: Pokemon[];
}

export const initialState: InitialState = {
  profile: {
    name: '',
    hobbie: '',
    birthday: '',
    document: '',
    image: '',
  },
  pokemons: [],
};

export const myConfigurationReducer = createReducer(
  initialState,
  on(loadProfileSuccess, (state, actions) => {
    return {
      ...state,
      profile: actions.profile,
    };
  }),
  on(loadPokemonsSuccess, (state, actions) => {
    return {
      ...state,
      pokemons: actions.pokemons,
    };
  })
);
