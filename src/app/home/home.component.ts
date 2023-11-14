import { AfterViewInit, Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AppserviceService } from '../appservice.service';
import * as chartData from './../../assets/chart.json';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables);
Chart.register(zoomPlugin);

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
		this.data = this.chartdata['WaterFallChart']?.data;
		this.options = {
			scales: {
				y1:
				{
					beginAtZero: true,
					ticks: {
						callback: function (label: any) {
							if (label > 999 || label < -999) {
								return `$${(label / 1000)}k`;
							} else {
								return `$${label}`
							}
						},
					},
					title: {
						display: true,
					},
					position: 'left',
				},
				y: {
					display: false,
				}
			},
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: 'Water Fall Chart'
				},
				datalabels: {
					align: 'end',
					anchor: 'end',
					font: {
						weight: 'bold'
					},
					clamp: true,
					formatter: (val: any) => {
						return `$ ${val[1]}`
					},
				},
				subtitle: {
					display: true,
					text: 'Water Fall Chart'
				  },
				  pan: {
					enabled: true,
					mode: "xy"
				  },
				  drag: {
					enabled: true,
					modifierKey: "shift"
				  },
				  overview: {
					enabled: true,
					scaleX: 0.2
				  },
				  limits: {
					xMin: 0.5,
					xMax: 2,
					yMin: 0.5,
					yMax: 2
				  },
				  zoom: {
					zoom: {
					  wheel: {
						enabled: true
					  },
					  pinch: {
						enabled: true
					  },
					  mode: "xy"
					}
				  }
			}
		}

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
		this.mychart?.destroy()
		if (this.mychart) {
			this.mychart = new Chart('mychart',
				{
					data: this?.data,
					options: this?.options,
					plugins: [ChartDataLabels]
				}
			)
		}
	}

	updateChart(updateValue: any): void {
		this.mychart?.destroy();
		this.mychart = new Chart('mychart',
			{
				data: this?.data,
				options: this?.options,
				plugins: [ChartDataLabels]
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
