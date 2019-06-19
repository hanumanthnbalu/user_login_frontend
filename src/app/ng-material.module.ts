import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
<<<<<<< HEAD
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

<<<<<<< HEAD
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
=======
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
<<<<<<< HEAD
    MatDialogModule,

    MatIconModule,
    MatSidenavModule,
    MatMenuModule
=======
    MatDialogModule
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
<<<<<<< HEAD
    MatDialogModule,


    MatSidenavModule,
    MatIconModule,
    MatMenuModule
=======
    MatDialogModule
>>>>>>> dad8b77ea6d8072ac1ceb693cb6510b5bb90c274
  ],
})
export class NgMaterialModule {

}
