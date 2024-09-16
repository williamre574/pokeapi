import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import { calculateAge } from 'src/app/shared/utils/utils';
import { loadPokemonsSuccess } from 'src/app/store/actions/my-configuration.action';
import {
  selectPokemons,
  selectProfile,
} from 'src/app/store/selectors/my-configuration.selector';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  profile!: Profile;
  profile$ = this.store.select(selectProfile);
  pokemons$ = this.store.select(selectPokemons);
  pokemons!: Pokemon[];
  ageCalculated?: number;
  isEdit = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.profile$.subscribe({
      next: (profile) => {
        this.profile = profile;
        this.ageCalculated = calculateAge(new Date(profile.birthday));
      },
    });

    this.pokemons$.subscribe({
      next: (pokemons) => (this.pokemons = pokemons),
    });

    this.route.queryParams.subscribe((params) => {
      if (params['edit']) {
        this.isEdit = true;
      }
    });
  }

  addToSelected(item: Pokemon) {
    let pokemonsArrayAuxiliar: Pokemon[] = [];

    this.pokemons.forEach((p) => {
      if (p.id === item.id) {
        let pokemon: Pokemon = {
          ...p,
          checked: !p.checked,
        };
        pokemonsArrayAuxiliar.push(pokemon);
      } else pokemonsArrayAuxiliar.push(p);
    });

    this.store.dispatch(
      loadPokemonsSuccess({ pokemons: pokemonsArrayAuxiliar })
    );
  }

  isSelected(item: any): boolean {
    return this.pokemons.filter((x) => x['id'] == item['id'])[0]['checked'];
  }

  disableList(): boolean {
    return this.pokemons.filter((x) => x.checked).length === 3;
  }

  continue() {
    this.router.navigate(['loader/profile/Cargando Perfil...']);
  }
}
