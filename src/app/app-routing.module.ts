import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { featureGuardGuard } from './guards/feature-guard.guard';
import { SecComponent } from './sec/sec.component';
import { ThirdComponent } from './third/third.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [featureGuardGuard],
    data: {
      feature: "main"
    }
  },
  {
    path: "main",
    component: MainComponent,
    canActivate: [featureGuardGuard],
    data: {
      feature: "sec"
    }
  },
  {
    path: "sec",
    component: SecComponent,
    canActivate: [featureGuardGuard],
    data: {
      feature: "sec"
    }
  },
  {
    path: "third",
    component: ThirdComponent,
    canActivate: [featureGuardGuard],
    data: {
      feature: "third"
    }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
