import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SelectionComponent } from './components/selection/selection.component';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'loader/:nextComponent/:message', component: LoaderComponent },
  { path: 'loader', component: LoaderComponent },
  { path: 'selection', component: SelectionComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
