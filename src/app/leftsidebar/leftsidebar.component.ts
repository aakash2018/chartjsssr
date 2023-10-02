import { AfterViewInit, Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as chartsData from './../../assets/chart.json';
import { AppserviceService } from '../appservice.service';
@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements AfterViewInit {
  @Output() onSubmitChange = new EventEmitter();
  @Output() onUpdateChange = new EventEmitter();

  reactiveForm!: FormGroup;
  chartData: any[] = [];
  chartjsData: any;
  dynamicChart: any = {
    labels: [''],
    datasets: [],
  }
  responseData: any;

  xaxisLabels: any = {
    years: ['2017', '2018', '2019', '2020', '2021'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    date: ['17/8/2023', '18/8/2023', '19/8/2023', '20/8/2023', '21/8/2023'],
    default: ["Start", "Income", "Expense 1", "Expense 2", "End"],
  };


  constructor(private appService: AppserviceService) {
    this.chartjsData = chartsData;
    this.reactiveForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,]),
      type: new FormControl('CombineChart', [
        Validators.required,]),
      title: new FormControl('', [
        Validators.required,]),
      xaxis: new FormControl('Years', [
        Validators.required,]),
      // tableData: new FormControl('', [
      //   Validators.required,]),
      data: new FormControl('')
    });
  }

  ngAfterViewInit(): void {
    this.appService.selectedChartData$.subscribe((res: any) => {

      if (!Array.isArray(res)) {
        this.responseData = res;
        this.reactiveForm.patchValue({
          name: res?.name,
          type: res?.type,
          title: res?.options?.plugins?.title?.text,
          xaxis: res?.xaxis,
        });
      } else {
        this.onUpdate();
      }
    });
  }

  isObjectEmpty(objectName: any): boolean {
    return JSON.stringify(objectName) === "{}";
  }

  onSubmit(): void {
    const selectedXaxis = this.reactiveForm.value.xaxis;

    this.dynamicChart.labels = this.xaxisLabels[this.reactiveForm?.value?.xaxis] || this.xaxisLabels.default;
    this.dynamicChart.datasets = this.chartjsData[this.reactiveForm?.value?.type]?.data?.datasets;

    this.chartjsData[this.reactiveForm.value.type].options = {
      scales: {
        y: {
          display: false,
          beginAtZero: true
        },
        leftYAxis: {
          id: "left-y-axis",
          type: "linear",
          position: "left",
        },
        rightYAxis: {
          id: "right-y-axis",
          type: "linear",
          position: "right"
        }
      },
      plugins: {
        legend: {
          "display": true
        },
        title: {
          display: true,
          text: this.reactiveForm.value.title
        }
      }
    }

    const chartDataset = {
      name: this.reactiveForm?.value?.name,
      type: this.reactiveForm?.value?.type,
      xaxis: this.reactiveForm?.value?.xaxis,
      data: this.dynamicChart,
      options: this.chartjsData[this.reactiveForm?.value?.type].options
    };

 

    this.chartData.push(JSON.parse(JSON.stringify(chartDataset)));
    this.onSubmitChange.emit(this.chartData);
    this.reactiveForm.reset();
  }

  onUpdate(): void {
    const index: number = this.chartData.findIndex((element: any) => element.name === this.reactiveForm?.value?.name);
   
    this.chartData[index].options.plugins.title.text = this.reactiveForm.value.title;
    this.chartData[index].options = this.chartjsData[this.reactiveForm.value.type].options;
    this.chartData[index].data.labels = this.xaxisLabels[this.reactiveForm?.value?.xaxis] || this.xaxisLabels.default;
    this.chartData[index].data.datasets = this.chartjsData[this.reactiveForm.value.type].data.datasets;
    this.chartData[index].name = this.reactiveForm.value.name;
    this.chartData[index].type = this.reactiveForm.value.type;
    this.chartData[index].xaxis = this.reactiveForm.value.xaxis;
    

    this.onUpdateChange.emit(this.chartData);
    
    this.reactiveForm.reset();

  }

}
