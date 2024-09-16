import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import { calculateAge } from 'src/app/shared/utils/utils';
import {
  selectPokemons,
  selectProfile,
} from 'src/app/store/selectors/my-configuration.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  profile$ = this.store.select(selectProfile);
  pokemons$ = this.store.select(selectPokemons);
  profile!: Profile;
  pokemons!: Pokemon[];
  myPokemons!: Pokemon[];
  ageCalculated?: number;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.profile$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.ageCalculated = calculateAge(new Date(profile.birthday));
      },
    });

    this.pokemons$.pipe(takeUntil(this.destroyed$)).subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
        this.myPokemons = this.pokemons.filter((p) => p.checked);
        this.myPokemons[0].types[0].type.name;
      },
    });
  }

  calculatePercent(value: number, maxValue: number): number {
    return (value * 100) / maxValue;
  }

  edit = (option: any) => {
    switch (option) {
      case 'profile':
        this.router.navigate([''], {
          queryParams: { edit: true },
        });
        break;
      case 'selection':
        this.router.navigate(['selection'], {
          queryParams: { edit: true },
        });
        break;
      default:
        console.log('Invalid option');
    }
  };

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
