import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RappidModule } from './rappid-components/rappid.module';
import { HeaderComponent } from './header/header.component';
import { ModelLocalStorageService } from './services/storage/model-local-storage.service';
import { MaterialModule } from '@angular/material';
import { SaveModelDialogComponent } from './dialogs/save-model-dialog/save-model-dialog.component';
import { LoadModelDialogComponent } from './dialogs/load-model-dialog/load-model-dialog.component';
import { ChooseLinkDialogComponent } from './dialogs/choose-link-dialog/choose-link-dialog.component';
import { OplWidgetComponent } from './opl-widget/opl-widget.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig, firebaseAuthConfig } from './config/firbase.config';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { ModelStorageInterface } from './services/storage/model-storage.interface';
import { ModelFbStorageService } from './services/storage/model-fb-storage.service';
// popup Links
import {DialogComponent} from './dialogs/choose-link-dialog/Dialog.component';
import {DialogDirective} from './dialogs/choose-link-dialog/DialogDirective.directive';
// Run {npm install ng2draggable}  add Draggable option for div’s
import { Draggable } from '../../node_modules/ng2draggable/draggable.directive';
import { OplDialogComponent } from './dialogs/opl-dialog/opl-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveModelDialogComponent,
    LoadModelDialogComponent,
    ChooseLinkDialogComponent,
    OplWidgetComponent,
    AuthComponent,
    //popup Links
    DialogComponent,
    DialogDirective,
    Draggable,
    OplDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RappidModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  providers: [
    AuthService,
    { provide: ModelStorageInterface, useClass: ModelFbStorageService },
  ],
  entryComponents: [
    SaveModelDialogComponent,
    LoadModelDialogComponent,
    ChooseLinkDialogComponent,
    //popup Component
    DialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
