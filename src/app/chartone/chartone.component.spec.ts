import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartoneComponent } from './chartone.component';

describe('ChartoneComponent', () => {
  let component: ChartoneComponent;
  let fixture: ComponentFixture<ChartoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartoneComponent]
    });
    fixture = TestBed.createComponent(ChartoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
