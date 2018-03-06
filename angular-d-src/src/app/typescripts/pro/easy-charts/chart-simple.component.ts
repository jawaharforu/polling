
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mdb-simple-chart',
  templateUrl: './chart-simple.component.html',
  styles: []
})
export class SimpleChartComponent implements OnInit {
  @Input('percent') percent: any;
  @Input('barColor') barColor: string;
  @Input('trackColor') trackColor: string;
  @Input('scaleColor') scaleColor: string;
  @Input('scaleLength') scaleLength: number;
  @Input('lineCap') lineCap: string;
  @Input('lineWidth') lineWidth: number;
  @Input('trackWidth') trackWidth: number;
  @Input('size') size: number;
  @Input('rotate') rotate: number;
  @Input('animate') animate: { duration: string, enabled: boolean};
  public options: any = {
    barColor: null,
    trackColor: null,
    scaleColor: null,
    scaleLength: '',
    lineCap: null,
    lineWidth: null,
    trackWidth: null,
    size: null,
    rotate: null,
    duration: null,
    enableAnimation: null,
    animate: {
       duration: 1000,
       enabled: true
     }
  };

  constructor() {
  }

  ngOnInit() {
    this.options.barColor = '#' + this.barColor;
    this.options.trackColor = '#' + this.trackColor;
    this.options.scaleColor = '#' + this.scaleColor;
    this.options.scaleLength = this.scaleLength;
    this.options.lineCap = this.lineCap;
    this.options.lineWidth = this.lineWidth;
    this.options.trackWidth = this.trackWidth;
    this.options.size = this.size;
    this.options.rotate = this.rotate;
    this.options.animate.duration = this.animate.duration;
    this.options.animate.enabled = this.animate.enabled;
  }

}

