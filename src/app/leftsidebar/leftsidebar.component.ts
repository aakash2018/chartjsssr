import { Component, EventEmitter, Output, effect } from '@angular/core';
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
export class LeftsidebarComponent {
  @Output() onSubmitChange = new EventEmitter();
  @Output() onUpdateChange = new EventEmitter();

  reactiveForm!: FormGroup;
  chartData: any[] = [];
  chartjsData: any;
  dynamicChart: any = {
    labels: [''],
    datasets: [],
  }
  toggleView = false;
  responseData: any;

  xaxisLabels: any = {
    years: ['2017', '2018', '2019', '2020', '2021'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    date: ['17/8/2023', '18/8/2023', '19/8/2023', '20/8/2023', '21/8/2023'],
    default: ["Start", "Income", "Expense 1", "Expense 2", "End"],
    table: [
      "Id",
      "Name",
      "Email",
      "Phone"
    ],
  };


  constructor(private appService: AppserviceService) {
    this.chartjsData = chartsData;
    this.reactiveForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,]),
      type: new FormControl('CombineChart', [
        Validators.required,]),
      startDate: new FormControl('',),
      endDate: new FormControl('',),
      title: new FormControl('', [
        Validators.required,]),
      xaxis: new FormControl('Years', [
        Validators.required,]),
      yaxis: new FormControl(''),
      description: new FormControl('', [
        Validators.required,]),
      // tableData: new FormControl('', [
      //   Validators.required,]),
      data: new FormControl(''),
      xAxisTitle: new FormControl('',[
        Validators.required,]),
      yAxisTitle: new FormControl('',[
        Validators.required,]),
      yAxisData: new FormControl(''),
      yAxisDataMultiSelect: new FormControl('',[Validators.required,]),
    });

    console.log(this.reactiveForm?.value, '0-----------');


    effect(() => {
      console.log(this.appService.chartDataValue(), '1--------------');
      let chartDataValue: any = this.appService.chartDataValue()
      this.responseData = chartDataValue;
      if (!Array.isArray(chartDataValue)) {
        console.log(chartDataValue, '2--------------');
        this.reactiveForm.patchValue({
          name: chartDataValue?.name,
          type: chartDataValue?.type,
          title: chartDataValue?.options?.plugins?.title?.text,
          xaxis: chartDataValue?.xaxis,
          description: chartDataValue?.options?.plugins?.subtitle?.text,
          yaxis: chartDataValue?.yaxis,
          xAxisTitle: chartDataValue?.xAxisTitle,
          yAxisTitle: chartDataValue?.yAxisTitle,
          yAxisData: chartDataValue?.yAxisData,
          yAxisDataMultiSelect: chartDataValue?.yAxisDataMultiSelect,
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
    this.chartOnSubmit();
  }

  chartOnSubmit(): void {
    console.log(this.reactiveForm?.value, '---------5', this.chartData);


    if (this.reactiveForm?.value?.type === 'Table') {
      this.dynamicChart.labels = [...this.xaxisLabels.table];
      this.dynamicChart.datasets = this.chartjsData[this.reactiveForm?.value?.type]?.data?.datasets;;
    } else {
      this.dynamicChart.labels = this.xaxisLabels[this.reactiveForm?.value?.xaxis] || this.xaxisLabels?.default;
      this.dynamicChart.datasets = this.chartjsData[this.reactiveForm?.value?.type]?.data?.datasets;

      this.chartjsData[this.reactiveForm.value.type].options = this.onchangeChartOption()
    }
    const chartDataset = {
      name: this.reactiveForm?.value?.name,
      type: this.reactiveForm?.value?.type,
      xaxis: this.reactiveForm?.value?.xaxis,
      data: this.dynamicChart,
      options: this.chartjsData[this.reactiveForm?.value?.type]?.options,
      yaxis: this.reactiveForm?.value?.yaxis,
      xAxisTitle: this.reactiveForm?.value?.xAxisTitle,
      yAxisTitle: this.reactiveForm?.value?.yAxisTitle,
      yAxisData: this.reactiveForm?.value?.yAxisData,
      yAxisDataMultiSelect: this.reactiveForm?.value?.yAxisDataMultiSelect,
    };
    console.log(chartDataset, 'chartDataset');

    this.chartData.push(JSON.parse(JSON.stringify(chartDataset)));
    console.log(this.chartData, '6-------------');
    this.onSubmitChange.emit(this.chartData);
    this.appService.changeTableViewStatus(chartDataset.type === 'Table' ? true : false);
    localStorage.setItem('chartIndex', JSON.stringify(this.chartData.length - 1));
    this.reactiveForm.reset();
    this.responseData = {}
  }


  onchangeChartOption() {
    return {
      scales: {
        y: {
          display: ['pieChart','doughnutChart','polarAreaChart'].includes(this.reactiveForm.value.type) ? false : true,
          beginAtZero: true,
          stacked: this.reactiveForm.value.type === 'stackedBarChart' ? true : false,
          title: {
            display: true,
            text: this.reactiveForm?.value?.xAxisTitle
          }
        },
        x: {
          display: ['pieChart','doughnutChart','polarAreaChart'].includes(this.reactiveForm.value.type) ? false : true,
          stacked: this.reactiveForm.value.type === 'stackedBarChart' ? true : false,
          title: {
            display: true,
            text: this.reactiveForm?.value?.xAxisTitle
          }
        },
      },
      plugins: {
        legend: {
          "display": true
        },
        title: {
          display: true,
          text: this.reactiveForm.value.title
        },
        subtitle: {
          display: true,
          text: this.reactiveForm.value.description
        }
      }
    }
  }

  onUpdate(): void {
    console.log(this.reactiveForm?.value, '3-----------');
    console.log(this.chartData, '4-----------');
    const index: number = Number(localStorage.getItem('chartIndex'))

    console.log(this.chartData[index].options, 'options');
    console.log(this.reactiveForm?.value, 'form');
    if (this.chartData[index].options && this.reactiveForm?.value.type !== 'Table') {
      this.chartData[index].options = this.chartjsData[this.reactiveForm?.value.type].options;
      this.chartData[index].options.plugins.title.text = this.reactiveForm?.value.title;
      this.chartData[index].options.plugins.subtitle.text = this.reactiveForm?.value.description ?? '';
      this.chartData[index].options.scales.x.title.text = this.reactiveForm?.value?.xAxisTitle;
      this.chartData[index].options.scales.y.title.text = this.reactiveForm?.value?.yAxisTitle;
    }
    this.chartData[index].data.labels = this.xaxisLabels[this.reactiveForm?.value?.xaxis] || this.xaxisLabels.default;
    this.chartData[index].data.datasets = this.chartjsData[this.reactiveForm?.value.type].data.datasets;
    this.chartData[index].name = this.reactiveForm?.value.name;
    this.chartData[index].type = this.reactiveForm?.value.type;
    this.chartData[index].xaxis = this.reactiveForm?.value.xaxis;
    this.chartData[index].yaxis = this.reactiveForm?.value.yaxis;
    this.chartData[index].yAxisData= this.reactiveForm?.value?.yAxisData;
    this.chartData[index].yAxisDataMultiSelect = this.reactiveForm?.value?.yAxisDataMultiSelect;

    this.onUpdateChange.emit(this.chartData);
    this.appService.changeTableViewStatus(this.chartData[index].type === 'Table' ? true : false);
    this.reactiveForm.reset();
    this.responseData = {}
  }

}
