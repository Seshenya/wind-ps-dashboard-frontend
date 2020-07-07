import { Component, OnInit, Input, NgZone, OnChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-clock-widget',
  templateUrl: './clock-widget.component.html',
  styleUrls: ['./clock-widget.component.scss']
})
export class ClockWidgetComponent implements OnInit, OnChanges {
  private chart: am4charts.GaugeChart;
  @Input() windPScurrentValue: any;
  time;
  hourHand;
  minutesHand;
  secondsHand;
  constructor(private zone: NgZone) {

  }

  ngOnChanges() {

    this.time = this.windPScurrentValue.time;
    let date = new Date(this.time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    // set hours
    this.hourHand && this.hourHand.showValue(hours + minutes / 60, 0);
    // set minutes
    this.minutesHand && this.minutesHand.showValue(12 * (minutes + seconds / 60) / 60, 0);
    // set seconds
    this.secondsHand && this.secondsHand.showValue(12 * seconds / 60,);
  }

  ngOnInit(): void {

    this.chart = am4core.create("chartdiv3", am4charts.GaugeChart);
    this.chart.exporting.menu = new am4core.ExportMenu();
    this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    this.chart.logo.disabled = true;

    this.chart.startAngle = -90;
    this.chart.endAngle = 270;

    let axis = this.chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 12;
    axis.strictMinMax = true;

    axis.renderer.line.strokeWidth = 8;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.minLabelPosition = 0.05; // hides 0 label
    axis.renderer.inside = true;
    axis.renderer.labels.template.radius = 35;
    axis.renderer.axisFills.template.disabled = true;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.ticks.template.disabled = false
    axis.renderer.ticks.template.length = 12;
    axis.renderer.ticks.template.strokeOpacity = 1;

    // serves as a clock face fill
    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 12;
    range.grid.visible = false;
    range.tick.visible = false;
    range.label.visible = false;

    let axisFill = range.axisFill;
    axisFill.fillOpacity = 1;
    axisFill.disabled = false;
    axisFill.fill = new am4core.InterfaceColorSet().getFor("fill");

    // hands
    this.hourHand = this.chart.hands.push(new am4charts.ClockHand());
    this.hourHand.radius = am4core.percent(55);
    this.hourHand.startWidth = 10;
    this.hourHand.endWidth = 10;
    this.hourHand.rotationDirection = "clockWise";
    this.hourHand.pin.radius = 8;
    this.hourHand.zIndex = 0;

    this.minutesHand = this.chart.hands.push(new am4charts.ClockHand());
    this.minutesHand.rotationDirection = "clockWise";
    this.minutesHand.startWidth = 5;
    this.minutesHand.endWidth = 5;
    this.minutesHand.radius = am4core.percent(78);
    this.minutesHand.zIndex = 1;

    this.secondsHand = this.chart.hands.push(new am4charts.ClockHand());
    this.secondsHand.fill = am4core.color("#DD0000");
    this.secondsHand.stroke = am4core.color("#DD0000");
    this.secondsHand.radius = am4core.percent(85);
    this.secondsHand.rotationDirection = "clockWise";
    this.secondsHand.zIndex = 2;
    this.secondsHand.startWidth = 1;

    let date = new Date(this.time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    // set hours
    this.hourHand.showValue(hours + minutes / 60, 0);
    // set minutes
    this.minutesHand.showValue(12 * (minutes + seconds / 60) / 60, 0);
    // set seconds
    this.secondsHand.showValue(12 * seconds / 60,);

  }

}

