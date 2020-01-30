import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { SocialNetworkGraphComponent } from './social-network-graph/social-network-graph.component';

@NgModule({
  declarations: [SocialNetworkGraphComponent],
  exports: [SocialNetworkGraphComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule
  ]
})
export class GraphsModule { }
