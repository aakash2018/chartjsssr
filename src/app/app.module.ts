import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {provideClientHydration} from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    RightsidebarComponent,
    LeftsidebarComponent
  ],
  providers: [ provideClientHydration() ],
  bootstrap: [AppComponent]
})
export class AppModule { }
