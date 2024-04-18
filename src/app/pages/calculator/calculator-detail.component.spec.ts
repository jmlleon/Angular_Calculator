import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorDetailComponent } from './calculator-detail.component';

describe('CalculatorDetailComponent', () => {
  let component: CalculatorDetailComponent;
  let fixture: ComponentFixture<CalculatorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
