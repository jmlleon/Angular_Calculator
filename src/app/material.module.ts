import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import {MatGridListModule} from '@angular/material/grid-list';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatListModule } from '@angular/material/list';

import { MatChipsModule} from '@angular/material/chips';

import { MatCheckboxModule } from '@angular/material/checkbox';

import{MatTreeModule} from '@angular/material/tree';

import{MatRadioModule} from '@angular/material/radio';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import { RouterModule } from '@angular/router';

import {FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ScrollingModule } from '@angular/cdk/scrolling';

import {MatMenuModule} from  '@angular/material/menu';
import {MatButtonToggleModule} from  '@angular/material/button-toggle';
import {MatSlideToggleModule} from  '@angular/material/slide-toggle';

import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [   
   
  ],
  imports: [

    RouterModule,
    CommonModule,   
    FormsModule,
    ReactiveFormsModule,    
    MatButtonModule,   
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,    
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule, 
    MatListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTreeModule,
    MatRadioModule,    
    MatSnackBarModule,
    FontAwesomeModule,
    ScrollingModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  exports:[  
    RouterModule,
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,   
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,    
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTreeModule,  
    MatRadioModule, 
    MatSnackBarModule,    
    FontAwesomeModule,   
    ScrollingModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule
   
  ]
})
export class MaterialModule { }
