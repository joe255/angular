import { CanActivateFn } from '@angular/router';
import { FeatureFlagsService } from './feature-flags.service';
import { inject } from '@angular/core';

export const featureGuardGuard: CanActivateFn = (route, state) => {
  const features = inject(FeatureFlagsService);
  // return features.isFeatureEnabled(state.url);
  return true;
};