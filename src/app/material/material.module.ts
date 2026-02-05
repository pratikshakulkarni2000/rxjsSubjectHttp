import { NgModule } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const matArr = [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
]


@NgModule({
  declarations: [],

  imports : [...matArr],
  exports : [...matArr]


  // imports: [
  //   MatButtonModule,
  //   MatIconModule,
  //   MatSnackBarModule,
  //   MatDialogModule
  // ],
  // exports : [
  //   MatButtonModule,
  //   MatIconModule,
  //   MatSnackBarModule,
  //   MatDialogModule
  // ]


})
export class MaterialModule { }

