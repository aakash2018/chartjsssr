import { Component, OnInit } from '@angular/core';
import * as userData from './../assets/chart.json';
import { AppserviceService } from './appservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'csvchartjs';
  chartData: any[] = [];
  updateData: any[] = [];
  userData: any;
  constructor(private appService: AppserviceService) {

  }
  ngOnInit(): void {
    this.userData = userData;
  }

  onSubmit(event: any) {
    const data: any = {
      type: event.type,
      data: event.data,
      options: event.options
    }
    this.chartData = event;
    this.appService.setChartData(event);
  }

  onUpdate(event: any) {
    console.log(event, "fdf");
    this.appService.setUpdateChart(event);
    // this.appService.setChartData(event);

  }

  reUseable(event: any) {
    const data: any = {
      type: event.type,
      data: event.data,
      options: event.options
    }
  
    this.appService.setChartData(event);
  }
}
