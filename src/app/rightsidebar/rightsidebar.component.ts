import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularDraggableModule } from 'angular2-draggable';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [CommonModule,AngularDraggableModule],
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})
export class RightsidebarComponent implements OnInit {
  @Input() chartData: any;
  @ViewChildren('myBounds') boundElements!: QueryList<ElementRef>;
  userData: any;
  aspectRatio:any;
  displayStyle = "none";
  inBounds = true;
  position: any;
  positionData: any[] = [];
  resizePositionData: any[] = [];
  chartOptions!: any;

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

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    console.log(this.chartData,"103 line check");
    this.userData = this.chartData;
  }

  openChartModal() {
    this.displayStyle = "block";
    this.chartData.forEach((element: any, index: number): void => {
      //   console.log(index);
      new Chart(`chart-container-${index}`,
        {

          data: this.data,
          options: this.options
        }
      )
      //   if (element.type !== 'Table') {
      //     this.chartOptions = this.userData[element.type];
      //     const containerId = `chart-container-${index}`;
      //     const container = this.elementRef.nativeElement.querySelector(`#${containerId}`);
      //     // Highcharts.chart(container, this.chartOptions);
      //   } else {
      //     this.tableOptions = this.userData[element.type];
      //     console.log(this.tableOptions);
      //     this.tableData = this.tableOptions[element.tableData];
      //   }
    })
  }

  closePopup() {
    this.displayStyle = "none";
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });

  }

  onMoveEnd(event: any, keys: any) {
    console.log(event);
    const data = {
      [keys]: {
        position: event
      }
    };

    if (this.positionData?.length > 1) {
      this.positionData.forEach((items, index) => {
        for (const key in items) {
          if (key === keys) {
            this.positionData.splice(index, 1);
            this.positionData.push(data);
          }
        }

      });
    } else {
      this.positionData.push(data);
    }

  }

  onResizeStop(event: any, keys: any) {
    const data = {
      [keys]: {
        size: event.size
      }
    }
    if (this.resizePositionData?.length > 1) {
      this.resizePositionData.forEach((items, index) => {
        for (const key in items) {
          if (key === keys) {
            this.resizePositionData.splice(index, 1);
            this.resizePositionData.push(data);
          }
        }
      });
    } else {
      this.resizePositionData.push(data);
    }
  }

  newPosition(event: any) {
    console.log(event, "131")
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const element = event.currentTarget;
    // const x = event.pageX - boundingRect.left;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    this.position = "(" + x + ", " + y + ")";
  }

}
