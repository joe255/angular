import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { IFeatureFlagsService } from './feature-flags.interface';

export const featureGuardGuard: CanActivateFn = (route, state) => {
  const features = inject(IFeatureFlagsService);
  console.log(route.data['feature'])
  return features.isFeatureEnabled(route.data['feature']);
};