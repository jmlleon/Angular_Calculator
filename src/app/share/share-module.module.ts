import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleBarComponent } from '../bar/title-bar/title-bar.component';
import { DialogComponent } from './dialog/dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { OperationBarComponent } from '../bar/operation-bar/operation-bar.component';
import { MaterialModule } from '../material.module';
import { CustomValidationDirective } from './validation/custom-validation.directive';


@NgModule({
  declarations: [
    TitleBarComponent,
    DialogComponent,
    SnackBarComponent,
    OperationBarComponent,
    CustomValidationDirective,
   
   
   

  ],
  imports: [
    CommonModule,
    MaterialModule        
  ],

  exports:[TitleBarComponent, DialogComponent, SnackBarComponent, OperationBarComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],  
  entryComponents:[DialogComponent]
})
export class ShareModule { }
