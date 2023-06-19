import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleBarComponent } from './example-bar.component';

describe('ExampleBarComponent', () => {
  let component: ExampleBarComponent;
  let fixture: ComponentFixture<ExampleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
