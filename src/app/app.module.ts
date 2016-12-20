import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RappidModule } from './rappid/rappid.module';
import { HeaderComponent } from './header/header.component';
import { ModelStorageService } from './services/model-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RappidModule
  ],
  providers: [ModelStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
