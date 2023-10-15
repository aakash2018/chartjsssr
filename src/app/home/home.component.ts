import { AfterViewInit, Component, effect } from '@angular/core';
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
export class HomeComponent implements AfterViewInit {
	ctx: any;
	canvas: any;
	data: any;
	options: any;
	chartdata: any = chartData;
	mychart: any;
	updateValue: any;
	previewTable!:boolean
	tempIndex!:number
	constructor(private appService: AppserviceService) {
		this.data = this.chartdata['CombineChart']?.data;
		this.options = this.chartdata['CombineChart']?.options;

		effect(() => {
			this.chartdata = this.appService.chartDataArr();
			this.previewTable = this.appService.previewTable();
			this.tempIndex = Number(localStorage.getItem('chartIndex'))
			console.log(this.appService.chartDataArr(), '1home--------------');
			let chartData: any = this.appService.chartDataArr()
			if (!chartData.length) {
				console.log(chartData, '2home--------------');
				this.updateChart(chartData);
			} else {
				setTimeout(() => {
					console.log(this.appService.chartDataArr(), 'home5----',);
					const chartDataArr = JSON.parse(JSON.stringify(this.appService.chartDataArr()));
					this.updateChartData(chartDataArr);
				},);
			}
			const reUseable = this.appService.chartDataValue()
			if (Object.values(reUseable).length) {
				this.updateDataValue(reUseable)
			}
		});
	}

	get isPreviewTable(): boolean {
		return this.appService.previewTable();
	}

	ngAfterViewInit(): void {
		// this.mychart?.destroy()
		if (this.mychart) {
			this.mychart = new Chart('mychart',
				{
					data: this?.data,
					options: this?.options
				}
			)
		}
	}

	updateChart(updateValue: any): void {
		this.mychart = new Chart('mychart',
			{
				data: this?.data,
				options: this?.options
			}
		)
		if (this.mychart) {
			this.mychart.data = updateValue[updateValue.length - 1]?.data; // Update chart data
			this.mychart.options = updateValue[updateValue.length - 1]?.options; // Update chart options
			console.log(updateValue, 'home7------------', this.mychart);
			this.mychart.update();
		}
	}

	updateDataValue(updateValue: any): void {
		console.log(updateValue, '3home----------');
		if (this.mychart) {
			console.log(this.mychart, '-------4home');
			this.mychart.data = updateValue?.data;
			this.mychart.options = updateValue?.options;
			this.mychart.update();
		}
	}

	updateChartData(updateValue: any): void {
		const index: any = localStorage.getItem('chartIndex');
		if (this.mychart) {
			console.log(updateValue, 'home6------------', this.mychart, index);
			this.mychart.data = updateValue[index]?.data;
			this.mychart.options = updateValue[index]?.options;
			this.mychart.update();
		}
	}


}
