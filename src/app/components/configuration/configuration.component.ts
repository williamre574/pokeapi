import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { Profile } from 'src/app/shared/interfaces/profile.interface';
import { calculateAge } from 'src/app/shared/utils/utils';
import { loadProfileSuccess } from 'src/app/store/actions/my-configuration.action';
import { selectProfile } from 'src/app/store/selectors/my-configuration.selector';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  mask = [
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    /[1-9]/,
    '-',
    /[1-9]/,
  ];
  documentLabel = 'Document';
  form!: FormGroup;
  imageSrc?: string | ArrayBuffer | null;
  options: string[] = [
    'Jugar Fútbol',
    'Jugar Basquetball',
    'Jugar Tennis',
    'Jugar Voleibol',
    'Jugar Fifa',
    'Jugar Videojuegos',
  ];
  filteredOptions!: Observable<string[]>;
  profile$ = this.store.select(selectProfile);
  regexRut: RegExp = /^\d{7,8}-\d{1}$/;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      hobbie: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    });

    this.filteredOptions = this.form.get('hobbie')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.route.queryParams.subscribe((params) => {
      if (params['edit']) {
        this.profile$.subscribe((profile) => {
          this.form.get('name')?.setValue(profile.name);
          this.form.get('hobbie')?.setValue(profile.hobbie);
          this.form.get('birthday')?.setValue(profile.birthday);
          this.form.get('document')?.setValue(profile.document);
          this.imageSrc = profile.image;
          this.isEdit = true;
        });
      }
    });
  }

  readURL(event: Event): void {
    debugger
    const auxEvent = event.target as HTMLInputElement;
    if (auxEvent.files && auxEvent.files[0]) {
      const file = auxEvent.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  continue() {
    let profile: Profile;
    profile = {
      name: this.form.get('name')?.value,
      hobbie: this.form.get('hobbie')?.value,
      birthday: this.form.get('birthday')?.value,
      document: this.form.get('document')?.value,
      image: this.imageSrc,
    };
    this.store.dispatch(loadProfileSuccess({ profile }));
    this.isEdit
      ? this.router.navigate(['loader/profile/Cargando perfil...'])
      : this.router.navigate(['loader/selection/Cargando...']);
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    let age = calculateAge(event.value!);
    if (age < 18) {
      this.form.get('document')?.setValidators([]);
      this.form.get('document')?.updateValueAndValidity();
    }
    this.documentLabel = age < 18 ? 'Carnet de Minoridad' : 'DUI';
  }
}
