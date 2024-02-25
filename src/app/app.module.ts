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
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { CreateTransactionModalComponent } from './create-transaction-modal/create-transaction-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FeatureFlagDirective,
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
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
