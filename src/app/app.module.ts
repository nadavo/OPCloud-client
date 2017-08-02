import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RappidModule } from './rappid-components/rappid.module';
import { HeaderComponent } from './header/header.component';
import { SaveModelDialogComponent } from './dialogs/save-model-dialog/save-model-dialog.component';
import { LoadModelDialogComponent } from './dialogs/load-model-dialog/load-model-dialog.component';

import { AngularFireModule } from 'angularfire2';
import { ModelStorageInterface } from './services/storage/model-storage.interface';
import { ModelFbStorageService } from './services/storage/model-fb-storage.service';
// popup
import { DialogComponent } from './dialogs/choose-link-dialog/Dialog.component';
import { Tab } from './dialogs/choose-link-dialog/tab';
import { Tabs } from './dialogs/choose-link-dialog/tabs';

import { TreeViewService } from './services/tree-view.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule } from './common/material/material.module';

import 'hammerjs';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaveModelDialogComponent,
    LoadModelDialogComponent,

    //popup Links
    DialogComponent,
    Tabs,
    Tab
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RappidModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseCredentials),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ModelStorageInterface, useClass: ModelFbStorageService },
    TreeViewService,
    UserService
  ],
  entryComponents: [
    SaveModelDialogComponent,
    LoadModelDialogComponent,

    //popup Component
    DialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
