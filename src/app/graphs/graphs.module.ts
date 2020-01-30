import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphsRoutingModule } from './graphs-routing.module';
import { SocialNetworkGraphComponent } from './social-network-graph/social-network-graph.component';
import { BrushingBarGraphComponent } from './brushing-bar-graph/brushing-bar-graph.component';

@NgModule({
  declarations: [SocialNetworkGraphComponent, BrushingBarGraphComponent],
  exports: [SocialNetworkGraphComponent, BrushingBarGraphComponent],
  imports: [
    CommonModule,
    GraphsRoutingModule
  ]
})
export class GraphsModule { }
