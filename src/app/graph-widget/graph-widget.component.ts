import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-graph-widget',
  templateUrl: './graph-widget.component.html',
  styleUrls: ['./graph-widget.component.scss']
})
export class GraphWidgetComponent implements OnInit {
  private chart: am4charts.XYChart;
  @Input() windPSdata: any[];

  constructor(private zone: NgZone) { }

  ngOnInit(): void {

    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    chart.data = this.windPSdata.slice(0, 100);

    // Create axes
    let timeAxis = chart.xAxes.push(new am4charts.DurationAxis());
    timeAxis.baseUnit = "second";
    timeAxis.durationFormatter.durationFormat = "mm:ss";
    timeAxis.renderer.labels.template.disabled = true;

    timeAxis.renderer.minGridDistance = 10;
    timeAxis.renderer.grid.template.strokeOpacity = 0.5;
    timeAxis.renderer.grid.template.stroke = am4core.color("#000000");
    timeAxis.renderer.grid.template.strokeWidth = 0.75;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 5.775;
    valueAxis.max = 5.815;
    valueAxis.fontFamily = "verdana";
    valueAxis.fontSize = "9";
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.grid.template.strokeOpacity = 0.5;
    valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
    valueAxis.renderer.grid.template.strokeWidth = 0.75;


    // Set up axis title
    timeAxis.title.text = "Time (mm:ss)";
    timeAxis.title.rotation = 0;
    timeAxis.title.align = "center";
    timeAxis.title.valign = "top";
    timeAxis.title.dy = 5;
    timeAxis.title.fill = am4core.color("#000000");
    timeAxis.title.fontFamily = "verdana";
    timeAxis.title.fontSize = "10";
    timeAxis.title.fontWeight = "bold";

    valueAxis.title.text = "Rainfall (mm)";
    valueAxis.title.fontWeight = "bold";
    valueAxis.title.rotation = -90;
    valueAxis.title.align = "center";
    valueAxis.title.valign = "middle";
    valueAxis.title.dy = 5;
    valueAxis.title.fill = am4core.color("#000000");
    valueAxis.title.fontFamily = "verdana";
    valueAxis.title.fontSize = "11";

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "RF";
    series.dataFields.valueX = "formatedTime";
    series.tooltipText = "{RF}";
    series.stroke = am4core.color("#A52A2A");
    series.strokeWidth = 1.5;

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = timeAxis;

  }

}



