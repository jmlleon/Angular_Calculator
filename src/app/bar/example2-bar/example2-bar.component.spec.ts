import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Example2BarComponent } from './example2-bar.component';

describe('Example2BarComponent', () => {
  let component: Example2BarComponent;
  let fixture: ComponentFixture<Example2BarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Example2BarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Example2BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
