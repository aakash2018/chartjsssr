import { Component, OnInit } from '@angular/core';
import * as userData from './../assets/chart.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'csvchartjs';
  chartData: any[] = [];
  userData: any;
  ngOnInit(): void {
    this.userData = userData;
  }
  onSubmit(event: any) {
    console.log(event, "app module  17 line");

    const data: any = {
      name:event.name,
      type:event.type,
      title:event.title,
      xaxis:event.xaxis,
      data: this.userData[event.type].data.datasets
    }
    this.chartData.push(data);
  }
}
