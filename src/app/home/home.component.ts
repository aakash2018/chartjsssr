import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	ctx: any;
	canvas: any;
	data: any = {
		labels: ['Start', 'Income', 'Expense 1', 'Expense 2', 'End'],
		datasets: [
			{
				label: 'Data 1 (Left)',
				type: 'bar',
				data: [10, -20, 10, 40, 50],
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 2,
				// yAxisID: 'left-y-axis' 
				// Assign to the left Y-axis
			},
			{
				label: 'Data 2 (Right)',
				type: 'line',
				data: [10, 20, -25, 15, 50],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 2,
				// yAxisID: 'right-y-axis' 
				// Assign to the right Y-axis
			}
		]
	};

	options: any = {
		scales: {
			y: {
				display: false, // Hide the default Y-axis scale
				beginAtZero: true,
			},
			leftYAxis: {
				id: 'left-y-axis',
				type: 'linear',
				position: 'left', // Position the left Y-axis on the left side
				// ticks: {
				// 	beginAtZero: true,
				// 	callback: function (value:any, index:any, values:any) {
				// 		// Customize labels for the left Y-axis
				// 		return value + ' units (left)';
				// 	}
				// }
			},
			rightYAxis: {
				id: 'right-y-axis',
				type: 'linear',
				position: 'right', // Position the right Y-axis on the right side
				// ticks: {
				// 	beginAtZero: true,
				// 	callback: function (value:any, index:any, values:any) {
				// 		// Customize labels for the right Y-axis
				// 		return value + ' units (right)';
				// 	}
				// }
			}

		},
		plugins: {
			legend: {
				display: true
			},
			title: {
				display: true,
				text: 'Waterfall Chart Example'
			}
		}
	};

	constructor() {

	}

	ngOnInit(): void {
		new Chart('mychart',
			{

				data: this.data,
				options: this.options
			}
		)
	}
}
