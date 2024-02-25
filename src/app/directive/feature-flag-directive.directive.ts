import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IFeatureFlagsService } from '../guards/feature-flags.interface';

@Directive({
  selector: "[featureFlag]"
})
export class FeatureFlagDirective implements OnInit {
  @Input()
  featureFlag!: string;
  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private featureFlagService: IFeatureFlagsService
  ) {}

  ngOnInit() {
    const isEnabled = this.featureFlagService.isFeatureEnabled(this.featureFlag);
    if (isEnabled) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}