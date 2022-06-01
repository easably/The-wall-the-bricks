import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({    apiKey: 'AIzaSyD31jrwswM-xKIJk7fCeuRmt2GEBKr7Xnw',
    authDomain: "trainer-3c458.firebaseapp.com",
    databaseURL: "https://trainer-3c458-default-rtdb.firebaseio.com",
    projectId: "trainer-3c458",
    storageBucket: "trainer-3c458.appspot.com",
    messagingSenderId: "903016268032",
    appId: "1:903016268032:web:77c6a26ec76253ea10b3e5",
    measurementId: "G-TZSV5FDG1M", })),
    provideFirestore(() => getFirestore()),],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}



