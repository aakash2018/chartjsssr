import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  
  private chartDataValue$ = new BehaviorSubject<any>({});

  private updateChartValues$  =new BehaviorSubject<any>({});

  selectedChartData$ = this.chartDataValue$.asObservable();

  updateChartData$ = this.updateChartValues$.asObservable();

  constructor() { }

  setChartData(data: any) {
    console.log(data);
    this.chartDataValue$.next(data);
  }

  getChartData(){
    return this.selectedChartData$;
  }

  setUpdateChart(data:any){
    this.updateChartValues$.next(data);
  }

  getUpdateChart() {
    return this.updateChartData$;
  }
}
