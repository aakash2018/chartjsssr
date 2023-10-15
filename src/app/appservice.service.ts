import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  chartDataArr = signal({})
  chartDataValue = signal({})

  previewTable = signal(false)

  setChartData(data: any) {
    console.log(data, 'service');
    this.chartDataArr.set(data);
  }

  setCharValue(value: any) {
    this.chartDataValue.set(value);
  }

  setUpdateChart(data: any) {
    this.chartDataArr.update(item => item = data);
    console.log(this.chartDataArr(), 'updateService');
  }

  changeTableViewStatus(status: boolean) {
    this.previewTable.set(status)
  }
}
