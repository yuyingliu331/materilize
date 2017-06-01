import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AdalService} from 'ng2-adal/core';

import { HttpModule } from '@angular/http';
import { AppComponent }  from './components/app.component';

import {routes} from './routers/app.router';
import {HomeComponent} from './components/home.component';

import {WelcomeComponent} from './components/welcome.component';
import {LoggedInGuard} from './authentication/logged-in.guard';

import {SecretService} from './services/secret.service';
import { GetDataService } from './services/data.service';


@NgModule({
  imports:      [ BrowserModule, routes, FormsModule, HttpModule],
  declarations: [ AppComponent, HomeComponent, WelcomeComponent ],
  providers: [AdalService, SecretService, LoggedInGuard, GetDataService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
