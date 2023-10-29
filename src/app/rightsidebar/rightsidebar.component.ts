import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularDraggableModule } from 'angular2-draggable';
import { Chart, registerables } from 'chart.js';
import { AppserviceService } from '../appservice.service';
Chart.register(...registerables);
@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [CommonModule, AngularDraggableModule],
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})
export class RightsidebarComponent implements OnInit {
  @Input() chartData: any;
  @Input() updateData: any;
  @ViewChildren('myBounds') boundElements!: QueryList<ElementRef>;
  @Output() onReusableChange = new EventEmitter();

  @Output() onUpdateChange = new EventEmitter();


  aspectRatio: any;
  displayStyle = "none";
  inBounds = true;
  position: any;
  positionData: any[] = [];
  resizePositionData: any[] = [];
  chartOptions!: any;
  ctx: any;
  canvas: any;
  data: any;
  mychart: any;

  constructor(private appService: AppserviceService) {
  }
  ngOnInit(): void {
  }

  openChartModal() {
    this.displayStyle = "block";

    this.chartData.forEach((element: any, index: number): void => {
      this.mychart = new Chart(`chart-container-${index}`,
        {
          data: element.data,
          options: element.options
        }
      )
    });
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
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const element = event.currentTarget;
    // const x = event.pageX - boundingRect.left;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    this.position = "(" + x + ", " + y + ")";
  }

  reUseable(value: any, index: any): void {
    localStorage.setItem('chartIndex', index);
    this.appService.changeTableViewStatus(value.type === 'Table' ? true : false);
    this.onReusableChange.emit(value);
  }


  deleteChart(index:number) {
    const chartData : any = this.appService.chartDataArr()
    chartData.splice(index,1)
    this.onUpdateChange.emit(chartData)
  }

}3
