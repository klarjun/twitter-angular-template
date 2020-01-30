import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    graph1Tab = 1;
    graph2Tab = 2;

    @ViewChild('graph1') graph1: ElementRef;

    ngOnInit() {
      console.log(this.graph1);
    }
}
