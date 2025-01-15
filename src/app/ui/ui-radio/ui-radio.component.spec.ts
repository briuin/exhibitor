import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRadioComponent } from './ui-radio.component';

describe('UiRadioComponent', () => {
  let component: UiRadioComponent;
  let fixture: ComponentFixture<UiRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
