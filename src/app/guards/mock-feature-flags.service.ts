import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { get, has } from "lodash-es";
import { tap } from "rxjs/operators";
import { FeatureConfig } from "./feature.interface";
import { environment } from "../../environments/environment";
import { IFeatureFlagsService } from "./feature-flags.interface";

@Injectable()
export class MockFeatureFlagsService implements IFeatureFlagsService {
  isFeatureEnabled(key: string): boolean {
    console.log("gallo")
    return true;
  }
}