import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { loadPokemons } from 'src/app/store/actions/my-configuration.action';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  message: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.message = params['message'];
      if (params['nextComponent'] === 'selection') {
        this.store.dispatch(loadPokemons());
      }

      timer(500).subscribe({
        next: () => this.router.navigate([params['nextComponent']]),
      });
    });
  }
}
