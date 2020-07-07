import { Component } from '@angular/core';
import { PowerStationDataService } from '../app/power-station-data.service';
import { array } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PowerStationDataService]
})

export class AppComponent {
  title = 'windPowerStation-frontend';
  windPScurrentValue: any;
  windPSdata: any[];


  constructor(private powerStationDataService: PowerStationDataService) { }

  ngOnInit(): void {
    this.GetShow();
  }

  GetShow() {
    this.powerStationDataService.getContacts().subscribe(data => {
      this.windPSdata = data as Array<any>;
      this.windPScurrentValue = data[0];
      this.windPSdata.forEach((dataValue, i) => {
        setTimeout(() => {
          this.windPScurrentValue = dataValue;
        }, i * 1000);
      });
    });
  }

}
