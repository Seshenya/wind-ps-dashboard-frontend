import { Component, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-gauge-widget',
  templateUrl: './gauge-widget.component.html',
  styleUrls: ['./gauge-widget.component.scss']
})
export class GaugeWidgetComponent {
  private chart: am4charts.GaugeChart;
  @Input() windPScurrentValue: any;
  wsValue: number;
  hand;
  range0;
  range1;
  label;
  axis2;
  constructor(private zone: NgZone) { }


  ngOnChanges() {
    this.wsValue = this.windPScurrentValue.WS;
    if (this.hand && this.range0 && this.range1) {
      this.hand.value = this.wsValue;
      this.range0.endValue = this.wsValue;
      this.range1.value = this.wsValue;
    }
    this.label.text = (this.axis2.positionToValue(this.hand.currentPosition).toFixed(2) + " m/s");
    this.axis2.invalidate();

  }



  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv1", am4charts.GaugeChart);
      chart.innerRadius = am4core.percent(93);


      let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 40;
      axis.strictMinMax = true;
      axis.renderer.radius = am4core.percent(92);
      axis.renderer.inside = true;
      axis.renderer.line.strokeOpacity = 1;
      axis.renderer.ticks.template.disabled = false
      axis.renderer.ticks.template.strokeOpacity = 1;
      axis.renderer.ticks.template.length = 10;
      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.radius = 40;


      let colorSet = new am4core.ColorSet();

      this.axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      this.axis2.min = 0;
      this.axis2.max = 40;
      this.axis2.strictMinMax = true;
      this.axis2.renderer.labels.template.disabled = true;
      this.axis2.renderer.ticks.template.disabled = true;
      this.axis2.renderer.grid.template.disabled = true;

      this.range0 = this.axis2.axisRanges.create();
      this.range0.value = 0;
      this.range0.endValue = 50;
      this.range0.axisFill.fillOpacity = 1;
      this.range0.axisFill.fill = am4core.color("#4682B4");

      this.range1 = this.axis2.axisRanges.create();
      this.range1.value = 50;
      this.range1.endValue = 100;
      this.range1.axisFill.fillOpacity = 1;
      this.range1.axisFill.fill = am4core.color("#2F4F4F");

      /**
       * Label
       */

      this.label = chart.radarContainer.createChild(am4core.Label);
      this.label.isMeasured = false;
      this.label.fontSize = 30;
      this.label.x = am4core.percent(50);
      this.label.y = am4core.percent(100);
      this.label.horizontalCenter = "middle";
      this.label.verticalCenter = "bottom";
      this.label.text = "50%";
      this.label.fill = am4core.color("#000000");


      /**
       * Hand
       */

      this.hand = chart.hands.push(new am4charts.ClockHand());
      this.hand.axis = this.axis2;
      this.hand.innerRadius = am4core.percent(15);
      this.hand.startWidth = 5;
      this.hand.pin.disabled = true;
      this.hand.fill = am4core.color("#DD0000");
      this.hand.stroke = am4core.color("#DD0000");

    });


  }
}


