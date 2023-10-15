import { Component, OnInit } from '@angular/core';
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
  constructor(private appService: AppserviceService) { }
  ngOnInit(): void { }

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
    this.appService.setUpdateChart(event);
  }

  reUseable(event: any) {
    const data: any = {
      type: event.type,
      data: event.data,
      options: event.options
    }
    this.appService.setCharValue(event);
  }
}
