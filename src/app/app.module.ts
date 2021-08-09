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
import { PhrasesComponent } from './bricks/logical/phrases/phrases.component';
import { TestComponent } from './bricks/logical/test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    BalloonComponent,
    WaterComponent,
    ScaleComponent,
    SynonymsComponent,
    SimilarWordsComponent,
    PhrasesComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
