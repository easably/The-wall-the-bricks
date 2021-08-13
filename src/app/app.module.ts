import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BalloonComponent } from './bricks/emotional/balloon/balloon.component';
import { WaterComponent } from './bricks/emotional/water/water.component';
import { ScaleComponent } from './bricks/emotional/scale/scale.component';
import { SynonymsComponent } from './bricks/logical/synonyms/synonyms.component';
import { SimilarWordsComponent } from './bricks/logical/similar-words/similar-words.component';
import { PagesModule } from './pages/pages.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    BalloonComponent,
    WaterComponent,
    ScaleComponent,
    SynonymsComponent,
    SimilarWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
