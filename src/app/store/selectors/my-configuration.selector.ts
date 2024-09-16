import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InitialState } from '../reducers/my-configuration.reducer';

export const selectStorage =
  createFeatureSelector<InitialState>('configuration');

export const selectProfile = createSelector(
  selectStorage,
  (state) => state.profile
);

export const selectPokemons = createSelector(
  selectStorage,
  (state) => state.pokemons
);
