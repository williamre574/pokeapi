import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule, TextMaskModule],
  exports: [MaterialModule, HeaderComponent, TextMaskModule],
})
export class SharedModule {}
