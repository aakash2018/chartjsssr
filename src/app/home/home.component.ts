import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AppserviceService } from '../appservice.service';
import * as chartData from './../../assets/chart.json';
Chart.register(...registerables);

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
	ctx: any;
	canvas: any;
	data: any;
	options: any;
	chartdata: any = chartData;
	mychart: any;
	updateValue: any;
	constructor(private appService: AppserviceService) {
		this.data = this.chartdata['CombineChart']?.data;
		this.options = this.chartdata['CombineChart']?.options;
	}

	ngOnInit(): void {

		this.appService.selectedChartData$.subscribe((res: any) => {
			if (Array.isArray(res)) {
				this.updateChart(res);
			} else {
				this.updateDataValue(res);
			}
		});

		this.appService.updateChartData$.subscribe((res: any) => {
			console.log(res);
			this.chartdata = res;
			this.updateChartData(res);
		});


	}

	ngAfterViewInit(): void {
		this.mychart = new Chart('mychart',
			{
				data: this?.data,
				options: this?.options
			}
		)
	}

	updateChart(updateValue: any): void {
		this.mychart.data = updateValue[updateValue.length - 1]?.data; // Update chart data
		this.mychart.options = updateValue[updateValue.length - 1]?.options; // Update chart options
		// Check if the chart is already initialized, then update it
		if (this.mychart) {
			this.mychart.update();
		}
	}

	updateDataValue(updateValue: any): void {
		console.log(updateValue, "62 line home ");

		this.mychart.data = updateValue?.data;
		this.mychart.options = updateValue?.options;

		if (this.mychart) {
			this.mychart.update();
		}
	}

	updateChartData(updateValue: any): void {
		console.log(updateValue, "77 line home ");

		const index:any =localStorage.getItem('chartIndex');
	
		this.mychart.data = updateValue[index]?.data;
		this.mychart.options = updateValue[index]?.options;

		if (this.mychart) {
			this.mychart.update();
		}
	
	}


}
