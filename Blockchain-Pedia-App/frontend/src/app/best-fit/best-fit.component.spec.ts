import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BestFitComponent} from './best-fit.component';

describe('BestFitComponent', () => {
  let component: BestFitComponent;
  let fixture: ComponentFixture<BestFitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestFitComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BestFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
