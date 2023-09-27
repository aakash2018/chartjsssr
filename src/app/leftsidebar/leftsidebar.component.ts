import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent {
  @Output() onSubmitChange = new EventEmitter();

  reactiveForm!: FormGroup;
  chartData: any[] = [];
  constructor() {
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

  onSubmit(): void {
    this.onSubmitChange.emit(this.reactiveForm.value);
    this.reactiveForm.reset();
  }

}
