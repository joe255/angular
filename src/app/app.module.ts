import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FeatureFlagDirective } from './directive/feature-flag-directive.directive';
import { IFeatureFlagsService } from './guards/feature-flags.interface';
import { environment } from '../environments/environment';
import { MockFeatureFlagsService } from './guards/mock-feature-flags.service';
import { FeatureFlagsService } from './guards/feature-flags.service';
import { HeadlineComponent } from './headline/headline.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FeatureFlagDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: IFeatureFlagsService,
      useClass: environment.local ? MockFeatureFlagsService : FeatureFlagsService,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
