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

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './config/firbase.config';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './auth/auth.component';
import { ModelStorageInterface } from './services/storage/model-storage.interface';
import { ModelFbStorageService } from './services/storage/model-fb-storage.service';
// popup
import {DialogComponent} from './dialogs/choose-link-dialog/Dialog.component';
import {Tab} from "./dialogs/choose-link-dialog/tab";
import {Tabs} from "./dialogs/choose-link-dialog/tabs";
// Run {npm install ng2draggable}  add Draggable option for div’s
// import { Draggable } from '../../node_modules/ng2draggable/draggable.directive';
import {TreeViewService} from './services/tree-view.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveModelDialogComponent,
    LoadModelDialogComponent,

    AuthComponent,
    //popup Links
   DialogComponent,
    Tabs,
    Tab
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RappidModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    { provide: ModelStorageInterface, useClass: ModelFbStorageService },
    TreeViewService
  ],
  entryComponents: [
    SaveModelDialogComponent,
    LoadModelDialogComponent,

    //popup Component
    DialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
