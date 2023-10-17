import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthletesRoutingModule } from './athletes-routing.module';
import { AthletesComponent } from './athletes.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [AthletesComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    AthletesRoutingModule
  ]
})
export class AthletesModule { }
