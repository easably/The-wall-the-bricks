import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp({    apiKey: 'AIzaSyD31jrwswM-xKIJk7fCeuRmt2GEBKr7Xnw',
    authDomain: 'trainer-3c458.firebaseapp.com',
    projectId: 'trainer-3c458',
    storageBucket: 'trainer-3c458.appspot.com',
    messagingSenderId: '903016268032',
    appId: '1:962001574290:web:1ca9eb7c528bd0a5dd494b',
    measurementId: 'G-53K6ZWZ1K3',
    databaseURL: 'https://trainer-3c458-default-rtdb.firebaseio.com/', }),
    provideFirestore(() => getFirestore()),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}



